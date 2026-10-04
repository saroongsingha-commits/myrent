import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid-paper flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted px-3 py-2 font-mono text-[11px] text-muted-foreground">
          <span>~ ryokourent app — terminal</span>
          <span>exit 127</span>
        </div>
        <div className="p-6 font-mono text-sm sm:p-7">
          <p className="break-all">
            <span className="text-ok">$</span> ryokourent open{" "}
            <span className="text-warn">{window.location.pathname}</span>
          </p>
          <p className="mt-3 text-muted-foreground">
            bash: command not found — halaman tidak ditemukan
          </p>
          <p className="mt-5 text-2xl font-bold tracking-tight text-foreground">
            404 — halaman tidak ditemukan
          </p>
          <p className="mt-2 font-sans text-xs leading-5 text-muted-foreground">
            Alamat yang kamu tuju tidak ada. Mulai lagi dari beranda atau
            langsung ke katalog motor.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              size="sm"
              className="cursor-pointer font-mono text-xs"
            >
              <Link to="/">← beranda</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="cursor-pointer font-mono text-xs"
            >
              <Link to="/#katalog">lihat katalog</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
