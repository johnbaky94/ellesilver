import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Shield, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAuth, useIsAdmin } from "../hooks/use-auth";
import { useCategories } from "../hooks/use-categories";
import { useCartStore } from "../store/cart";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.totalItems());
  const { data: categories } = useCategories();
  const rootCategories = categories?.filter(
    (cat) =>
      cat.parentCategoryId === undefined || cat.parentCategoryId === null,
  );
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } =
    useAuth();
  const { data: isAdmin } = useIsAdmin();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="bg-card border-b border-border sticky top-0 z-40"
        data-ocid="header"
      >
        {/* Top bar */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0" data-ocid="header.logo_link">
              <span className="font-display text-2xl tracking-[0.15em] uppercase text-foreground">
                Aurélia
              </span>
            </Link>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-5">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors"
                  data-ocid="header.admin_link"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={isAuthenticated ? logout : login}
                disabled={isInitializing || isLoggingIn}
                className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
                data-ocid="header.auth_button"
              >
                <User className="w-4 h-4" />
                {isInitializing
                  ? "Loading"
                  : isAuthenticated
                    ? "Logout"
                    : "Login"}
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: "/cart" })}
                className="relative flex items-center gap-1.5 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="header.cart_button"
              >
                <ShoppingBag className="w-4 h-4" />
                Bag
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-display">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile actions */}
            <div className="flex md:hidden items-center gap-4">
              <button
                type="button"
                onClick={() => navigate({ to: "/cart" })}
                className="relative text-foreground"
                data-ocid="header.mobile_cart_button"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-foreground"
                data-ocid="header.mobile_menu_toggle"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Category Nav */}
        <nav
          className="hidden md:block border-t border-border"
          data-ocid="header.category_nav"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-8 h-10 overflow-x-auto">
              <Link
                to="/"
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap flex-shrink-0"
                data-ocid="header.all_link"
              >
                All Collections
              </Link>
              {rootCategories?.map((cat) => (
                <Link
                  key={cat.id.toString()}
                  to="/category/$id"
                  params={{ id: cat.id.toString() }}
                  className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap flex-shrink-0"
                  data-ocid="header.category_link"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-card overflow-hidden"
              data-ocid="header.mobile_menu"
            >
              <div className="container mx-auto px-4 py-4 space-y-3">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs tracking-widest uppercase text-foreground py-2"
                >
                  All Collections
                </Link>
                {rootCategories?.map((cat) => (
                  <Link
                    key={cat.id.toString()}
                    to="/category/$id"
                    params={{ id: cat.id.toString() }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs tracking-widest uppercase text-muted-foreground py-2"
                  >
                    {cat.name}
                  </Link>
                ))}
                <div className="pt-3 border-t border-border flex flex-col gap-3">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground"
                    >
                      <Shield className="w-4 h-4" /> Admin Panel
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      isAuthenticated ? logout() : login();
                      setMobileMenuOpen(false);
                    }}
                    disabled={isInitializing || isLoggingIn}
                    className="w-full text-xs tracking-widest uppercase"
                    data-ocid="header.mobile_auth_button"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {isInitializing
                      ? "Loading…"
                      : isAuthenticated
                        ? "Logout"
                        : "Login"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border mt-16"
        data-ocid="footer"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="font-display text-lg tracking-[0.15em] uppercase mb-4">
                Aurélia
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
                Timeless sterling silver craftsmanship for the modern woman.
              </p>
            </div>
            <div>
              <h4 className="font-display text-xs tracking-widest uppercase mb-4 text-foreground">
                Shop
              </h4>
              <ul className="space-y-2">
                {[
                  "All Collections",
                  "New Arrivals",
                  "Rings",
                  "Earrings",
                  "Necklaces",
                  "Bracelets",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="font-body text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-xs tracking-widest uppercase mb-4 text-foreground">
                Company
              </h4>
              <ul className="space-y-2">
                {["About Us", "Sustainability", "Craftsmanship", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <span className="font-body text-sm text-muted-foreground cursor-default">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-xs tracking-widest uppercase mb-4 text-foreground">
                Help
              </h4>
              <ul className="space-y-2">
                {["Shipping & Returns", "Size Guide", "Care Guide", "FAQ"].map(
                  (item) => (
                    <li key={item}>
                      <span className="font-body text-sm text-muted-foreground cursor-default">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-muted-foreground">
              © {new Date().getFullYear()} Aurélia. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                caffeine.ai
              </a>
            </p>
            <p className="font-display text-xs tracking-widest uppercase text-muted-foreground">
              Sterling Silver · Handcrafted
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
