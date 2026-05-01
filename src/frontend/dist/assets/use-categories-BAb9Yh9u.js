import { c as createLucideIcon, b as useActor, d as useQuery, e as useMutation, f as createActor } from "./use-auth-DmTNi5-A.js";
import { e as useQueryClient } from "./index-Bee7OgJo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateCategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createCategory(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });
}
function useUpdateCategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateCategory(id, input);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({
        queryKey: ["category", variables.id.toString()]
      });
    }
  });
}
function useDeleteCategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });
}
function buildCategoryTree(categories) {
  const byId = /* @__PURE__ */ new Map();
  for (const cat of categories) {
    byId.set(cat.id.toString(), {
      ...cat,
      children: [],
      depth: 0,
      fullPath: cat.name
    });
  }
  const roots = [];
  for (const node of byId.values()) {
    if (node.parentCategoryId !== void 0 && node.parentCategoryId !== null) {
      const parent = byId.get(node.parentCategoryId.toString());
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    } else {
      roots.push(node);
    }
  }
  function assignDepth(nodes, depth, prefix) {
    for (const node of nodes) {
      node.depth = depth;
      node.fullPath = prefix ? `${prefix} / ${node.name}` : node.name;
      if (node.children.length > 0) {
        assignDepth(node.children, depth + 1, node.fullPath);
      }
    }
  }
  assignDepth(roots, 0, "");
  return roots;
}
function flattenTree(nodes) {
  const result = [];
  function walk(list) {
    for (const node of list) {
      result.push(node);
      if (node.children.length > 0) walk(node.children);
    }
  }
  walk(nodes);
  return result;
}
function useCategoryTree() {
  const query = useCategories();
  const tree = query.data ? buildCategoryTree(query.data) : [];
  const flat = flattenTree(tree);
  return { ...query, tree, flat };
}
export {
  X,
  useCategories as a,
  useCreateCategory as b,
  useUpdateCategory as c,
  useDeleteCategory as d,
  buildCategoryTree as e,
  flattenTree as f,
  useCategoryTree as u
};
