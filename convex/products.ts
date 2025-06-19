import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export const getFilteredProducts = query({
	args: {
		type: v.optional(v.string()),
		query: v.optional(v.string()),
		priceMin: v.optional(v.number()),
		priceMax: v.optional(v.number()),
		categories: v.optional(v.array(v.string())),
		categorySlug: v.optional(v.string()),
		page: v.optional(v.number()),
		limit: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const {
			type,
			query: searchQuery,
			priceMin,
			priceMax,
			categories,
			categorySlug,
			page = 1,
			limit = 10,
		} = args;

		// Start with all active products
		let products = await ctx.db
			.query("products")
			.withIndex("by_isActive", (q) => q.eq("isActive", true))
			.collect();

		// Filter by category slug from URL params
		if (categorySlug) {
			const category = await ctx.db
				.query("categories")
				.withIndex("by_slug", (q) => q.eq("slug", categorySlug))
				.unique();

			if (category) {
				products = products.filter((product) =>
					product.categoryIds.includes(category._id)
				);
			}
		}

		// Filter by additional categories from search params
		if (categories && categories.length > 0) {
			const categoryDocs = await Promise.all(
				categories.map(async (categorySlug) => {
					return await ctx.db
						.query("categories")
						.withIndex("by_id", (q) =>
							q.eq("_id", categorySlug as Id<"categories">)
						)
						.unique();
				})
			);

			const categoryIds = categoryDocs
				.filter((cat) => cat !== null)
				.map((cat) => cat!._id);

			if (categoryIds.length > 0) {
				products = products.filter((product) =>
					product.categoryIds.some((catId) =>
						categoryIds.includes(catId)
					)
				);
			}
		}

		// Filter by search query (name and description)
		if (searchQuery) {
			const searchTerm = searchQuery.toLowerCase();
			products = products.filter(
				(product) =>
					product.name.toLowerCase().includes(searchTerm) ||
					product.description.toLowerCase().includes(searchTerm)
			);
		}

		// Calculate discounted price and filter by price range
		products = products
			.map((product) => {
				const discountedPrice =
					product.isDiscounted && product.discountPercent
						? product.originalPrice *
						  (1 - product.discountPercent / 100)
						: product.originalPrice;

				return {
					...product,
					currentPrice: discountedPrice,
				};
			})
			.filter((product) => {
				if (priceMin !== undefined && product.currentPrice < priceMin) {
					return false;
				}
				if (priceMax !== undefined && product.currentPrice > priceMax) {
					return false;
				}
				return true;
			});

		// Filter by type (you can customize this based on your needs)
		if (type) {
			switch (type) {
				case "latest-products":
					// Sort by creation date (newest first)
					products.sort((a, b) => {
						// Try _creationTime first, then fall back to createdAt or other date fields
						const aCreated = a._creationTime || 0;
						const bCreated = b._creationTime || 0;
						return bCreated - aCreated; // Newest first (larger timestamp first)
					});
					break;
				case "discounted":
					// Filter for discounted products and sort by discount percentage
					products = products.filter(
						(product) => product.isDiscounted
					);
					products.sort((a, b) => {
						const aDiscount = a.discountPercent || 0;
						const bDiscount = b.discountPercent || 0;
						return bDiscount - aDiscount; // Highest discount first
					});
					break;
				case "best-sellers":
					// Sort by sales count (assuming you have salesCount or orderCount field)
					products.sort((a, b) => {
						const aSales = a.purchaseCount || 0;
						const bSales = b.purchaseCount || 0;
						return bSales - aSales;
					});
					break;
				default:
					// If invalid type, apply default sorting
					products.sort((a, b) => {
						// Primary sort: featured products first
						if (a.isFeatured && !b.isFeatured) return -1;
						if (!a.isFeatured && b.isFeatured) return 1;

						// Secondary sort: by view count (highest first)
						const aViews = a.viewCount || 0;
						const bViews = b.viewCount || 0;
						return bViews - aViews;
					});
					break;
			}
		} else {
			// No type specified, apply default sorting
			products.sort((a, b) => {
				// Primary sort: featured products first
				if (a.isFeatured && !b.isFeatured) return -1;
				if (!a.isFeatured && b.isFeatured) return 1;

				// Secondary sort: by view count (highest first)
				const aViews = a.viewCount || 0;
				const bViews = b.viewCount || 0;
				return bViews - aViews;
			});
		}

		// Calculate pagination
		const totalProducts = products.length;
		const totalPages = Math.ceil(totalProducts / limit);
		const startIndex = (page - 1) * limit;
		const paginatedProducts = products.slice(
			startIndex,
			startIndex + limit
		);

		// Fetch related data for each product
		const productsWithDetails = await Promise.all(
			paginatedProducts.map(async (product) => {
				// Get shop details
				const shop = await ctx.db.get(product.shopId);

				// Get vendor details
				const vendor = shop ? await ctx.db.get(shop.vendorId) : null;

				// Get user details for vendor
				const vendorUser = vendor
					? await ctx.db.get(vendor.userId)
					: null;

				// Get category details
				const productCategories = await Promise.all(
					product.categoryIds.map(async (categoryId) => {
						return await ctx.db.get(categoryId);
					})
				);

				return {
					...product,
					shop,
					vendor: vendor
						? {
								...vendor,
								user: vendorUser,
						  }
						: null,
					categories: productCategories.filter((cat) => cat !== null),
				};
			})
		);

		return {
			products: productsWithDetails,
			pagination: {
				currentPage: page,
				totalPages,
				totalProducts,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1,
			},
			filters: {
				appliedFilters: {
					type,
					query: searchQuery,
					priceMin,
					priceMax,
					categories,
					categorySlug,
				},
			},
		};
	},
});

