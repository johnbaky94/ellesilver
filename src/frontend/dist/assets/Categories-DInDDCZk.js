import { r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner, c as ue } from "./index-Bee7OgJo.js";
import { c as createLucideIcon, B as Button } from "./use-auth-DmTNi5-A.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, L as Label, I as Input, T as Textarea, P as Pencil } from "./textarea-CVtd7xMA.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DeW29qIO.js";
import { E as EmptyState } from "./EmptyState-BSXc1Moo.js";
import { a as useCategories, b as useCreateCategory, c as useUpdateCategory, d as useDeleteCategory, e as buildCategoryTree, f as flattenTree } from "./use-categories-BAb9Yh9u.js";
import { A as AdminShell } from "./AdminLayout-DzbV-5VT.js";
import { P as Plus, T as Trash2 } from "./trash-2-BykTTyl_.js";
import { C as ChevronRight } from "./chevron-right-DEFCMmS7.js";
import "./chevron-down-UPGpPvw0.js";
import "./proxy-Du6mftWB.js";
import "./use-orders-CgaYlHbs.js";
import "./arrow-left-BRhxGNgy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const FolderPlus = createLucideIcon("folder-plus", __iconNode);
const emptyForm = {
  name: "",
  description: "",
  parentCategoryId: ""
};
function AdminCategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const tree = categories ? buildCategoryTree(categories) : [];
  const flat = flattenTree(tree);
  const openCreate = (parentId) => {
    setEditing(null);
    setForm({
      ...emptyForm,
      parentCategoryId: parentId !== void 0 ? parentId.toString() : ""
    });
    setDialogOpen(true);
  };
  const openEdit = (cat) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      description: cat.description,
      parentCategoryId: cat.parentCategoryId !== void 0 && cat.parentCategoryId !== null ? cat.parentCategoryId.toString() : ""
    });
    setDialogOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parentCategoryId = form.parentCategoryId !== "" ? BigInt(form.parentCategoryId) : void 0;
    const input = {
      name: form.name,
      description: form.description,
      parentCategoryId
    };
    try {
      if (editing) {
        await updateCategory.mutateAsync({ id: editing.id, input });
        ue.success("Category updated");
      } else {
        await createCategory.mutateAsync(input);
        ue.success("Category created");
      }
      setDialogOpen(false);
    } catch (err) {
      ue.error("Failed to save category", {
        description: err instanceof Error ? err.message : "Unknown error"
      });
    }
  };
  const handleDelete = async (id, name) => {
    if (!confirm(
      `Delete "${name}"? All subcategories and associated products will be affected.`
    ))
      return;
    try {
      await deleteCategory.mutateAsync(id);
      ue.success("Category deleted");
    } catch {
      ue.error("Failed to delete category");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.categories_page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl tracking-wide text-foreground", children: "Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground", children: [
          (categories == null ? void 0 : categories.length) ?? 0,
          " collections"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => openCreate(),
          className: "bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase",
          "data-ocid": "admin.categories.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            "Add Category"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading categories…", className: "py-20" }) : tree.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border border-border overflow-hidden",
        "data-ocid": "admin.categories.table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Category", "Description", "Products", "Actions"].map(
            (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-4 py-3 text-left font-display text-xs tracking-widest uppercase text-muted-foreground",
                children: h
              },
              h
            )
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: flat.map((cat, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CategoryRow,
            {
              cat,
              index,
              onEdit: openEdit,
              onDelete: handleDelete,
              onAddChild: (id) => openCreate(id)
            },
            cat.id.toString()
          )) })
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-8 h-8" }),
        title: "No Categories Yet",
        description: "Create your first category to organize your jewelry collection.",
        action: {
          label: "Add First Category",
          onClick: () => openCreate()
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin.category.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display tracking-wide", children: editing ? "Edit Category" : "Add New Category" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "cat-name",
              className: "font-display text-xs tracking-widest uppercase",
              children: "Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "cat-name",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              required: true,
              "data-ocid": "admin.category.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "cat-desc",
              className: "font-display text-xs tracking-widest uppercase",
              children: "Description"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "cat-desc",
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              rows: 3,
              "data-ocid": "admin.category.description_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "cat-parent",
              className: "font-display text-xs tracking-widest uppercase",
              children: "Parent Category (optional)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.parentCategoryId,
              onValueChange: (v) => setForm((f) => ({ ...f, parentCategoryId: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "cat-parent",
                    "data-ocid": "admin.category.parent_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "None (top-level)" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "", children: "None (top-level)" }),
                  flat.filter((c) => c.id !== (editing == null ? void 0 : editing.id)).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectItem,
                    {
                      value: c.id.toString(),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          style: { paddingLeft: `${c.depth * 16}px` },
                          className: "inline-block",
                          children: [
                            c.depth > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground mr-1", children: [
                              "›".repeat(c.depth),
                              " "
                            ] }),
                            c.name
                          ]
                        }
                      )
                    },
                    c.id.toString()
                  ))
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: createCategory.isPending || updateCategory.isPending,
              className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase",
              "data-ocid": "admin.category.submit_button",
              children: createCategory.isPending || updateCategory.isPending ? "Saving…" : editing ? "Save Changes" : "Add Category"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              className: "text-xs tracking-widest uppercase",
              "data-ocid": "admin.category.cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }) })
  ] }) });
}
function CategoryRow({
  cat,
  index,
  onEdit,
  onDelete,
  onAddChild
}) {
  const indent = cat.depth * 20;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "hover:bg-muted/20 transition-colors",
      "data-ocid": `admin.categories.row.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1",
              style: { paddingLeft: `${indent}px` },
              children: [
                cat.depth > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm tracking-widest uppercase", children: cat.name })
              ]
            }
          ),
          cat.ancestorPath.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "font-body text-xs text-muted-foreground truncate",
              style: { paddingLeft: `${indent + (cat.depth > 0 ? 16 : 0)}px` },
              children: [
                cat.ancestorPath.map((a) => a.name).join(" › "),
                " ›",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: cat.name })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-muted-foreground line-clamp-1 max-w-xs", children: cat.description || "—" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm tabular-nums", children: cat.productCount.toString() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onAddChild(cat.id),
              "aria-label": "Add subcategory",
              title: "Add subcategory",
              className: "text-muted-foreground hover:text-accent transition-colors",
              "data-ocid": `admin.categories.add_child_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onEdit(cat),
              "aria-label": "Edit category",
              className: "text-muted-foreground hover:text-foreground transition-colors",
              "data-ocid": `admin.categories.edit_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onDelete(cat.id, cat.name),
              "aria-label": "Delete category",
              className: "text-muted-foreground hover:text-destructive transition-colors",
              "data-ocid": `admin.categories.delete_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  AdminCategoriesPage as default
};
