import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Category {
    id: CategoryId;
    name: string;
    createdAt: Timestamp;
    description: string;
    parentCategoryId?: CategoryId;
}
export interface ProductInput {
    categoryId: CategoryId;
    inventory: bigint;
    name: string;
    description: string;
    image?: ExternalBlob;
    priceInCents: bigint;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CategoryInput {
    name: string;
    description: string;
    parentCategoryId?: CategoryId;
}
export interface CategoryAncestor {
    id: CategoryId;
    name: string;
}
export interface OrderItem {
    productId: ProductId;
    productName: string;
    quantity: bigint;
    priceInCents: bigint;
}
export interface OrderInput {
    totalInCents: bigint;
    items: Array<OrderItem>;
    stripeSessionId: string;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    customer: Principal;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    totalInCents: bigint;
    items: Array<OrderItem>;
    stripeSessionId: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CategoryWithCount {
    id: CategoryId;
    name: string;
    createdAt: Timestamp;
    description: string;
    productCount: bigint;
    parentCategoryId?: CategoryId;
    ancestorPath: Array<CategoryAncestor>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type CategoryId = bigint;
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ProductId = bigint;
export interface Product {
    id: ProductId;
    categoryId: CategoryId;
    inventory: bigint;
    name: string;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    image?: ExternalBlob;
    priceInCents: bigint;
}
export type OrderId = bigint;
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    paid = "paid",
    delivered = "delivered"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCategory(input: CategoryInput): Promise<Category>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrderFromSession(sessionId: string, input: OrderInput): Promise<Order>;
    createProduct(input: ProductInput): Promise<Product>;
    deleteCategory(id: CategoryId): Promise<boolean>;
    deleteProduct(id: ProductId): Promise<boolean>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserRole(): Promise<UserRole>;
    getCategories(): Promise<Array<CategoryWithCount>>;
    getCategory(id: CategoryId): Promise<Category | null>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(id: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(categoryId: CategoryId): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCategory(id: CategoryId, input: CategoryInput): Promise<Category | null>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<Order | null>;
    updateProduct(id: ProductId, input: ProductInput): Promise<Product | null>;
}
