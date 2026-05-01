import type { Principal } from "@icp-sdk/core/principal";
import type { CategoryAncestor, ExternalBlob, OrderStatus } from "../backend";

export type { CategoryAncestor, ExternalBlob, OrderStatus };

export type CategoryId = bigint;

export interface Product {
  id: bigint;
  categoryId: bigint;
  inventory: bigint;
  name: string;
  description: string;
  priceInCents: bigint;
  image?: ExternalBlob;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  parentCategoryId?: CategoryId;
  createdAt: bigint;
}

export interface CategoryWithCount {
  id: CategoryId;
  name: string;
  description: string;
  parentCategoryId?: CategoryId;
  ancestorPath: CategoryAncestor[];
  productCount: bigint;
  createdAt: bigint;
}

/** Tree node — built client-side from flat CategoryWithCount list */
export interface CategoryTreeNode extends CategoryWithCount {
  children: CategoryTreeNode[];
  depth: number;
  /** Full display path e.g. "Rings / Engagement / Diamond" */
  fullPath: string;
}

export interface OrderItem {
  productId: bigint;
  productName: string;
  quantity: bigint;
  priceInCents: bigint;
}

export interface Order {
  id: bigint;
  status: OrderStatus;
  customer: Principal;
  createdAt: bigint;
  updatedAt: bigint;
  totalInCents: bigint;
  items: OrderItem[];
  stripeSessionId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutSession {
  id: string;
  url: string;
}

export interface ShoppingItem {
  productName: string;
  productDescription: string;
  currency: string;
  quantity: bigint;
  priceInCents: bigint;
}
