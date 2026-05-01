import { b as useNavigate, j as jsxRuntimeExports } from "./index-Bee7OgJo.js";
import { B as Badge } from "./badge-D3vo4aQt.js";
import { B as Button } from "./use-auth-DmTNi5-A.js";
import { u as useCartStore, S as ShoppingBag } from "./Layout-wQ7a3abW.js";
import { m as motion } from "./proxy-Du6mftWB.js";
function formatPrice(priceInCents) {
  return `$${(Number(priceInCents) / 100).toFixed(0)}`;
}
function ProductCard({ product, index = 0 }) {
  var _a;
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
  };
  const imageUrl = (_a = product.image) == null ? void 0 : _a.getDirectURL();
  const isOutOfStock = product.inventory <= 0n;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08 },
      className: "group cursor-pointer",
      onClick: () => navigate({ to: "/product/$id", params: { id: product.id.toString() } }),
      "data-ocid": `product.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-secondary mb-3", children: [
          imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover transition-smooth group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs tracking-widest uppercase", children: "No image" }) }),
          isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs tracking-widest uppercase",
              children: "Sold Out"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs tracking-widest uppercase text-foreground leading-tight line-clamp-2", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-accent font-medium", children: formatPrice(product.priceInCents) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "w-full text-xs tracking-widest uppercase border-foreground/20 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-smooth",
              onClick: handleAddToCart,
              disabled: isOutOfStock,
              "data-ocid": `product.add_to_cart.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3 h-3 mr-2" }),
                isOutOfStock ? "Sold Out" : "Add to Bag"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
