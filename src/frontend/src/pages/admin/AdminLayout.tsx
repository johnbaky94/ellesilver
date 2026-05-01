import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  LayoutDashboard,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  Tag,
} from "lucide-react";
import type { ReactNode } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAuth, useIsAdmin } from "../../hooks/use-auth";
import { useIsStripeConfigured } from "../../hooks/use-orders";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tag },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

interface AdminShellProps {
  children: ReactNode;
}

/** Shared sidebar + auth guard wrapper used by all admin pages. */
export function AdminShell({ children }: AdminShellProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: stripeConfigured } = useIsStripeConfigured();

  if (isInitializing || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" label="Loading…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Shield className="w-12 h-12 mx-auto text-muted-foreground" />
          <h2 className="font-display text-xl tracking-wide">
            Admin Access Required
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Please log in to access the admin panel.
          </p>
          <Button
            onClick={login}
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase"
            data-ocid="admin.login_button"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Shield className="w-12 h-12 mx-auto text-muted-foreground" />
          <h2 className="font-display text-xl tracking-wide">Access Denied</h2>
          <p className="font-body text-sm text-muted-foreground">
            You don't have permission to access the admin panel.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            className="text-xs tracking-widest uppercase"
          >
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background" data-ocid="admin.page">
      {/* Sidebar */}
      <aside className="w-56 bg-card border-r border-border flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-border">
          <span className="font-display text-xl tracking-[0.15em] uppercase">
            Aurélia
          </span>
          <p className="font-body text-xs text-muted-foreground mt-1">
            Admin Panel
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-1" data-ocid="admin.sidebar_nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-xs tracking-widest uppercase transition-smooth",
                "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
              data-ocid={`admin.nav.${label.toLowerCase()}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Shop
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Stripe warning banner */}
        {stripeConfigured === false && (
          <div
            className="bg-accent/10 border-b border-accent/20 px-6 py-3 flex items-center justify-between"
            data-ocid="admin.stripe_warning"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-accent" />
              <span className="font-body text-xs text-foreground">
                Stripe is not configured. Checkout will not work until you set
                up your Stripe secret key.
              </span>
            </div>
          </div>
        )}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

/** Dashboard page rendered at /admin */
export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <AdminShell>
      <div className="space-y-8" data-ocid="admin.dashboard">
        <div>
          <h1 className="font-display text-2xl tracking-wide text-foreground mb-2">
            Dashboard
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            Manage your jewelry store.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              label: "Manage Products",
              desc: "Add, edit, and remove jewelry pieces",
              to: "/admin/products",
              icon: Package,
            },
            {
              label: "Manage Categories",
              desc: "Organize your collections",
              to: "/admin/categories",
              icon: Tag,
            },
            {
              label: "View Orders",
              desc: "Track and manage customer orders",
              to: "/admin/orders",
              icon: ShoppingCart,
            },
          ].map(({ label, desc, to, icon: Icon }) => (
            <button
              key={to}
              type="button"
              onClick={() =>
                navigate({
                  to: to as
                    | "/admin/products"
                    | "/admin/categories"
                    | "/admin/orders",
                })
              }
              className="bg-card border border-border p-6 text-left hover:border-accent transition-smooth group"
              data-ocid={`admin.dashboard.${label.toLowerCase().replace(/\s+/g, "_")}`}
            >
              <Icon className="w-6 h-6 text-muted-foreground group-hover:text-accent mb-3 transition-colors" />
              <h3 className="font-display text-sm tracking-widest uppercase text-foreground mb-1">
                {label}
              </h3>
              <p className="font-body text-xs text-muted-foreground">{desc}</p>
            </button>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
