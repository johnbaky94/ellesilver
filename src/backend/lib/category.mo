import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/category";

module {
  // Create a new category (root or child). Validates parent exists when parentCategoryId is set.
  public func create(
    categories : Map.Map<Types.CategoryId, Types.Category>,
    nextId : Nat,
    input : Types.CategoryInput,
  ) : Types.Category {
    let category : Types.Category = {
      id = nextId;
      name = input.name;
      description = input.description;
      parentCategoryId = input.parentCategoryId;
      createdAt = Time.now();
    };
    categories.add(nextId, category);
    category;
  };

  // Update name/description/parentCategoryId of an existing category.
  // Validates no circular references are introduced.
  public func update(
    categories : Map.Map<Types.CategoryId, Types.Category>,
    id : Types.CategoryId,
    input : Types.CategoryInput,
  ) : ?Types.Category {
    switch (categories.get(id)) {
      case null null;
      case (?existing) {
        // Guard against circular references: new parent must not be a descendant of this category
        switch (input.parentCategoryId) {
          case (?newParentId) {
            if (newParentId == id) {
              return null; // cannot be own parent
            };
            let desc = descendantIds(categories, id);
            let wouldCycle = switch (desc.find(func(d : Types.CategoryId) : Bool { d == newParentId })) {
              case null false;
              case _ true;
            };
            if (wouldCycle) {
              return null;
            };
          };
          case null {};
        };
        let updated : Types.Category = {
          existing with
          name = input.name;
          description = input.description;
          parentCategoryId = input.parentCategoryId;
        };
        categories.add(id, updated);
        ?updated;
      };
    };
  };

  // Delete a category and all its descendants recursively (cascade).
  // Returns true if found and deleted.
  public func delete(
    categories : Map.Map<Types.CategoryId, Types.Category>,
    id : Types.CategoryId,
  ) : Bool {
    switch (categories.get(id)) {
      case null false;
      case _ {
        let toDelete = descendantIds(categories, id);
        toDelete.values().forEach(func(descId : Types.CategoryId) {
          categories.remove(descId);
        });
        categories.remove(id);
        true;
      };
    };
  };

  public func getById(
    categories : Map.Map<Types.CategoryId, Types.Category>,
    id : Types.CategoryId,
  ) : ?Types.Category {
    categories.get(id);
  };

  // Return all categories as a flat list (preserving parentCategoryId for frontend tree building).
  public func listAll(
    categories : Map.Map<Types.CategoryId, Types.Category>,
  ) : [Types.Category] {
    let result = List.empty<Types.Category>();
    for ((_, cat) in categories.entries()) {
      result.add(cat);
    };
    result.toArray();
  };

  // Build the ancestor path (root → immediate parent) for a given category id.
  public func ancestorPath(
    categories : Map.Map<Types.CategoryId, Types.Category>,
    id : Types.CategoryId,
  ) : [Types.CategoryAncestor] {
    let path = List.empty<Types.CategoryAncestor>();
    var currentId : ?Types.CategoryId = switch (categories.get(id)) {
      case null { return [] };
      case (?cat) cat.parentCategoryId;
    };
    var guard = 0;
    while (guard < 1000) {
      guard += 1;
      switch (currentId) {
        case null { guard := 1000 }; // break
        case (?cid) {
          switch (categories.get(cid)) {
            case null { guard := 1000 }; // break
            case (?ancestor) {
              path.add({ id = ancestor.id; name = ancestor.name });
              currentId := ancestor.parentCategoryId;
            };
          };
        };
      };
    };
    // Reverse so it goes root → immediate parent
    path.reverse().toArray();
  };

  // Collect all descendant category ids (children, grandchildren, …) for a given category.
  public func descendantIds(
    categories : Map.Map<Types.CategoryId, Types.Category>,
    id : Types.CategoryId,
  ) : List.List<Types.CategoryId> {
    let result = List.empty<Types.CategoryId>();
    let queue = List.empty<Types.CategoryId>();
    // seed with direct children
    for ((_, cat) in categories.entries()) {
      switch (cat.parentCategoryId) {
        case (?parentId) {
          if (parentId == id) {
            queue.add(cat.id);
          };
        };
        case null {};
      };
    };
    var i = 0;
    while (i < queue.size()) {
      let childId = queue.at(i);
      result.add(childId);
      // find children of this child
      for ((_, cat) in categories.entries()) {
        switch (cat.parentCategoryId) {
          case (?parentId) {
            if (parentId == childId) {
              queue.add(cat.id);
            };
          };
          case null {};
        };
      };
      i += 1;
    };
    result;
  };

  // Enrich a category with product count and ancestor path for the API layer.
  public func withProductCount(
    categories : Map.Map<Types.CategoryId, Types.Category>,
    category : Types.Category,
    count : Nat,
  ) : Types.CategoryWithCount {
    {
      category with
      ancestorPath = ancestorPath(categories, category.id);
      productCount = count;
    };
  };
};
