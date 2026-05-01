import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductLib "../lib/product";
import ProductTypes "../types/product";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<ProductTypes.ProductId, ProductTypes.Product>,
  productNextId : { var value : Nat },
) {
  public query func getProducts() : async [ProductTypes.Product] {
    ProductLib.listAll(products);
  };

  public query func getProductsByCategory(categoryId : ProductTypes.CategoryId) : async [ProductTypes.Product] {
    ProductLib.listByCategory(products, categoryId);
  };

  public query func getProduct(id : ProductTypes.ProductId) : async ?ProductTypes.Product {
    ProductLib.getById(products, id);
  };

  public shared ({ caller }) func createProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let id = productNextId.value;
    productNextId.value += 1;
    ProductLib.create(products, id, input);
  };

  public shared ({ caller }) func updateProduct(id : ProductTypes.ProductId, input : ProductTypes.ProductInput) : async ?ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductLib.update(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : ProductTypes.ProductId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductLib.delete(products, id);
  };
};
