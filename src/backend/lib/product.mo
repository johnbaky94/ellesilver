import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/product";

module {
  public func create(
    products : Map.Map<Types.ProductId, Types.Product>,
    nextId : Nat,
    input : Types.ProductInput,
  ) : Types.Product {
    let now = Time.now();
    let product : Types.Product = {
      id = nextId;
      name = input.name;
      description = input.description;
      priceInCents = input.priceInCents;
      inventory = input.inventory;
      categoryId = input.categoryId;
      image = input.image;
      createdAt = now;
      updatedAt = now;
    };
    products.add(nextId, product);
    product;
  };

  public func update(
    products : Map.Map<Types.ProductId, Types.Product>,
    id : Types.ProductId,
    input : Types.ProductInput,
  ) : ?Types.Product {
    switch (products.get(id)) {
      case (null) { null };
      case (?existing) {
        let updated : Types.Product = {
          existing with
          name = input.name;
          description = input.description;
          priceInCents = input.priceInCents;
          inventory = input.inventory;
          categoryId = input.categoryId;
          image = input.image;
          updatedAt = Time.now();
        };
        products.add(id, updated);
        ?updated;
      };
    };
  };

  public func delete(
    products : Map.Map<Types.ProductId, Types.Product>,
    id : Types.ProductId,
  ) : Bool {
    switch (products.get(id)) {
      case (null) { false };
      case (?_) {
        products.remove(id);
        true;
      };
    };
  };

  public func getById(
    products : Map.Map<Types.ProductId, Types.Product>,
    id : Types.ProductId,
  ) : ?Types.Product {
    products.get(id);
  };

  public func listAll(
    products : Map.Map<Types.ProductId, Types.Product>,
  ) : [Types.Product] {
    products.values().toArray();
  };

  // Returns products directly assigned to this single categoryId (no recursion).
  public func listByCategory(
    products : Map.Map<Types.ProductId, Types.Product>,
    categoryId : Types.CategoryId,
  ) : [Types.Product] {
    products.values().filter(func(p : Types.Product) : Bool {
      p.categoryId == categoryId
    }).toArray();
  };

  // Returns products from categoryId AND all provided descendant ids (recursive subtree).
  public func listByCategoryRecursive(
    products : Map.Map<Types.ProductId, Types.Product>,
    categoryId : Types.CategoryId,
    descendantIds : [Types.CategoryId],
  ) : [Types.Product] {
    products.values().filter(func(p : Types.Product) : Bool {
      if (p.categoryId == categoryId) return true;
      for (did in descendantIds.vals()) {
        if (p.categoryId == did) return true;
      };
      false;
    }).toArray();
  };

  public func countByCategory(
    products : Map.Map<Types.ProductId, Types.Product>,
    categoryId : Types.CategoryId,
  ) : Nat {
    products.values().foldLeft(
      0,
      func(acc : Nat, p : Types.Product) : Nat {
        if (p.categoryId == categoryId) acc + 1 else acc
      },
    );
  };

  // Counts products across categoryId AND all provided descendant ids.
  public func countByCategoryRecursive(
    products : Map.Map<Types.ProductId, Types.Product>,
    categoryId : Types.CategoryId,
    descendantIds : [Types.CategoryId],
  ) : Nat {
    products.values().foldLeft(
      0,
      func(acc : Nat, p : Types.Product) : Nat {
        if (p.categoryId == categoryId) return acc + 1;
        for (did in descendantIds.vals()) {
          if (p.categoryId == did) return acc + 1;
        };
        acc;
      },
    );
  };
};
