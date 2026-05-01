import { e as useQueryClient, k as useInternetIdentity } from "./index-Bee7OgJo.js";
import { b as useActor, e as useMutation, d as useQuery, f as createActor } from "./use-auth-DmTNi5-A.js";
function useAllOrders() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  return useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
}
function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    }
  });
}
function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (items) => {
      if (!actor) throw new Error("Actor not available");
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/checkout/success`;
      const cancelUrl = `${baseUrl}/cart`;
      const result = await actor.createCheckoutSession(
        items,
        successUrl,
        cancelUrl
      );
      const session = JSON.parse(result);
      if (!(session == null ? void 0 : session.url)) {
        throw new Error("Stripe session missing url");
      }
      return session;
    }
  });
}
function useCreateOrderFromSession() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sessionId,
      input
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createOrderFromSession(sessionId, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    }
  });
}
function useIsStripeConfigured() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useCreateOrderFromSession as a,
  useAllOrders as b,
  useUpdateOrderStatus as c,
  useIsStripeConfigured as d,
  useCreateCheckoutSession as u
};
