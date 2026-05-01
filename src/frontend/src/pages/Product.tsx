import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useProduct } from "../hooks/use-products";
import { useCartStore } from "../store/cart";

function formatPrice(priceInCents: bigint): string {
  return `$${(Number(priceInCents) / 100).toFixed(0)}`;
}

export default function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(BigInt(id));
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    toast.success("Added to bag", { description: product.name });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <LoadingSpinner size="lg" label="Loading product…" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="font-display text-xl text-foreground">
            Product not found.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            className="mt-4"
          >
            Back to Shop
          </Button>
        </div>
      </Layout>
    );
  }

  const imageUrl = product.image?.getDirectURL();
  const isOutOfStock = product.inventory <= 0n;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10" data-ocid="product.page">
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
          data-ocid="product.back_button"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="aspect-square bg-secondary overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs tracking-widest uppercase">
                No image
              </div>
            )}
          </div>

          {/* Details */}
          <div
            className="flex flex-col justify-center space-y-6"
            data-ocid="product.details"
          >
            <div>
              <p className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
                Sterling Silver
              </p>
              <h1 className="font-display text-3xl tracking-wide text-foreground mb-3">
                {product.name}
              </h1>
              <p className="font-display text-2xl text-accent">
                {formatPrice(product.priceInCents)}
              </p>
            </div>

            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-3">
              {isOutOfStock ? (
                <Badge
                  variant="secondary"
                  className="text-xs tracking-widest uppercase"
                >
                  Sold Out
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-xs tracking-widest uppercase text-accent border-accent/40"
                >
                  In Stock ({product.inventory.toString()} available)
                </Badge>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase h-12 font-display transition-smooth"
              data-ocid="product.add_to_cart_button"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              {isOutOfStock ? "Sold Out" : "Add to Bag"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
