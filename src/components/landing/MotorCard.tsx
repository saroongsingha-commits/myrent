import { STATUS_META, type Motor } from "@/data/motors";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ArrowRight, Bike } from "lucide-react";
import { Link } from "react-router";

/**
 * Satu record katalog yang mengarah ke halaman detail unit.
 * Sengaja tanpa angka stok (aturan proyek #16): yang tampil hanya status teks.
 */
export function MotorCard({ motor, index }: { motor: Motor; index: number }) {
  const status = STATUS_META[motor.status];

  return (
    <Link
      to={`/motor/${motor.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-foreground/40 focus-visible:border-ring"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border bg-muted px-3 py-2 font-mono text-[11px]">
        <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
          <Bike className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">
            {String(index).padStart(2, "0")} · {motor.slug}
          </span>
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1.5 font-medium",
            status.className,
          )}
        >
          <span className="size-1.5 rounded-full bg-current" aria-hidden />
          {status.label}
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-bold tracking-tight">{motor.name}</h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {motor.brand} · {motor.category} · {motor.year}
            {motor.engineCc ? ` · ${motor.engineCc}cc` : ""}
          </p>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          {motor.description}
        </p>

        <ul className="flex flex-wrap gap-1.5">
          {motor.features.map((feature) => (
            <li
              key={feature}
              className="rounded-[3px] border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-dashed border-border pt-3">
          <p className="text-lg font-bold tracking-tight">
            {formatRupiah(motor.priceDay)}
            <span className="ml-1 font-mono text-[11px] font-normal text-muted-foreground">
              /hari
            </span>
          </p>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            minggu {formatRupiah(motor.priceWeek)} · bulan{" "}
            {formatRupiah(motor.priceMonth)}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
            buka detail & jadwalkan sewa
            <ArrowRight className="size-3" aria-hidden />
          </p>
        </div>
      </div>
    </Link>
  );
}
