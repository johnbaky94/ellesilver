import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { Layout } from "../components/Layout";
import {
  LoadingSpinner,
  ProductGridSkeleton,
} from "../components/LoadingSpinner";
import { ProductCard } from "../components/ProductCard";
import { useCategoryTree } from "../hooks/use-categories";
import { useProducts } from "../hooks/use-products";
import type { CategoryTreeNode } from "../types";

export default function HomePage() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { tree: categoryTree, isLoading: categoriesLoading } =
    useCategoryTree();

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-secondary"
        data-ocid="home.hero_section"
      >
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-xs tracking-[0.3em] uppercase text-accent mb-4"
            >
              Timeless Craftsmanship
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl tracking-wide text-foreground leading-none mb-6"
            >
              Silver, <span className="italic text-accent">defined.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-base text-muted-foreground mb-8 leading-relaxed"
            >
              Hand-finished sterling silver jewelry crafted for the modern
              woman. Each piece tells a story of precision and artistry.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="#new-arrivals"
                to="/"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 text-xs tracking-widest uppercase font-display hover:bg-accent/90 transition-smooth"
                data-ocid="home.hero_cta"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("new-arrivals")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <ShoppingBag className="w-4 h-4" />
                Shop New Arrivals
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {!categoriesLoading && categoryTree.length > 0 && (
        <section
          className="bg-background py-12"
          data-ocid="home.categories_section"
        >
          <div className="container mx-auto px-4">
            <h2 className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Shop by Category
            </h2>
            {categoriesLoading ? (
              <LoadingSpinner label="Loading…" className="py-4" />
            ) : (
              <div
                className="flex flex-col gap-1"
                data-ocid="home.category_list"
              >
                {categoryTree.map((cat, i) => (
                  <CategoryNavItem
                    key={cat.id.toString()}
                    cat={cat}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Products Section */}
      <section
        id="new-arrivals"
        className="bg-muted/30 py-14"
        data-ocid="home.products_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-2xl tracking-wide text-foreground">
              New Arrivals
            </h2>
          </div>

          {productsLoading ? (
            <ProductGridSkeleton count={8} />
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {products.slice(0, 8).map((product, index) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<ShoppingBag className="w-8 h-8" />}
              title="No Products Yet"
              description="Check back soon — new pieces are always being crafted."
            />
          )}
        </div>
      </section>

      {/* Value props section */}
      <section className="bg-background py-14" data-ocid="home.values_section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              {
                title: "Sterling Silver",
                desc: "Every piece is crafted from .925 sterling silver, hallmarked for authenticity.",
              },
              {
                title: "Handcrafted",
                desc: "Skilled artisans hand-finish each piece ensuring unique, lasting quality.",
              },
              {
                title: "Free Shipping",
                desc: "Complimentary shipping on all orders, worldwide, with tracked delivery.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="space-y-3"
              >
                <h3 className="font-display text-sm tracking-widest uppercase text-foreground">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

interface CategoryNavItemProps {
  cat: CategoryTreeNode;
  index: number;
  depth?: number;
}

function CategoryNavItem({ cat, index, depth = 0 }: CategoryNavItemProps) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = cat.children.length > 0;
  const indent = depth * 16;

  return (
    <div>
      <div
        className="flex items-center gap-2 group"
        style={{ paddingLeft: `${indent}px` }}
        data-ocid={`home.category_item.${index + 1}`}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex-shrink-0 text-muted-foreground hover:text-accent transition-colors"
            aria-label={expanded ? "Collapse" : "Expand"}
            data-ocid={`home.category_toggle.${index + 1}`}
          >
            {expanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>
        ) : (
          <span className="w-3 h-3 flex-shrink-0" />
        )}
        <Link
          to="/category/$id"
          params={{ id: cat.id.toString() }}
          className="flex items-center gap-2 font-display text-xs tracking-widest uppercase text-foreground hover:text-accent transition-smooth py-1"
          data-ocid="home.category_link"
        >
          {cat.name}
          <span className="font-body text-xs normal-case tracking-normal text-muted-foreground">
            ({cat.productCount.toString()})
          </span>
        </Link>
      </div>

      {hasChildren && expanded && (
        <div className="mt-0.5">
          {cat.children.map((child, ci) => (
            <CategoryNavItem
              key={child.id.toString()}
              cat={child}
              index={ci}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
