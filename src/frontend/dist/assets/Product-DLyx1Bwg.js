import { u as useParams, b as useNavigate, j as jsxRuntimeExports, a as LoadingSpinner, c as ue } from "./index-Bee7OgJo.js";
import { B as Badge } from "./badge-D3vo4aQt.js";
import { B as Button } from "./use-auth-DmTNi5-A.js";
import { u as useCartStore, L as Layout, S as ShoppingBag } from "./Layout-wQ7a3abW.js";
import { b as useProduct } from "./use-products-D6blg24E.js";
import { A as ArrowLeft } from "./arrow-left-BRhxGNgy.js";
import "./use-categories-BAb9Yh9u.js";
import "./proxy-Du6mftWB.js";
function formatPrice(priceInCents) {
  return `$${(Number(priceInCents) / 100).toFixed(0)}`;
}
function ProductPage() {
  var _a;
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(BigInt(id));
  const addItem = useCartStore((s) => s.addItem);
  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    ue.success("Added to bag", { description: product.name });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading product…" }) }) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground", children: "Product not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: () => navigate({ to: "/" }),
          className: "mt-4",
          children: "Back to Shop"
        }
      )
    ] }) });
  }
  const imageUrl = (_a = product.image) == null ? void 0 : _a.getDirectURL();
  const isOutOfStock = product.inventory <= 0n;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", "data-ocid": "product.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/" }),
        className: "flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8",
        "data-ocid": "product.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
          "Back"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-secondary overflow-hidden", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: imageUrl,
          alt: product.name,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground text-xs tracking-widest uppercase", children: "No image" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col justify-center space-y-6",
          "data-ocid": "product.details",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2", children: "Sterling Silver" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl tracking-wide text-foreground mb-3", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-accent", children: formatPrice(product.priceInCents) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: product.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: isOutOfStock ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs tracking-widest uppercase",
                children: "Sold Out"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs tracking-widest uppercase text-accent border-accent/40",
                children: [
                  "In Stock (",
                  product.inventory.toString(),
                  " available)"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleAddToCart,
                disabled: isOutOfStock,
                className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase h-12 font-display transition-smooth",
                "data-ocid": "product.add_to_cart_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
                  isOutOfStock ? "Sold Out" : "Add to Bag"
                ]
              }
            )
          ]
        }
      )
    ] })
  ] }) });
}
export {
  ProductPage as default
};
