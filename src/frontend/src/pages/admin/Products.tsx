import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Image, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../../backend";
import { ExternalBlob } from "../../backend";
import { EmptyState } from "../../components/EmptyState";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useCategoryTree } from "../../hooks/use-categories";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "../../hooks/use-products";
import { AdminShell } from "./AdminLayout";

interface ProductFormData {
  name: string;
  description: string;
  priceInCents: string;
  inventory: string;
  categoryId: string;
  imageFile: File | null;
}

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  priceInCents: "",
  inventory: "",
  categoryId: "",
  imageFile: null,
};

export default function AdminProductsPage() {
  const { data: products, isLoading } = useProducts();
  const { flat: flatCategories } = useCategoryTree();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [uploadProgress, setUploadProgress] = useState(0);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      description: product.description,
      priceInCents: (Number(product.priceInCents) / 100).toString(),
      inventory: product.inventory.toString(),
      categoryId: product.categoryId.toString(),
      imageFile: null,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageBlob: ExternalBlob | undefined;
      if (form.imageFile) {
        const bytes = new Uint8Array(await form.imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
          setUploadProgress(pct);
        });
      }

      const input = {
        name: form.name,
        description: form.description,
        priceInCents: BigInt(
          Math.round(Number.parseFloat(form.priceInCents) * 100),
        ),
        inventory: BigInt(Number.parseInt(form.inventory)),
        categoryId: BigInt(form.categoryId),
        image: imageBlob,
      };

      if (editing) {
        await updateProduct.mutateAsync({ id: editing.id, input });
        toast.success("Product updated");
      } else {
        await createProduct.mutateAsync(input);
        toast.success("Product created");
      }
      setDialogOpen(false);
      setUploadProgress(0);
    } catch (err) {
      toast.error("Failed to save product", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6" data-ocid="admin.products_page">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl tracking-wide text-foreground">
              Products
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              {products?.length ?? 0} pieces in your collection
            </p>
          </div>
          <Button
            onClick={openCreate}
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase"
            data-ocid="admin.products.add_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {isLoading ? (
          <LoadingSpinner label="Loading products…" className="py-20" />
        ) : products && products.length > 0 ? (
          <div
            className="border border-border overflow-hidden"
            data-ocid="admin.products.table"
          >
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  {["Product", "Category", "Price", "Inventory", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-display text-xs tracking-widest uppercase text-muted-foreground"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product, index) => {
                  const imageUrl = product.image?.getDirectURL();
                  const category = flatCategories.find(
                    (c) => c.id === product.categoryId,
                  );
                  return (
                    <tr
                      key={product.id.toString()}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`admin.products.row.${index + 1}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-secondary flex-shrink-0 overflow-hidden">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Image className="w-4 h-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-display text-xs tracking-widest uppercase truncate">
                              {product.name}
                            </p>
                            <p className="font-body text-xs text-muted-foreground truncate max-w-xs">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-body text-sm text-muted-foreground">
                          {category ? category.fullPath : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-display text-sm">
                          ${(Number(product.priceInCents) / 100).toFixed(0)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-body text-sm ${product.inventory <= 0n ? "text-destructive" : "text-foreground"}`}
                        >
                          {product.inventory.toString()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(product)}
                            aria-label="Edit product"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            data-ocid={`admin.products.edit_button.${index + 1}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            aria-label="Delete product"
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            data-ocid={`admin.products.delete_button.${index + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={<Plus className="w-8 h-8" />}
            title="No Products Yet"
            description="Start building your collection by adding your first product."
            action={{ label: "Add First Product", onClick: openCreate }}
          />
        )}

        {/* Product Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg" data-ocid="admin.product.dialog">
            <DialogHeader>
              <DialogTitle className="font-display tracking-wide">
                {editing ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="font-display text-xs tracking-widest uppercase"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  data-ocid="admin.product.name_input"
                />
              </div>
              <div>
                <Label
                  htmlFor="description"
                  className="font-display text-xs tracking-widest uppercase"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  data-ocid="admin.product.description_input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="price"
                    className="font-display text-xs tracking-widest uppercase"
                  >
                    Price (USD)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.priceInCents}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, priceInCents: e.target.value }))
                    }
                    required
                    data-ocid="admin.product.price_input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="inventory"
                    className="font-display text-xs tracking-widest uppercase"
                  >
                    Inventory
                  </Label>
                  <Input
                    id="inventory"
                    type="number"
                    min="0"
                    value={form.inventory}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, inventory: e.target.value }))
                    }
                    required
                    data-ocid="admin.product.inventory_input"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="category"
                  className="font-display text-xs tracking-widest uppercase"
                >
                  Category
                </Label>
                <Select
                  value={form.categoryId}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, categoryId: v }))
                  }
                >
                  <SelectTrigger data-ocid="admin.product.category_select">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {flatCategories.map((cat) => (
                      <SelectItem
                        key={cat.id.toString()}
                        value={cat.id.toString()}
                      >
                        <span
                          className="inline-flex items-center gap-1"
                          style={{ paddingLeft: `${cat.depth * 14}px` }}
                        >
                          {cat.depth > 0 && (
                            <span className="text-muted-foreground text-xs">
                              {"›".repeat(cat.depth)}{" "}
                            </span>
                          )}
                          {cat.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="image"
                  className="font-display text-xs tracking-widest uppercase"
                >
                  Product Image {editing && "(leave empty to keep current)"}
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      imageFile: e.target.files?.[0] ?? null,
                    }))
                  }
                  data-ocid="admin.product.image_input"
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={createProduct.isPending || updateProduct.isPending}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase"
                  data-ocid="admin.product.submit_button"
                >
                  {createProduct.isPending || updateProduct.isPending
                    ? "Saving…"
                    : editing
                      ? "Save Changes"
                      : "Add Product"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="text-xs tracking-widest uppercase"
                  data-ocid="admin.product.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminShell>
  );
}
