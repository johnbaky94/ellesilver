import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { OrderStatus } from "../../backend";
import { EmptyState } from "../../components/EmptyState";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAllOrders, useUpdateOrderStatus } from "../../hooks/use-orders";
import { AdminShell } from "./AdminLayout";

const statusVariantMap: Record<
  OrderStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [OrderStatus.pending]: "outline",
  [OrderStatus.paid]: "default",
  [OrderStatus.shipped]: "secondary",
  [OrderStatus.delivered]: "default",
  [OrderStatus.cancelled]: "destructive",
};

export default function AdminOrdersPage() {
  const { data: orders, isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status });
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update order status");
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6" data-ocid="admin.orders_page">
        <div>
          <h1 className="font-display text-2xl tracking-wide text-foreground">
            Orders
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            {orders?.length ?? 0} total orders
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner label="Loading orders…" className="py-20" />
        ) : orders && orders.length > 0 ? (
          <div
            className="border border-border overflow-hidden"
            data-ocid="admin.orders.table"
          >
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  {[
                    "Order ID",
                    "Customer",
                    "Items",
                    "Total",
                    "Status",
                    "Date",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-display text-xs tracking-widest uppercase text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order, index) => (
                  <tr
                    key={order.id.toString()}
                    className="hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.orders.row.${index + 1}`}
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        #{order.id.toString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-muted-foreground truncate max-w-[120px] block">
                        {order.customer.toString().slice(0, 12)}…
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        {order.items.map((item) => (
                          <p
                            key={item.productId.toString()}
                            className="font-body text-xs text-muted-foreground"
                          >
                            {item.productName} × {item.quantity.toString()}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-display text-sm">
                        ${(Number(order.totalInCents) / 100).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={order.status}
                        onValueChange={(v) =>
                          handleStatusChange(order.id, v as OrderStatus)
                        }
                      >
                        <SelectTrigger
                          className="w-32 h-7 text-xs"
                          data-ocid={`admin.orders.status_select.${index + 1}`}
                        >
                          <SelectValue>
                            <Badge
                              variant={statusVariantMap[order.status]}
                              className="text-[10px] tracking-widest uppercase"
                            >
                              {order.status}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(OrderStatus).map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="text-xs tracking-widest uppercase"
                            >
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-body text-xs text-muted-foreground">
                        {new Date(
                          Number(order.createdAt) / 1_000_000,
                        ).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={<ShoppingCart className="w-8 h-8" />}
            title="No Orders Yet"
            description="Orders will appear here once customers make purchases."
          />
        )}
      </div>
    </AdminShell>
  );
}
