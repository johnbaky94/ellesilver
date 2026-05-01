import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Category, CategoryInput, CategoryWithCount } from "../backend";
import type { CategoryTreeNode } from "../types";

export function useCategories() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<CategoryWithCount[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCategory(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Category | null>({
    queryKey: ["category", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getCategory(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useCreateCategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CategoryInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createCategory(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: CategoryInput }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateCategory(id, input);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({
        queryKey: ["category", variables.id.toString()],
      });
    },
  });
}

export function useDeleteCategory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

/**
 * Converts a flat CategoryWithCount array into a nested tree.
 * Depth is unlimited — each node tracks its depth and full display path.
 */
export function buildCategoryTree(
  categories: CategoryWithCount[],
): CategoryTreeNode[] {
  const byId = new Map<string, CategoryTreeNode>();

  // First pass: wrap all nodes
  for (const cat of categories) {
    byId.set(cat.id.toString(), {
      ...cat,
      children: [],
      depth: 0,
      fullPath: cat.name,
    });
  }

  // Second pass: link children to parents
  const roots: CategoryTreeNode[] = [];
  for (const node of byId.values()) {
    if (node.parentCategoryId !== undefined && node.parentCategoryId !== null) {
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

  // Third pass: set depth and fullPath via DFS
  function assignDepth(
    nodes: CategoryTreeNode[],
    depth: number,
    prefix: string,
  ) {
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

/**
 * Returns a flat ordered list of CategoryTreeNode (depth-first) — useful
 * for rendering indented dropdowns and tree views.
 */
export function flattenTree(nodes: CategoryTreeNode[]): CategoryTreeNode[] {
  const result: CategoryTreeNode[] = [];
  function walk(list: CategoryTreeNode[]) {
    for (const node of list) {
      result.push(node);
      if (node.children.length > 0) walk(node.children);
    }
  }
  walk(nodes);
  return result;
}

/** Convenience hook that returns a ready-to-use category tree */
export function useCategoryTree() {
  const query = useCategories();
  const tree = query.data ? buildCategoryTree(query.data) : [];
  const flat = flattenTree(tree);
  return { ...query, tree, flat };
}
