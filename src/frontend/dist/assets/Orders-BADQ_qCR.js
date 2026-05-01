import { j as jsxRuntimeExports, a as LoadingSpinner, c as ue } from "./index-Bee7OgJo.js";
import { B as Badge } from "./badge-D3vo4aQt.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DeW29qIO.js";
import { O as OrderStatus } from "./use-auth-DmTNi5-A.js";
import { E as EmptyState } from "./EmptyState-BSXc1Moo.js";
import { b as useAllOrders, c as useUpdateOrderStatus } from "./use-orders-CgaYlHbs.js";
import { A as AdminShell, S as ShoppingCart } from "./AdminLayout-DzbV-5VT.js";
import "./chevron-down-UPGpPvw0.js";
import "./proxy-Du6mftWB.js";
import "./arrow-left-BRhxGNgy.js";
const statusVariantMap = {
  [OrderStatus.pending]: "outline",
  [OrderStatus.paid]: "default",
  [OrderStatus.shipped]: "secondary",
  [OrderStatus.delivered]: "default",
  [OrderStatus.cancelled]: "destructive"
};
function AdminOrdersPage() {
  const { data: orders, isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const handleStatusChange = async (orderId, status) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status });
      ue.success("Order status updated");
    } catch {
      ue.error("Failed to update order status");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.orders_page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl tracking-wide text-foreground", children: "Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground", children: [
        (orders == null ? void 0 : orders.length) ?? 0,
        " total orders"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Loading orders…", className: "py-20" }) : orders && orders.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border border-border overflow-hidden",
        "data-ocid": "admin.orders.table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
            "Order ID",
            "Customer",
            "Items",
            "Total",
            "Status",
            "Date"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-3 text-left font-display text-xs tracking-widest uppercase text-muted-foreground",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: orders.map((order, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/20 transition-colors",
              "data-ocid": `admin.orders.row.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                  "#",
                  order.id.toString()
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground truncate max-w-[120px] block", children: [
                  order.customer.toString().slice(0, 12),
                  "…"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-body text-xs text-muted-foreground",
                    children: [
                      item.productName,
                      " × ",
                      item.quantity.toString()
                    ]
                  },
                  item.productId.toString()
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-sm", children: [
                  "$",
                  (Number(order.totalInCents) / 100).toFixed(2)
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: order.status,
                    onValueChange: (v) => handleStatusChange(order.id, v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "w-32 h-7 text-xs",
                          "data-ocid": `admin.orders.status_select.${index + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              variant: statusVariantMap[order.status],
                              className: "text-[10px] tracking-widest uppercase",
                              children: order.status
                            }
                          ) })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(OrderStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectItem,
                        {
                          value: s,
                          className: "text-xs tracking-widest uppercase",
                          children: s
                        },
                        s
                      )) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground", children: new Date(
                  Number(order.createdAt) / 1e6
                ).toLocaleDateString() }) })
              ]
            },
            order.id.toString()
          )) })
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-8 h-8" }),
        title: "No Orders Yet",
        description: "Orders will appear here once customers make purchases."
      }
    )
  ] }) });
}
export {
  AdminOrdersPage as default
};
