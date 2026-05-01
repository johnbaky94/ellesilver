import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Migration "migration";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import ProductTypes "types/product";
import CategoryTypes "types/category";
import OrderTypes "types/order";
import ProductApiMixin "mixins/product-api";
import CategoryApiMixin "mixins/category-api";
import OrderApiMixin "mixins/order-api";

(with migration = Migration.run)
actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage (handles file upload/download infrastructure)
  include MixinObjectStorage();

  // Products state
  let products = Map.empty<ProductTypes.ProductId, ProductTypes.Product>();
  let productNextId = { var value : Nat = 0 };

  // Categories state
  let categories = Map.empty<CategoryTypes.CategoryId, CategoryTypes.Category>();
  let categoryNextId = { var value : Nat = 0 };

  // Orders state
  let orders = Map.empty<OrderTypes.OrderId, OrderTypes.Order>();
  let orderNextId = { var value : Nat = 0 };

  // Stripe configuration state
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  // Domain mixins
  include ProductApiMixin(accessControlState, products, productNextId);
  include CategoryApiMixin(accessControlState, categories, categoryNextId, products);
  include OrderApiMixin(accessControlState, orders, orderNextId);

  // Stripe functions must be declared directly in the actor
  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?config) { config };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
