import Common "common";

module {
  public type CategoryId = Common.CategoryId;

  // An ancestor entry used to build breadcrumb paths
  public type CategoryAncestor = {
    id : CategoryId;
    name : Text;
  };

  public type Category = {
    id : CategoryId;
    name : Text;
    description : Text;
    parentCategoryId : ?CategoryId; // null = root category
    createdAt : Common.Timestamp;
  };

  // Flat list representation enriched with hierarchy metadata — used in API responses
  public type CategoryWithCount = {
    id : CategoryId;
    name : Text;
    description : Text;
    parentCategoryId : ?CategoryId;
    // Full ancestor path from root to this category (excluding self)
    ancestorPath : [CategoryAncestor];
    productCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type CategoryInput = {
    name : Text;
    description : Text;
    parentCategoryId : ?CategoryId; // null = create as root category
  };
};
