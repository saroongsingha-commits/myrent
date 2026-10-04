import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { SITE } from "@/lib/site";
import { Link } from "react-router";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FOOTER_LINKS = [
  { href: "#katalog", label: "katalog" },
  { href: "#cara-sewa", label: "cara-sewa" },
  { href: "#ulasan", label: "ulasan" },
  { href: "#faq", label: "faq" },
  { href: "#lokasi", label: "lokasi" },
];

export function FooterCta() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <section className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-10">
              <SectionHeading
                index="07"
                title="Jadwalkan sewa Anda hari ini"
                description="Pilih unit di katalog, tentukan jadwal, dan pantau status booking dari dashboard. Tim Ryokourent App siap membantu setiap hari pukul 08.00–20.00 WIB."
                prompt="$ ryokourent --jadwalkan"
                className="mb-6 sm:mb-8"
              />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer font-mono text-sm"
                >
                  <a href="#katalog">
                    pilih motor <span aria-hidden>↑</span>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="cursor-pointer font-mono text-sm"
                >
                  <Link to={isAuthenticated ? "/dashboard" : "/auth"}>
                    {isAuthenticated ? "buka dashboard" : "masuk / daftar"}
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-md">
              <p className="font-mono text-sm">
                <span className="font-bold text-foreground">ryokourent</span>{" "}
                <span className="text-muted-foreground">app</span>
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {SITE.tagline}
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to={isAuthenticated ? "/dashboard" : "/auth"}
                className="font-mono text-xs text-ok transition-colors hover:text-foreground"
              >
                {isAuthenticated ? "dashboard →" : "masuk →"}
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 border-t border-dashed border-border pt-4 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 {SITE.name} · {SITE.serviceArea}</span>
            <span>operasional {SITE.hours}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
