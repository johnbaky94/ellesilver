import Common "common";

module {
  public type OrderId = Common.OrderId;
  public type ProductId = Common.ProductId;

  public type OrderStatus = {
    #pending;
    #paid;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type OrderItem = {
    productId : ProductId;
    productName : Text;
    quantity : Nat;
    priceInCents : Nat;
  };

  public type Order = {
    id : OrderId;
    customer : Principal;
    items : [OrderItem];
    totalInCents : Nat;
    status : OrderStatus;
    stripeSessionId : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type OrderInput = {
    items : [OrderItem];
    totalInCents : Nat;
    stripeSessionId : Text;
  };
};
