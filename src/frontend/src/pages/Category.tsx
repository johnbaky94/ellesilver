import { Link, useParams } from "@tanstack/react-router";
import { ChevronRight, Home, ShoppingBag } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { Layout } from "../components/Layout";
import { ProductGridSkeleton } from "../components/LoadingSpinner";
import { ProductCard } from "../components/ProductCard";
import { useCategoryTree } from "../hooks/use-categories";
import { useProductsByCategory } from "../hooks/use-products";

export default function CategoryPage() {
  const { id } = useParams({ from: "/category/$id" });
  const categoryId = BigInt(id);

  const { flat: flatCategories, isLoading: catLoading } = useCategoryTree();
  const { data: products, isLoading: productsLoading } =
    useProductsByCategory(categoryId);

  const category = flatCategories.find((c) => c.id === categoryId);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10" data-ocid="category.page">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 mb-8 flex-wrap"
          aria-label="Breadcrumb"
          data-ocid="category.breadcrumb"
        >
          <Link
            to="/"
            className="flex items-center gap-1 font-body text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            <Home className="w-3 h-3" />
            Home
          </Link>
          {category?.ancestorPath.map((ancestor) => (
            <span
              key={ancestor.id.toString()}
              className="flex items-center gap-1.5"
            >
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <Link
                to="/category/$id"
                params={{ id: ancestor.id.toString() }}
                className="font-body text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                {ancestor.name}
              </Link>
            </span>
          ))}
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
          {catLoading ? (
            <span className="h-3 w-24 bg-muted animate-pulse rounded" />
          ) : (
            <span className="font-display text-xs tracking-widest uppercase text-foreground">
              {category?.name ?? "Collection"}
            </span>
          )}
        </nav>

        {/* Category Header */}
        <div className="mb-10">
          {catLoading ? (
            <>
              <div className="h-8 bg-muted animate-pulse w-48 mb-2 rounded" />
              <div className="h-4 bg-muted animate-pulse w-80 rounded" />
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl tracking-wide text-foreground mb-2">
                {category?.name ?? "Collection"}
              </h1>
              {category?.description && (
                <p className="font-body text-sm text-muted-foreground max-w-prose">
                  {category.description}
                </p>
              )}
            </>
          )}
        </div>

        {/* Subcategories (if any) */}
        {(category?.children?.length ?? 0) > 0 && (
          <div className="mb-10" data-ocid="category.subcategories_section">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Browse Subcategories
            </p>
            <div className="flex flex-wrap gap-2">
              {category?.children.map((sub) => (
                <Link
                  key={sub.id.toString()}
                  to="/category/$id"
                  params={{ id: sub.id.toString() }}
                  className="px-4 py-1.5 border border-border text-xs tracking-widest uppercase font-display text-foreground hover:border-accent hover:text-accent transition-smooth"
                  data-ocid="category.subcategory_link"
                >
                  {sub.name}
                  {sub.productCount > 0n && (
                    <span className="ml-1.5 text-muted-foreground">
                      ({sub.productCount.toString()})
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        {productsLoading ? (
          <ProductGridSkeleton count={8} />
        ) : products && products.length > 0 ? (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
            data-ocid="category.product_list"
          >
            {products.map((product, index) => (
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
            title="No Products in This Category"
            description="New pieces are being crafted. Check back soon."
          />
        )}
      </div>
    </Layout>
  );
}
