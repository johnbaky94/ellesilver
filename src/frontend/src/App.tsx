import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";

const HomePage = lazy(() => import("./pages/Home"));
const CategoryPage = lazy(() => import("./pages/Category"));
const ProductPage = lazy(() => import("./pages/Product"));
const CartPage = lazy(() => import("./pages/Cart"));
const CheckoutSuccessPage = lazy(() => import("./pages/CheckoutSuccess"));
const AdminPage = lazy(() => import("./pages/admin/AdminLayout"));
const AdminProductsPage = lazy(() => import("./pages/admin/Products"));
const AdminCategoriesPage = lazy(() => import("./pages/admin/Categories"));
const AdminOrdersPage = lazy(() => import("./pages/admin/Orders"));

const rootRoute = createRootRoute({
  component: () => (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" label="Loading…" />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$id",
  component: CategoryPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout/success",
  component: CheckoutSuccessPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: AdminProductsPage,
});

const adminCategoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/categories",
  component: AdminCategoriesPage,
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: AdminOrdersPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  categoryRoute,
  productRoute,
  cartRoute,
  checkoutSuccessRoute,
  adminRoute,
  adminProductsRoute,
  adminCategoriesRoute,
  adminOrdersRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