export const getCategoryProducts = query({
	args: {
		categorySlug: v.string(), // Required - from URL params
		query: v.optional(v.string()), // Search query
		priceMin: v.optional(v.number()), // Price range filter
		priceMax: v.optional(v.number()), // Price range filter
		page: v.optional(v.number()),
		limit: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const {
			categorySlug,
			query: searchQuery,
			priceMin,
			priceMax,
			page = 1,
			limit = 12, // Default to 12 for better grid layout
		} = args;

		// Get the category from slug
		const category = await ctx.db
			.query("categories")
			.withIndex("by_slug", (q) => q.eq("slug", categorySlug))
			.unique();

		if (!category) {
			throw new Error("Category not found");
		}

		// Get all categories to determine if this is a parent or child category
		const allCategories = await ctx.db.query("categories").collect();
		const childCategories = allCategories.filter(
			(cat) => cat.parentId === category._id
		);

		let categoryIds;

		// If this category has children (parent category), get products from all child categories
		if (childCategories.length > 0) {
			// Parent category - get products from child categories only
			categoryIds = childCategories.map((cat) => cat._id);
		} else {
			// Child category - get products from this category only
			categoryIds = [category._id];
		}

		// Start with all active products
		let products = await ctx.db
			.query("products")
			.withIndex("by_isActive", (q) => q.eq("isActive", true))
			.collect();

		// Filter by category IDs
		products = products.filter((product) =>
			product.categoryIds.some((catId) => categoryIds.includes(catId))
		);

		// Filter by search query (name and description)
		if (searchQuery) {
			const searchTerm = searchQuery.toLowerCase();
			products = products.filter((product) =>
				product.name.toLowerCase().includes(searchTerm)
			);
		}

		// Calculate discounted price and filter by price range
		products = products
			.map((product) => {
				const discountedPrice =
					product.isDiscounted && product.discountPercent
						? product.originalPrice *
						  (1 - product.discountPercent / 100)
						: product.originalPrice;

				return {
					...product,
					currentPrice: discountedPrice,
				};
			})
			.filter((product) => {
				if (priceMin !== undefined && product.currentPrice < priceMin) {
					return false;
				}
				if (priceMax !== undefined && product.currentPrice > priceMax) {
					return false;
				}
				return true;
			});

		// Calculate pagination
		const totalProducts = products.length;
		const totalPages = Math.ceil(totalProducts / limit);
		const startIndex = (page - 1) * limit;
		const paginatedProducts = products.slice(
			startIndex,
			startIndex + limit
		);

		// Fetch related data for each product
		const productsWithDetails = await Promise.all(
			paginatedProducts.map(async (product) => {
				// Get shop details
				const shop = await ctx.db.get(product.shopId);

				// Get vendor details
				const vendor = shop ? await ctx.db.get(shop.vendorId) : null;

				// Get user details for vendor
				const vendorUser = vendor
					? await ctx.db.get(vendor.userId)
					: null;

				// Get category details
				const productCategories = await Promise.all(
					product.categoryIds.map(async (categoryId) => {
						return await ctx.db.get(categoryId);
					})
				);

				return {
					...product,
					shop,
					vendor: vendor
						? {
								...vendor,
								user: vendorUser,
						  }
						: null,
					categories: productCategories.filter((cat) => cat !== null),
				};
			})
		);

		// Get price range for the category (for filter UI)
		const priceRange = products.reduce(
			(range, product) => {
				return {
					min: Math.min(range.min, product.originalPrice),
					max: Math.max(range.max, product.originalPrice),
				};
			},
			{ min: Infinity, max: 0 }
		);

		// If no products, set reasonable defaults
		if (products.length === 0) {
			priceRange.min = 0;
			priceRange.max = 1000;
		}

		return {
			products: productsWithDetails,
			category: {
				...category,
				childCategories: childCategories,
			},
			pagination: {
				currentPage: page,
				totalPages,
				totalProducts,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1,
			},
			filters: {
				appliedFilters: {
					categorySlug,
					query: searchQuery,
					priceMin,
					priceMax,
				},
				priceRange,
			},
		};
	},
});

