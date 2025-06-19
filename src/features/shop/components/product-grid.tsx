"use client";

import ProductCard from "@/components/modules/product-card";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface ProductGridProps {
    preloadedProducts: Preloaded<typeof api.products.getFilteredProducts>;
    preloadedFilterOptions: Preloaded<typeof api.products.getFilteredProducts>;
}

export default function ProductGrid({ preloadedProducts, preloadedFilterOptions }: ProductGridProps) {
    const productsData = usePreloadedQuery(preloadedProducts);
    usePreloadedQuery(preloadedFilterOptions);

    if (!productsData) {
        return <div>Loading products...</div>;
    }

    const { products, pagination } = productsData;

    if (products.length === 0) {
        return (
            <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No products found
                </h3>
                <p className="text-gray-600">
                    Try adjusting your filters or search terms.
                </p>
            </div>
        );
    }

    return (
        <>
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}

            {/* Pagination */}
            <div className="col-span-full flex justify-center items-center space-x-4 mt-8">
                {pagination.hasPrevPage && (
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        Previous
                    </button>
                )}
                <span className="text-sm text-gray-600">
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                {pagination.hasNextPage && (
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        Next
                    </button>
                )}
            </div>
        </>
    );
}
