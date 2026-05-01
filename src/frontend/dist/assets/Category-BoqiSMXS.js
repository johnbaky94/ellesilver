import { u as useParams, j as jsxRuntimeExports, L as Link, P as ProductGridSkeleton } from "./index-Bee7OgJo.js";
import { E as EmptyState } from "./EmptyState-BSXc1Moo.js";
import { L as Layout, S as ShoppingBag } from "./Layout-wQ7a3abW.js";
import { P as ProductCard } from "./ProductCard-C-h0U9VF.js";
import { u as useCategoryTree } from "./use-categories-BAb9Yh9u.js";
import { a as useProductsByCategory } from "./use-products-D6blg24E.js";
import { c as createLucideIcon } from "./use-auth-DmTNi5-A.js";
import { C as ChevronRight } from "./chevron-right-DEFCMmS7.js";
import "./proxy-Du6mftWB.js";
import "./badge-D3vo4aQt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode);
function CategoryPage() {
  var _a;
  const { id } = useParams({ from: "/category/$id" });
  const categoryId = BigInt(id);
  const { flat: flatCategories, isLoading: catLoading } = useCategoryTree();
  const { data: products, isLoading: productsLoading } = useProductsByCategory(categoryId);
  const category = flatCategories.find((c) => c.id === categoryId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", "data-ocid": "category.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        className: "flex items-center gap-1.5 mb-8 flex-wrap",
        "aria-label": "Breadcrumb",
        "data-ocid": "category.breadcrumb",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "flex items-center gap-1 font-body text-xs text-muted-foreground hover:text-accent transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3 h-3" }),
                "Home"
              ]
            }
          ),
          category == null ? void 0 : category.ancestorPath.map((ancestor) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/category/$id",
                    params: { id: ancestor.id.toString() },
                    className: "font-body text-xs text-muted-foreground hover:text-accent transition-colors",
                    children: ancestor.name
                  }
                )
              ]
            },
            ancestor.id.toString()
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground" }),
          catLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-24 bg-muted animate-pulse rounded" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs tracking-widest uppercase text-foreground", children: (category == null ? void 0 : category.name) ?? "Collection" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: catLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted animate-pulse w-48 mb-2 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted animate-pulse w-80 rounded" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl tracking-wide text-foreground mb-2", children: (category == null ? void 0 : category.name) ?? "Collection" }),
      (category == null ? void 0 : category.description) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-prose", children: category.description })
    ] }) }),
    (((_a = category == null ? void 0 : category.children) == null ? void 0 : _a.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", "data-ocid": "category.subcategories_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3", children: "Browse Subcategories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: category == null ? void 0 : category.children.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/category/$id",
          params: { id: sub.id.toString() },
          className: "px-4 py-1.5 border border-border text-xs tracking-widest uppercase font-display text-foreground hover:border-accent hover:text-accent transition-smooth",
          "data-ocid": "category.subcategory_link",
          children: [
            sub.name,
            sub.productCount > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-muted-foreground", children: [
              "(",
              sub.productCount.toString(),
              ")"
            ] })
          ]
        },
        sub.id.toString()
      )) })
    ] }),
    productsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, { count: 8 }) : products && products.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8",
        "data-ocid": "category.product_list",
        children: products.map((product, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductCard,
          {
            product,
            index
          },
          product.id.toString()
        ))
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8" }),
        title: "No Products in This Category",
        description: "New pieces are being crafted. Check back soon."
      }
    )
  ] }) });
}
export {
  CategoryPage as default
};
