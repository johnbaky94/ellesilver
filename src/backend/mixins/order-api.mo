import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderLib "../lib/order";
import OrderTypes "../types/order";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<OrderTypes.OrderId, OrderTypes.Order>,
  orderNextId : { var value : Nat },
) {
  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    OrderLib.listByCustomer(orders, caller);
  };

  public query ({ caller }) func getAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrderLib.listAll(orders);
  };

  public query func getOrder(id : OrderTypes.OrderId) : async ?OrderTypes.Order {
    OrderLib.getById(orders, id);
  };

  public shared ({ caller }) func createOrderFromSession(sessionId : Text, input : OrderTypes.OrderInput) : async OrderTypes.Order {
    // Prevent duplicate orders for the same session
    switch (OrderLib.findByStripeSession(orders, sessionId)) {
      case (?existing) { existing };
      case (null) {
        let id = orderNextId.value;
        orderNextId.value += 1;
        OrderLib.create(orders, id, caller, input);
      };
    };
  };

  public shared ({ caller }) func updateOrderStatus(id : OrderTypes.OrderId, status : OrderTypes.OrderStatus) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateStatus(orders, id, status);
  };
};
