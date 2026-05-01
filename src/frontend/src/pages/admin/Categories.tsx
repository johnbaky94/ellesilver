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
import { ChevronRight, FolderPlus, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CategoryWithCount } from "../../backend";
import { EmptyState } from "../../components/EmptyState";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import {
  buildCategoryTree,
  flattenTree,
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../hooks/use-categories";
import type { CategoryTreeNode } from "../../types";
import { AdminShell } from "./AdminLayout";

interface CategoryFormData {
  name: string;
  description: string;
  parentCategoryId: string; // "" = root
}

const emptyForm: CategoryFormData = {
  name: "",
  description: "",
  parentCategoryId: "",
};

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryWithCount | null>(null);
  const [form, setForm] = useState<CategoryFormData>(emptyForm);

  const tree = categories ? buildCategoryTree(categories) : [];
  const flat = flattenTree(tree);

  const openCreate = (parentId?: bigint) => {
    setEditing(null);
    setForm({
      ...emptyForm,
      parentCategoryId: parentId !== undefined ? parentId.toString() : "",
    });
    setDialogOpen(true);
  };

  const openEdit = (cat: CategoryWithCount) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      description: cat.description,
      parentCategoryId:
        cat.parentCategoryId !== undefined && cat.parentCategoryId !== null
          ? cat.parentCategoryId.toString()
          : "",
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parentCategoryId =
      form.parentCategoryId !== "" ? BigInt(form.parentCategoryId) : undefined;
    const input = {
      name: form.name,
      description: form.description,
      parentCategoryId,
    };
    try {
      if (editing) {
        await updateCategory.mutateAsync({ id: editing.id, input });
        toast.success("Category updated");
      } else {
        await createCategory.mutateAsync(input);
        toast.success("Category created");
      }
      setDialogOpen(false);
    } catch (err) {
      toast.error("Failed to save category", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  const handleDelete = async (id: bigint, name: string) => {
    if (
      !confirm(
        `Delete "${name}"? All subcategories and associated products will be affected.`,
      )
    )
      return;
    try {
      await deleteCategory.mutateAsync(id);
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6" data-ocid="admin.categories_page">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl tracking-wide text-foreground">
              Categories
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              {categories?.length ?? 0} collections
            </p>
          </div>
          <Button
            onClick={() => openCreate()}
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase"
            data-ocid="admin.categories.add_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {isLoading ? (
          <LoadingSpinner label="Loading categories…" className="py-20" />
        ) : tree.length > 0 ? (
          <div
            className="border border-border overflow-hidden"
            data-ocid="admin.categories.table"
          >
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  {["Category", "Description", "Products", "Actions"].map(
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
                {flat.map((cat, index) => (
                  <CategoryRow
                    key={cat.id.toString()}
                    cat={cat}
                    index={index}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                    onAddChild={(id) => openCreate(id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={<Plus className="w-8 h-8" />}
            title="No Categories Yet"
            description="Create your first category to organize your jewelry collection."
            action={{
              label: "Add First Category",
              onClick: () => openCreate(),
            }}
          />
        )}

        {/* Category Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent data-ocid="admin.category.dialog">
            <DialogHeader>
              <DialogTitle className="font-display tracking-wide">
                {editing ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="cat-name"
                  className="font-display text-xs tracking-widest uppercase"
                >
                  Name
                </Label>
                <Input
                  id="cat-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  data-ocid="admin.category.name_input"
                />
              </div>
              <div>
                <Label
                  htmlFor="cat-desc"
                  className="font-display text-xs tracking-widest uppercase"
                >
                  Description
                </Label>
                <Textarea
                  id="cat-desc"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  data-ocid="admin.category.description_input"
                />
              </div>
              <div>
                <Label
                  htmlFor="cat-parent"
                  className="font-display text-xs tracking-widest uppercase"
                >
                  Parent Category (optional)
                </Label>
                <Select
                  value={form.parentCategoryId}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, parentCategoryId: v }))
                  }
                >
                  <SelectTrigger
                    id="cat-parent"
                    data-ocid="admin.category.parent_select"
                  >
                    <SelectValue placeholder="None (top-level)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None (top-level)</SelectItem>
                    {flat
                      .filter((c) => c.id !== editing?.id)
                      .map((c) => (
                        <SelectItem
                          key={c.id.toString()}
                          value={c.id.toString()}
                        >
                          <span
                            style={{ paddingLeft: `${c.depth * 16}px` }}
                            className="inline-block"
                          >
                            {c.depth > 0 && (
                              <span className="text-muted-foreground mr-1">
                                {"›".repeat(c.depth)}{" "}
                              </span>
                            )}
                            {c.name}
                          </span>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={
                    createCategory.isPending || updateCategory.isPending
                  }
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase"
                  data-ocid="admin.category.submit_button"
                >
                  {createCategory.isPending || updateCategory.isPending
                    ? "Saving…"
                    : editing
                      ? "Save Changes"
                      : "Add Category"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="text-xs tracking-widest uppercase"
                  data-ocid="admin.category.cancel_button"
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

interface CategoryRowProps {
  cat: CategoryTreeNode;
  index: number;
  onEdit: (cat: CategoryWithCount) => void;
  onDelete: (id: bigint, name: string) => void;
  onAddChild: (parentId: bigint) => void;
}

function CategoryRow({
  cat,
  index,
  onEdit,
  onDelete,
  onAddChild,
}: CategoryRowProps) {
  const indent = cat.depth * 20;

  return (
    <tr
      className="hover:bg-muted/20 transition-colors"
      data-ocid={`admin.categories.row.${index + 1}`}
    >
      <td className="px-4 py-3">
        <div
          className="flex items-center gap-1"
          style={{ paddingLeft: `${indent}px` }}
        >
          {cat.depth > 0 && (
            <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          )}
          <span className="font-display text-sm tracking-widest uppercase">
            {cat.name}
          </span>
        </div>
        {cat.ancestorPath.length > 0 && (
          <p
            className="font-body text-xs text-muted-foreground truncate"
            style={{ paddingLeft: `${indent + (cat.depth > 0 ? 16 : 0)}px` }}
          >
            {cat.ancestorPath.map((a) => a.name).join(" › ")} ›{" "}
            <span className="text-foreground">{cat.name}</span>
          </p>
        )}
      </td>
      <td className="px-4 py-3">
        <span className="font-body text-sm text-muted-foreground line-clamp-1 max-w-xs">
          {cat.description || "—"}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="font-body text-sm tabular-nums">
          {cat.productCount.toString()}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAddChild(cat.id)}
            aria-label="Add subcategory"
            title="Add subcategory"
            className="text-muted-foreground hover:text-accent transition-colors"
            data-ocid={`admin.categories.add_child_button.${index + 1}`}
          >
            <FolderPlus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(cat)}
            aria-label="Edit category"
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-ocid={`admin.categories.edit_button.${index + 1}`}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(cat.id, cat.name)}
            aria-label="Delete category"
            className="text-muted-foreground hover:text-destructive transition-colors"
            data-ocid={`admin.categories.delete_button.${index + 1}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
