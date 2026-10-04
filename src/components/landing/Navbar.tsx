import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const NAV_LINKS = [
  { href: "#katalog", label: "katalog" },
  { href: "#cara-sewa", label: "cara-sewa" },
  { href: "#ulasan", label: "ulasan" },
  { href: "#faq", label: "faq" },
  { href: "#lokasi", label: "lokasi" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">          <Link
            to="/"
            onClick={() => setOpen(false)}
            aria-label="Ryokourent App — beranda"
            className="flex items-center gap-2 font-mono text-sm"
          >
          <span className="flex size-6 items-center justify-center rounded-[3px] border border-border bg-secondary text-xs font-bold text-ok">
            $
          </span>
          <span className="font-bold tracking-tight text-foreground">
            ryokourent
          </span>
          <span className="text-muted-foreground">app</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] text-muted-foreground lg:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-ok" />
            sistem online
          </span>
          <Button
            asChild
            size="sm"
            className="cursor-pointer font-mono text-xs"
          >
            <Link to={isAuthenticated ? "/dashboard" : "/auth"}>
              {isAuthenticated ? "dashboard" : "masuk"}
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="flex size-8 cursor-pointer items-center justify-center rounded-[3px] border border-border bg-background text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span className="text-ok">→</span> {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
