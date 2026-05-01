import { e as useQueryClient } from "./index-Bee7OgJo.js";
import { b as useActor, d as useQuery, e as useMutation, f as createActor } from "./use-auth-DmTNi5-A.js";
function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching
  });
}
function useProductsByCategory(categoryId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", "category", categoryId == null ? void 0 : categoryId.toString()],
    queryFn: async () => {
      if (!actor || categoryId === void 0) return [];
      return actor.getProductsByCategory(categoryId);
    },
    enabled: !!actor && !isFetching && categoryId !== void 0
  });
}
function useProduct(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== void 0
  });
}
function useCreateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createProduct(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProduct(id, input);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", variables.id.toString()]
      });
    }
  });
}
function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
export {
  useProductsByCategory as a,
  useProduct as b,
  useCreateProduct as c,
  useUpdateProduct as d,
  useDeleteProduct as e,
  useProducts as u
};
