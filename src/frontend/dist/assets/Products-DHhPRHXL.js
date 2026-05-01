import { r as reactExports, j as jsxRuntimeExports, a as LoadingSpinner, c as ue } from "./index-Bee7OgJo.js";
import { c as createLucideIcon, B as Button, E as ExternalBlob } from "./use-auth-DmTNi5-A.js";
import { P as Pencil, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, L as Label, I as Input, T as Textarea } from "./textarea-CVtd7xMA.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DeW29qIO.js";
import { E as EmptyState } from "./EmptyState-BSXc1Moo.js";
import { u as useCategoryTree } from "./use-categories-BAb9Yh9u.js";
import { u as useProducts, c as useCreateProduct, d as useUpdateProduct, e as useDeleteProduct } from "./use-products-D6blg24E.js";
import { A as AdminShell } from "./AdminLayout-DzbV-5VT.js";
import { P as Plus, T as Trash2 } from "./trash-2-BykTTyl_.js";
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
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode);
const emptyForm = {
  name: "",
  description: "",
  priceInCents: "",
  inventory: "",
  categoryId: "",
  imageFile: null
};
function AdminProductsPage() {
  const { data: products, isLoading } = useProducts();
  const { flat: flatCategories } = useCategoryTree();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };
  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name,
      description: product.description,
      priceInCents: (Number(product.priceInCents) / 100).toString(),
      inventory: product.inventory.toString(),
      categoryId: product.categoryId.toString(),
      imageFile: null
    });
    setDialogOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageBlob;
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
          Math.round(Number.parseFloat(form.priceInCents) * 100)
        ),
        inventory: BigInt(Number.parseInt(form.inventory)),
        categoryId: BigInt(form.categoryId),
        image: imageBlob
      };
      if (editing) {
        await updateProduct.mutateAsync({ id: editing.id, input });
        ue.success("Product updated");
      } else {
        await createProduct.mutateAsync(input);
        ue.success("Product created");
      }
      setDialogOpen(false);
      setUploadProgress(0);
    } catch (err) {
      ue.error("Failed to save product", {
        description: err instanceof Error ? err.message : "Unknown error"
      });
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      ue.success("Product deleted");
    } catch {
      ue.error("Failed to delete product");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.products_page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl tracking-wide text-foreground", children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground", children: [
          (products == null ? void 0 : products.length) ?? 0,
          " pieces in your collection"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openCreate,
          className: "bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase",
          "data-ocid": "admin.products.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            "Add Product"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading products…", className: "py-20" }) : products && products.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border border-border overflow-hidden",
        "data-ocid": "admin.products.table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Product", "Category", "Price", "Inventory", "Actions"].map(
            (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-4 py-3 text-left font-display text-xs tracking-widest uppercase text-muted-foreground",
                children: h
              },
              h
            )
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: products.map((product, index) => {
            var _a;
            const imageUrl = (_a = product.image) == null ? void 0 : _a.getDirectURL();
            const category = flatCategories.find(
              (c) => c.id === product.categoryId
            );
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/20 transition-colors",
                "data-ocid": `admin.products.row.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-secondary flex-shrink-0 overflow-hidden", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: imageUrl,
                        alt: product.name,
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4 text-muted-foreground" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs tracking-widest uppercase truncate", children: product.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground truncate max-w-xs", children: product.description })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-muted-foreground", children: category ? category.fullPath : "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-sm", children: [
                    "$",
                    (Number(product.priceInCents) / 100).toFixed(0)
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-body text-sm ${product.inventory <= 0n ? "text-destructive" : "text-foreground"}`,
                      children: product.inventory.toString()
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => openEdit(product),
                        "aria-label": "Edit product",
                        className: "text-muted-foreground hover:text-foreground transition-colors",
                        "data-ocid": `admin.products.edit_button.${index + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleDelete(product.id),
                        "aria-label": "Delete product",
                        className: "text-muted-foreground hover:text-destructive transition-colors",
                        "data-ocid": `admin.products.delete_button.${index + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                      }
                    )
                  ] }) })
                ]
              },
              product.id.toString()
            );
          }) })
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-8 h-8" }),
        title: "No Products Yet",
        description: "Start building your collection by adding your first product.",
        action: { label: "Add First Product", onClick: openCreate }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "admin.product.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display tracking-wide", children: editing ? "Edit Product" : "Add New Product" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "name",
              className: "font-display text-xs tracking-widest uppercase",
              children: "Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              required: true,
              "data-ocid": "admin.product.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "description",
              className: "font-display text-xs tracking-widest uppercase",
              children: "Description"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              rows: 3,
              "data-ocid": "admin.product.description_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "price",
                className: "font-display text-xs tracking-widest uppercase",
                children: "Price (USD)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "price",
                type: "number",
                step: "0.01",
                min: "0",
                value: form.priceInCents,
                onChange: (e) => setForm((f) => ({ ...f, priceInCents: e.target.value })),
                required: true,
                "data-ocid": "admin.product.price_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "inventory",
                className: "font-display text-xs tracking-widest uppercase",
                children: "Inventory"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "inventory",
                type: "number",
                min: "0",
                value: form.inventory,
                onChange: (e) => setForm((f) => ({ ...f, inventory: e.target.value })),
                required: true,
                "data-ocid": "admin.product.inventory_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "category",
              className: "font-display text-xs tracking-widest uppercase",
              children: "Category"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.categoryId,
              onValueChange: (v) => setForm((f) => ({ ...f, categoryId: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.product.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: flatCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: cat.id.toString(),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "inline-flex items-center gap-1",
                        style: { paddingLeft: `${cat.depth * 14}px` },
                        children: [
                          cat.depth > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
                            "›".repeat(cat.depth),
                            " "
                          ] }),
                          cat.name
                        ]
                      }
                    )
                  },
                  cat.id.toString()
                )) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "image",
              className: "font-display text-xs tracking-widest uppercase",
              children: [
                "Product Image ",
                editing && "(leave empty to keep current)"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "image",
              type: "file",
              accept: "image/*",
              onChange: (e) => setForm((f) => {
                var _a;
                return {
                  ...f,
                  imageFile: ((_a = e.target.files) == null ? void 0 : _a[0]) ?? null
                };
              }),
              "data-ocid": "admin.product.image_input"
            }
          ),
          uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-accent transition-all duration-300",
              style: { width: `${uploadProgress}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: createProduct.isPending || updateProduct.isPending,
              className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase",
              "data-ocid": "admin.product.submit_button",
              children: createProduct.isPending || updateProduct.isPending ? "Saving…" : editing ? "Save Changes" : "Add Product"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              className: "text-xs tracking-widest uppercase",
              "data-ocid": "admin.product.cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  AdminProductsPage as default
};
