import { Button } from "@/components/ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { OrderInput } from "../backend";
import { Layout } from "../components/Layout";
import { useCreateOrderFromSession } from "../hooks/use-orders";
import { useCartStore } from "../store/cart";

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const clearCart = useCartStore((s) => s.clearCart);
  const cartItems = useCartStore((s) => s.items);
  const createOrderFromSession = useCreateOrderFromSession();
  const orderCreated = useRef(false);
  // Capture items at mount time to prevent stale closure issues
  const capturedItems = useRef(cartItems);
  const capturedMutate = useRef(createOrderFromSession.mutate);
  const capturedClear = useRef(clearCart);

  // Read session_id from URL search params
  const search = useSearch({ strict: false }) as Record<string, string>;
  const sessionId = search?.session_id ?? null;

  useEffect(() => {
    if (!sessionId || orderCreated.current) return;
    orderCreated.current = true;

    const items = capturedItems.current;
    const totalInCents = BigInt(
      items.reduce(
        (sum, item) => sum + Number(item.product.priceInCents) * item.quantity,
        0,
      ),
    );

    const input: OrderInput = {
      stripeSessionId: sessionId,
      totalInCents,
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: BigInt(item.quantity),
        priceInCents: item.product.priceInCents,
      })),
    };

    capturedMutate.current(
      { sessionId, input },
      { onSettled: () => capturedClear.current() },
    );
  }, [sessionId]);

  return (
    <Layout>
      <div
        className="min-h-[60vh] flex items-center justify-center"
        data-ocid="checkout_success.page"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md px-6"
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-display text-3xl tracking-wide text-foreground mb-3">
            Order Confirmed
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
            Thank you for your purchase. Your order has been received and will
            be crafted with care. You'll receive a confirmation shortly.
          </p>
          <Button
            onClick={() => navigate({ to: "/" })}
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase h-11 px-8 font-display transition-smooth"
            data-ocid="checkout_success.continue_shopping_button"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}
