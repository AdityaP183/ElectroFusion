/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as categories from "../categories.js";
import type * as http from "../http.js";
import type * as products from "../products.js";
import type * as users from "../users.js";
import type * as vendor from "../vendor.js";
import type * as vendorApplication from "../vendorApplication.js";
import type * as vendorProducts from "../vendorProducts.js";
import type * as wishlist from "../wishlist.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  categories: typeof categories;
  http: typeof http;
  products: typeof products;
  users: typeof users;
  vendor: typeof vendor;
  vendorApplication: typeof vendorApplication;
  vendorProducts: typeof vendorProducts;
  wishlist: typeof wishlist;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
