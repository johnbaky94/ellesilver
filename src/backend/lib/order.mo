import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/order";

module {
  public func create(
    orders : Map.Map<Types.OrderId, Types.Order>,
    nextId : Nat,
    customer : Principal,
    input : Types.OrderInput,
  ) : Types.Order {
    let now = Time.now();
    let order : Types.Order = {
      id = nextId;
      customer = customer;
      items = input.items;
      totalInCents = input.totalInCents;
      status = #paid;
      stripeSessionId = input.stripeSessionId;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(nextId, order);
    order;
  };

  public func updateStatus(
    orders : Map.Map<Types.OrderId, Types.Order>,
    id : Types.OrderId,
    status : Types.OrderStatus,
  ) : ?Types.Order {
    switch (orders.get(id)) {
      case (null) { null };
      case (?existing) {
        let updated : Types.Order = {
          existing with
          status = status;
          updatedAt = Time.now();
        };
        orders.add(id, updated);
        ?updated;
      };
    };
  };

  public func getById(
    orders : Map.Map<Types.OrderId, Types.Order>,
    id : Types.OrderId,
  ) : ?Types.Order {
    orders.get(id);
  };

  public func listAll(
    orders : Map.Map<Types.OrderId, Types.Order>,
  ) : [Types.Order] {
    orders.values().toArray();
  };

  public func listByCustomer(
    orders : Map.Map<Types.OrderId, Types.Order>,
    customer : Principal,
  ) : [Types.Order] {
    orders.values().filter(func(o : Types.Order) : Bool {
      Principal.equal(o.customer, customer)
    }).toArray();
  };

  public func findByStripeSession(
    orders : Map.Map<Types.OrderId, Types.Order>,
    sessionId : Text,
  ) : ?Types.Order {
    orders.values().find(func(o : Types.Order) : Bool {
      o.stripeSessionId == sessionId
    });
  };
};
