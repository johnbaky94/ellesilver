import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "../components/EmptyState";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/use-auth";
import { useCreateCheckoutSession } from "../hooks/use-orders";
import { useCartStore } from "../store/cart";

function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
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
        priceInCents: item.product.priceInCents,
      }));

      const session = await createCheckoutSession.mutateAsync(shoppingItems);
      if (!session?.url) throw new Error("No checkout URL");
      window.location.href = session.url;
    } catch (err) {
      toast.error("Checkout failed", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10">
          <h1 className="font-display text-2xl tracking-wide text-foreground mb-10">
            Your Bag
          </h1>
          <EmptyState
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Your Bag is Empty"
            description="Discover our collection of handcrafted silver jewelry."
            action={{ label: "Shop Now", onClick: () => navigate({ to: "/" }) }}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10" data-ocid="cart.page">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-2xl tracking-wide text-foreground">
            Your Bag ({totalItems()})
          </h1>
          <button
            type="button"
            onClick={() => clearCart()}
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-destructive transition-colors"
            data-ocid="cart.clear_button"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6" data-ocid="cart.item_list">
            {items.map((item, index) => {
              const imageUrl = item.product.image?.getDirectURL();
              return (
                <div
                  key={item.product.id.toString()}
                  className="flex gap-5 pb-6 border-b border-border"
                  data-ocid={`cart.item.${index + 1}`}
                >
                  <div className="w-24 h-24 bg-secondary flex-shrink-0 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm tracking-widest uppercase text-foreground mb-1 truncate">
                      {item.product.name}
                    </p>
                    <p className="font-body text-sm text-accent mb-3">
                      ${(Number(item.product.priceInCents) / 100).toFixed(0)}
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-7 h-7 border border-border flex items-center justify-center hover:border-foreground transition-smooth"
                        data-ocid={`cart.decrease_qty.${index + 1}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-display text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-7 h-7 border border-border flex items-center justify-center hover:border-foreground transition-smooth"
                        data-ocid={`cart.increase_qty.${index + 1}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                        data-ocid={`cart.remove_item.${index + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div
            className="bg-card border border-border p-6 h-fit"
            data-ocid="cart.summary"
          >
            <h2 className="font-display text-sm tracking-widest uppercase text-foreground mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="font-body text-muted-foreground">
                  Subtotal ({totalItems()} items)
                </span>
                <span className="font-display">
                  {formatPrice(totalPrice())}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-body text-muted-foreground">
                  Shipping
                </span>
                <span className="font-display text-accent text-xs tracking-widest uppercase">
                  Free
                </span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between">
                <span className="font-display text-sm tracking-widest uppercase">
                  Total
                </span>
                <span className="font-display text-lg">
                  {formatPrice(totalPrice())}
                </span>
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              disabled={createCheckoutSession.isPending}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase h-12 font-display transition-smooth"
              data-ocid="cart.checkout_button"
            >
              {createCheckoutSession.isPending
                ? "Processing…"
                : isAuthenticated
                  ? "Proceed to Checkout"
                  : "Login to Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
