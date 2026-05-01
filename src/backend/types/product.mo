import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type ProductId = Common.ProductId;
  public type CategoryId = Common.CategoryId;

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    priceInCents : Nat;
    inventory : Nat;
    categoryId : CategoryId;
    image : ?Storage.ExternalBlob;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    priceInCents : Nat;
    inventory : Nat;
    categoryId : CategoryId;
    image : ?Storage.ExternalBlob;
  };
};
