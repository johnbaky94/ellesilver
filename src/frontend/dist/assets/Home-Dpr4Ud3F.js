import { j as jsxRuntimeExports, L as Link, a as LoadingSpinner, P as ProductGridSkeleton, r as reactExports } from "./index-Bee7OgJo.js";
import { E as EmptyState } from "./EmptyState-BSXc1Moo.js";
import { L as Layout, S as ShoppingBag } from "./Layout-wQ7a3abW.js";
import { P as ProductCard } from "./ProductCard-C-h0U9VF.js";
import { u as useCategoryTree } from "./use-categories-BAb9Yh9u.js";
import { u as useProducts } from "./use-products-D6blg24E.js";
import { m as motion } from "./proxy-Du6mftWB.js";
import { C as ChevronDown } from "./chevron-down-UPGpPvw0.js";
import { C as ChevronRight } from "./chevron-right-DEFCMmS7.js";
import "./use-auth-DmTNi5-A.js";
import "./badge-D3vo4aQt.js";
function HomePage() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { tree: categoryTree, isLoading: categoriesLoading } = useCategoryTree();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative overflow-hidden bg-secondary",
        "data-ocid": "home.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "font-display text-xs tracking-[0.3em] uppercase text-accent mb-4",
              children: "Timeless Craftsmanship"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "font-display text-5xl md:text-6xl tracking-wide text-foreground leading-none mb-6",
              children: [
                "Silver, ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-accent", children: "defined." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.2 },
              className: "font-body text-base text-muted-foreground mb-8 leading-relaxed",
              children: "Hand-finished sterling silver jewelry crafted for the modern woman. Each piece tells a story of precision and artistry."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  href: "#new-arrivals",
                  to: "/",
                  className: "inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 text-xs tracking-widest uppercase font-display hover:bg-accent/90 transition-smooth",
                  "data-ocid": "home.hero_cta",
                  onClick: (e) => {
                    var _a;
                    e.preventDefault();
                    (_a = document.getElementById("new-arrivals")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                    "Shop New Arrivals"
                  ]
                }
              )
            }
          )
        ] }) })
      }
    ),
    !categoriesLoading && categoryTree.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-12",
        "data-ocid": "home.categories_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6", children: "Shop by Category" }),
          categoriesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading…", className: "py-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-col gap-1",
              "data-ocid": "home.category_list",
              children: categoryTree.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                CategoryNavItem,
                {
                  cat,
                  index: i
                },
                cat.id.toString()
              ))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "new-arrivals",
        className: "bg-muted/30 py-14",
        "data-ocid": "home.products_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl tracking-wide text-foreground", children: "New Arrivals" }) }),
          productsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, { count: 8 }) : products && products.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8", children: products.slice(0, 8).map((product, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductCard,
            {
              product,
              index
            },
            product.id.toString()
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8" }),
              title: "No Products Yet",
              description: "Check back soon — new pieces are always being crafted."
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", "data-ocid": "home.values_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 text-center", children: [
      {
        title: "Sterling Silver",
        desc: "Every piece is crafted from .925 sterling silver, hallmarked for authenticity."
      },
      {
        title: "Handcrafted",
        desc: "Skilled artisans hand-finish each piece ensuring unique, lasting quality."
      },
      {
        title: "Free Shipping",
        desc: "Complimentary shipping on all orders, worldwide, with tracked delivery."
      }
    ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: i * 0.1 },
        className: "space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm tracking-widest uppercase text-foreground", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: item.desc })
        ]
      },
      item.title
    )) }) }) })
  ] });
}
function CategoryNavItem({ cat, index, depth = 0 }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const hasChildren = cat.children.length > 0;
  const indent = depth * 16;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 group",
        style: { paddingLeft: `${indent}px` },
        "data-ocid": `home.category_item.${index + 1}`,
        children: [
          hasChildren ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setExpanded((v) => !v),
              className: "flex-shrink-0 text-muted-foreground hover:text-accent transition-colors",
              "aria-label": expanded ? "Collapse" : "Expand",
              "data-ocid": `home.category_toggle.${index + 1}`,
              children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/category/$id",
              params: { id: cat.id.toString() },
              className: "flex items-center gap-2 font-display text-xs tracking-widest uppercase text-foreground hover:text-accent transition-smooth py-1",
              "data-ocid": "home.category_link",
              children: [
                cat.name,
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-xs normal-case tracking-normal text-muted-foreground", children: [
                  "(",
                  cat.productCount.toString(),
                  ")"
                ] })
              ]
            }
          )
        ]
      }
    ),
    hasChildren && expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: cat.children.map((child, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategoryNavItem,
      {
        cat: child,
        index: ci,
        depth: depth + 1
      },
      child.id.toString()
    )) })
  ] });
}
export {
  HomePage as default
};
