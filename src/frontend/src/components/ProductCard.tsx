import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend";
import { useCartStore } from "../store/cart";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function formatPrice(priceInCents: bigint): string {
  return `$${(Number(priceInCents) / 100).toFixed(0)}`;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const imageUrl = product.image?.getDirectURL();
  const isOutOfStock = product.inventory <= 0n;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group cursor-pointer"
      onClick={() =>
        navigate({ to: "/product/$id", params: { id: product.id.toString() } })
      }
      data-ocid={`product.item.${index + 1}`}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-secondary mb-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground text-xs tracking-widest uppercase">
              No image
            </span>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <Badge
              variant="secondary"
              className="text-xs tracking-widest uppercase"
            >
              Sold Out
            </Badge>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="space-y-2">
        <p className="font-display text-xs tracking-widest uppercase text-foreground leading-tight line-clamp-2">
          {product.name}
        </p>
        <p className="font-body text-sm text-accent font-medium">
          {formatPrice(product.priceInCents)}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs tracking-widest uppercase border-foreground/20 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-smooth"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          data-ocid={`product.add_to_cart.${index + 1}`}
        >
          <ShoppingBag className="w-3 h-3 mr-2" />
          {isOutOfStock ? "Sold Out" : "Add to Bag"}
        </Button>
      </div>
    </motion.div>
  );
}
