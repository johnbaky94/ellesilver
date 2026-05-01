import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CategoryTypes "../types/category";
import ProductTypes "../types/product";
import CategoryLib "../lib/category";

mixin (
  accessControlState : AccessControl.AccessControlState,
  categories : Map.Map<CategoryTypes.CategoryId, CategoryTypes.Category>,
  categoryNextId : { var value : Nat },
  products : Map.Map<ProductTypes.ProductId, ProductTypes.Product>,
) {
  // Returns all categories enriched with product count and ancestor path.
  // The frontend uses parentCategoryId to reconstruct the tree.
  public query func getCategories() : async [CategoryTypes.CategoryWithCount] {
    let allCats = CategoryLib.listAll(categories);
    let result = List.empty<CategoryTypes.CategoryWithCount>();
    for (cat in allCats.values()) {
      // count products whose categoryId matches this category
      var count = 0;
      for ((_, product) in products.entries()) {
        if (product.categoryId == cat.id) {
          count += 1;
        };
      };
      result.add(CategoryLib.withProductCount(categories, cat, count));
    };
    result.toArray();
  };

  public query func getCategory(id : CategoryTypes.CategoryId) : async ?CategoryTypes.Category {
    CategoryLib.getById(categories, id);
  };

  // Admin-only: create a category. Pass parentCategoryId = null for root categories.
  public shared ({ caller }) func createCategory(input : CategoryTypes.CategoryInput) : async CategoryTypes.Category {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create categories");
    };
    let id = categoryNextId.value;
    categoryNextId.value += 1;
    CategoryLib.create(categories, id, input);
  };

  // Admin-only: update name/description/parentCategoryId. Circular-reference check enforced.
  public shared ({ caller }) func updateCategory(id : CategoryTypes.CategoryId, input : CategoryTypes.CategoryInput) : async ?CategoryTypes.Category {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update categories");
    };
    CategoryLib.update(categories, id, input);
  };

  // Admin-only: delete category and all descendants (cascade). Returns true if found and deleted.
  public shared ({ caller }) func deleteCategory(id : CategoryTypes.CategoryId) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete categories");
    };
    CategoryLib.delete(categories, id);
  };
};
