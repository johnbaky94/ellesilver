import Map "mo:core/Map";
import CategoryTypes "types/category";

module {
  // ── Old type definitions (copied from .old/src/backend/types/category.mo) ──
  type OldCategoryId = Nat;
  type OldTimestamp = Int;

  type OldCategory = {
    id : OldCategoryId;
    name : Text;
    description : Text;
    createdAt : OldTimestamp;
  };

  // ── State shapes ────────────────────────────────────────────────────────────
  type OldActor = {
    categories : Map.Map<OldCategoryId, OldCategory>;
  };

  type NewActor = {
    categories : Map.Map<CategoryTypes.CategoryId, CategoryTypes.Category>;
  };

  // ── Migration function ───────────────────────────────────────────────────────
  public func run(old : OldActor) : NewActor {
    let categories = old.categories.map<OldCategoryId, OldCategory, CategoryTypes.Category>(
      func(_id, c) {
        {
          id = c.id;
          name = c.name;
          description = c.description;
          parentCategoryId = null; // existing categories become root categories
          createdAt = c.createdAt;
        };
      }
    );
    { categories };
  };
};