export const getProductById = query({
	args: { productSlug: v.string() },
	handler: async (ctx, args) => {
		// Fetch the main product
		const product = await ctx.db
			.query("products")
			.withIndex("by_slug", (q) => q.eq("slug", args.productSlug))
			.unique();

		if (!product) {
			return null;
		}

		// Fetch vendor shop details
		const vendorShop = await ctx.db.get(product.shopId);

		if (!vendorShop) {
			throw new Error("Vendor shop not found");
		}

		// Fetch vendor details
		const vendor = await ctx.db.get(vendorShop.vendorId);

		if (!vendor) {
			throw new Error("Vendor not found");
		}

		// Fetch vendor user details
		const vendorUser = await ctx.db.get(vendor.userId);

		if (!vendorUser) {
			throw new Error("Vendor user not found");
		}

		// Fetch categories
		const categories = await Promise.all(
			product.categoryIds.map(async (categoryId) => {
				const category = await ctx.db.get(categoryId);
				return category;
			})
		);

		// Filter out any null categories (in case some were deleted)
		const validCategories = categories.filter(Boolean);

		// Fetch product reviews
		const reviews = await ctx.db
			.query("productReviews")
			.filter((q) => q.eq(q.field("productId"), product._id))
			.collect();

		// Fetch reviewer details for each review
		const reviewsWithUserDetails = await Promise.all(
			reviews.map(async (review) => {
				const user = await ctx.db.get(review.userId);
				return {
					...review,
					user: user
						? {
								firstName: user.firstName,
								lastName: user.lastName,
								imageUrl: user.imageUrl,
						  }
						: null,
				};
			})
		);

		// Calculate average rating
		const averageRating =
			reviews.length > 0
				? reviews.reduce((sum, review) => sum + review.rating, 0) /
				  reviews.length
				: null;

		// Calculate discounted price if applicable
		const currentPrice =
			product.isDiscounted && product.discountPercent
				? product.originalPrice * (1 - product.discountPercent / 100)
				: product.originalPrice;

		// Check if discount is currently active
		const now = new Date().toISOString();
		const isDiscountActive =
			product.isDiscounted &&
			(!product.discountStartDate || now >= product.discountStartDate) &&
			(!product.discountEndDate || now <= product.discountEndDate);

		return {
			// Product details
			...product,
			currentPrice,
			isDiscountActive,

			// Vendor details
			vendor: {
				id: vendor._id,
				contactEmail: vendor.contactEmail,
				contactPhone: vendor.contactPhone,
				user: {
					firstName: vendorUser.firstName,
					lastName: vendorUser.lastName,
					email: vendorUser.email,
					imageUrl: vendorUser.imageUrl,
				},
				shop: {
					id: vendorShop._id,
					name: vendorShop.name,
					slug: vendorShop.slug,
					description: vendorShop.description,
					bannerImage: vendorShop.bannerImage,
					logo: vendorShop.logo,
				},
			},

			// Categories
			categories: validCategories.map((category) => ({
				id: category?._id,
				name: category?.name,
				slug: category?.slug,
				parentId: category?.parentId,
			})),

			// Reviews with user details
			reviews: reviewsWithUserDetails,
			reviewStats: {
				totalReviews: reviews.length,
				averageRating,
			},
		};
	},
});
