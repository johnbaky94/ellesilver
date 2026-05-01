import { j as jsxRuntimeExports } from "./index-Bee7OgJo.js";
import { B as Button } from "./use-auth-DmTNi5-A.js";
import { m as motion } from "./proxy-Du6mftWB.js";
function EmptyState({
  icon,
  title,
  description,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "flex flex-col items-center justify-center py-20 px-6 text-center",
      "data-ocid": "empty_state",
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl tracking-wide text-foreground mb-2", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-xs mb-6", children: description }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: action.onClick,
            className: "text-xs tracking-widest uppercase border-foreground/30 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-smooth",
            "data-ocid": "empty_state.primary_button",
            children: action.label
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
