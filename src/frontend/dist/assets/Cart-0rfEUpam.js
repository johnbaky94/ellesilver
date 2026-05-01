import { b as useNavigate, j as jsxRuntimeExports, c as ue } from "./index-Bee7OgJo.js";
import { c as createLucideIcon, u as useAuth, B as Button } from "./use-auth-DmTNi5-A.js";
import { E as EmptyState } from "./EmptyState-BSXc1Moo.js";
import { u as useCartStore, L as Layout, S as ShoppingBag } from "./Layout-wQ7a3abW.js";
import { u as useCreateCheckoutSession } from "./use-orders-CgaYlHbs.js";
import { P as Plus, T as Trash2 } from "./trash-2-BykTTyl_.js";
import "./proxy-Du6mftWB.js";
import "./use-categories-BAb9Yh9u.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function formatPrice(priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`;
}
function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  } = useCartStore();
  const { isAuthenticated, login } = useAuth();
  const createCheckoutSession = useCreateCheckoutSession();
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    try {
      const shoppingItems = items.map((item) => ({
        productName: item.product.name,
        productDescription: item.product.description,
        currency: "usd",
        quantity: BigInt(item.quantity),
        priceInCents: item.product.priceInCents
      }));
      const session = await createCheckoutSession.mutateAsync(shoppingItems);
      if (!(session == null ? void 0 : session.url)) throw new Error("No checkout URL");
      window.location.href = session.url;
    } catch (err) {
      ue.error("Checkout failed", {
        description: err instanceof Error ? err.message : "Please try again."
      });
    }
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl tracking-wide text-foreground mb-10", children: "Your Bag" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8" }),
          title: "Your Bag is Empty",
          description: "Discover our collection of handcrafted silver jewelry.",
          action: { label: "Shop Now", onClick: () => navigate({ to: "/" }) }
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", "data-ocid": "cart.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl tracking-wide text-foreground", children: [
        "Your Bag (",
        totalItems(),
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => clearCart(),
          className: "text-xs tracking-widest uppercase text-muted-foreground hover:text-destructive transition-colors",
          "data-ocid": "cart.clear_button",
          children: "Clear All"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", "data-ocid": "cart.item_list", children: items.map((item, index) => {
        var _a;
        const imageUrl = (_a = item.product.image) == null ? void 0 : _a.getDirectURL();
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-5 pb-6 border-b border-border",
            "data-ocid": `cart.item.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-secondary flex-shrink-0 overflow-hidden", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageUrl,
                  alt: item.product.name,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-muted" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm tracking-widest uppercase text-foreground mb-1 truncate", children: item.product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-accent mb-3", children: [
                  "$",
                  (Number(item.product.priceInCents) / 100).toFixed(0)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(item.product.id, item.quantity - 1),
                      className: "w-7 h-7 border border-border flex items-center justify-center hover:border-foreground transition-smooth",
                      "data-ocid": `cart.decrease_qty.${index + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm w-6 text-center", children: item.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(item.product.id, item.quantity + 1),
                      className: "w-7 h-7 border border-border flex items-center justify-center hover:border-foreground transition-smooth",
                      "data-ocid": `cart.increase_qty.${index + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeItem(item.product.id),
                      className: "ml-auto text-muted-foreground hover:text-destructive transition-colors",
                      "data-ocid": `cart.remove_item.${index + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] })
            ]
          },
          item.product.id.toString()
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border p-6 h-fit",
          "data-ocid": "cart.summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm tracking-widest uppercase text-foreground mb-6", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-muted-foreground", children: [
                  "Subtotal (",
                  totalItems(),
                  " items)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: formatPrice(totalPrice()) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-muted-foreground", children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-accent text-xs tracking-widest uppercase", children: "Free" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-border flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm tracking-widest uppercase", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg", children: formatPrice(totalPrice()) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleCheckout,
                disabled: createCheckoutSession.isPending,
                className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase h-12 font-display transition-smooth",
                "data-ocid": "cart.checkout_button",
                children: createCheckoutSession.isPending ? "Processing…" : isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"
              }
            )
          ]
        }
      )
    ] })
  ] }) });
}
export {
  CartPage as default
};
