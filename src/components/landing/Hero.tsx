import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { formatRupiah } from "@/lib/format";
import { SITE } from "@/lib/site";
import { Link } from "react-router";
import { Reveal } from "./Reveal";

type QuoteRow = { k: string; v: string; tone?: "strong" | "ok" };

const QUOTE: QuoteRow[] = [
  { k: "unit", v: "honda-vario-160" },
  { k: "durasi", v: "3 hari" },
  { k: "tarif", v: `${formatRupiah(90000)} x 3` },
  { k: "total", v: formatRupiah(270000), tone: "strong" },
  { k: "status", v: "siap_dijadwalkan", tone: "ok" },
];

function QuoteLine({ row }: { row: QuoteRow }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-border/80 py-1">
      <span className="text-muted-foreground">{row.k}</span>
      <span
        className={
          row.tone === "strong"
            ? "font-semibold text-foreground"
            : row.tone === "ok"
              ? "text-ok"
              : "text-foreground"
        }
      >
        {row.v}
      </span>
    </div>
  );
}

export function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="grid-paper border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: prompt + headline */}
          <div>
            <Reveal>
              <p className="font-mono text-xs text-muted-foreground">
                <span className="text-ok">ryokourent@app</span>:
                <span className="text-warn">~</span>$ ./start
                --malang-raya
                <span className="animate-blink ml-1 inline-block text-ok">
                  ▍
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
                Sewa motor mudah dan cepat untuk{" "}
                <span className="text-ok">Malang Raya &amp; Batu</span>.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                Melayani perjalanan wisata, kuliah, dinas, hingga acara
                keluarga. Pilih unitnya, tentukan jadwalnya, dan kami
                siapkan — transparan sejak awal, tanpa biaya tersembunyi.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer font-mono text-sm"
                >
                  <a href="#katalog">
                    lihat katalog <span aria-hidden>↓</span>
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
                <a
                  href="#cara-sewa"
                  className="font-mono text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  cara sewa →
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-dashed border-border pt-5 font-mono text-xs sm:grid-cols-3">
                <div>
                  <dt className="text-muted-foreground">harga_mulai</dt>
                  <dd className="mt-1 text-foreground">
                    {formatRupiah(75000)}/hari
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">area_layanan</dt>
                  <dd className="mt-1 text-foreground">{SITE.serviceArea}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">jam_operasional</dt>
                  <dd className="mt-1 text-foreground">{SITE.hours}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Right: sample terminal quote */}
          <Reveal delay={0.2}>
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border bg-muted px-3 py-2 font-mono text-[11px] text-muted-foreground">
                <span>~ ryokourent app — quote</span>
                <span className="flex items-center gap-1.5" aria-hidden>
                  <span className="size-2 rounded-[2px] border border-border bg-background" />
                  <span className="size-2 rounded-[2px] border border-border bg-background" />
                  <span className="size-2 rounded-[2px] border border-border bg-background" />
                </span>
              </div>
              <div className="space-y-3 p-4 font-mono text-[13px] sm:p-5">
                <p className="break-all">
                  <span className="text-ok">$</span> ryokourent quote --unit
                  honda-vario-160 --hari 3
                </p>
                <div className="border-l-2 border-border pl-3">
                  {QUOTE.map((row) => (
                    <QuoteLine key={row.k} row={row} />
                  ))}
                </div>
                <p className="font-mono text-[11px] leading-5 text-muted-foreground">
                  {"// contoh perhitungan — daftar harga resmi menyusul"}
                </p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  <span className="text-ok">$</span>
                  <span className="animate-blink ml-1 inline-block">▍</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
