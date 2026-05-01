import { b as useNavigate, r as reactExports, d as useSearch, j as jsxRuntimeExports } from "./index-Bee7OgJo.js";
import { c as createLucideIcon, B as Button } from "./use-auth-DmTNi5-A.js";
import { u as useCartStore, L as Layout } from "./Layout-wQ7a3abW.js";
import { a as useCreateOrderFromSession } from "./use-orders-CgaYlHbs.js";
import { m as motion } from "./proxy-Du6mftWB.js";
import "./use-categories-BAb9Yh9u.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const clearCart = useCartStore((s) => s.clearCart);
  const cartItems = useCartStore((s) => s.items);
  const createOrderFromSession = useCreateOrderFromSession();
  const orderCreated = reactExports.useRef(false);
  const capturedItems = reactExports.useRef(cartItems);
  const capturedMutate = reactExports.useRef(createOrderFromSession.mutate);
  const capturedClear = reactExports.useRef(clearCart);
  const search = useSearch({ strict: false });
  const sessionId = (search == null ? void 0 : search.session_id) ?? null;
  reactExports.useEffect(() => {
    if (!sessionId || orderCreated.current) return;
    orderCreated.current = true;
    const items = capturedItems.current;
    const totalInCents = BigInt(
      items.reduce(
        (sum, item) => sum + Number(item.product.priceInCents) * item.quantity,
        0
      )
    );
    const input = {
      stripeSessionId: sessionId,
      totalInCents,
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: BigInt(item.quantity),
        priceInCents: item.product.priceInCents
      }))
    };
    capturedMutate.current(
      { sessionId, input },
      { onSettled: () => capturedClear.current() }
    );
  }, [sessionId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[60vh] flex items-center justify-center",
      "data-ocid": "checkout_success.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5 },
          className: "text-center max-w-md px-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl tracking-wide text-foreground mb-3", children: "Order Confirmed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-8 leading-relaxed", children: "Thank you for your purchase. Your order has been received and will be crafted with care. You'll receive a confirmation shortly." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => navigate({ to: "/" }),
                className: "bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase h-11 px-8 font-display transition-smooth",
                "data-ocid": "checkout_success.continue_shopping_button",
                children: "Continue Shopping"
              }
            )
          ]
        }
      )
    }
  ) });
}
export {
  CheckoutSuccessPage as default
};
