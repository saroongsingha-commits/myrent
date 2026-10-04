import { BookingForm } from "@/components/booking/BookingForm";
import { Navbar } from "@/components/landing/Navbar";
import { FooterCta } from "@/components/landing/FooterCta";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewList } from "@/components/reviews/ReviewList";
import { STATUS_META, MOTORS } from "@/data/motors";
import { formatRupiah } from "@/lib/format";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router";

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-border px-4 py-2.5 last:border-b-0">
      <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="text-right text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export default function MotorDetail() {
  const { slug } = useParams();
  const motor = slug ? MOTORS.find((item) => item.slug === slug) : undefined;

  if (!motor) {
    return <NotFound />;
  }

  const status = STATUS_META[motor.status];
  const transmission =
    motor.category === "manual" ? "manual" : "otomatis";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-background text-foreground"
    >
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          to="/#katalog"
          className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-3.5" aria-hidden />
          kembali ke katalog
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* --- Left: identity, specs, price, reviews --- */}
          <div>
            <header>
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
                <span className="truncate">~/katalog/{motor.slug}</span>
                <span className={cn("flex items-center gap-1.5", status.className)}>
                  <span className="size-1.5 rounded-full bg-current" aria-hidden />
                  {status.label}
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {motor.name}
              </h1>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {motor.brand} · {motor.category} · {motor.year}
                {motor.engineCc ? ` · ${motor.engineCc}cc` : ""}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                {motor.description}
              </p>
            </header>

            <dl className="mt-6 grid grid-cols-1 gap-0 overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-2">
              <SpecRow label="kategori" value={motor.category} />
              <SpecRow label="transmisi" value={transmission} />
              <SpecRow
                label="mesin"
                value={motor.engineCc ? `${motor.engineCc} cc` : "listrik"}
              />
              <SpecRow label="tahun" value={String(motor.year)} />
              <SpecRow label="area_layanan" value={SITE.serviceArea} />
              <SpecRow label="jam_operasional" value={SITE.hours} />
            </dl>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {motor.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-[3px] border border-border bg-card px-2 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <section
              id="harga"
              className="mt-6 rounded-lg border border-border bg-card p-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                tarif sewa
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight">
                {formatRupiah(motor.priceDay)}
                <span className="ml-1 font-mono text-xs font-normal text-muted-foreground">
                  /hari
                </span>
              </p>
              <div className="mt-3 grid gap-2 border-t border-dashed border-border pt-3 font-mono text-xs sm:grid-cols-2">
                <p className="text-muted-foreground">
                  mingguan{" "}
                  <span className="text-foreground">
                    {formatRupiah(motor.priceWeek)}
                  </span>
                </p>
                <p className="text-muted-foreground">
                  bulanan{" "}
                  <span className="text-foreground">
                    {formatRupiah(motor.priceMonth)}
                  </span>
                </p>
              </div>
              <p className="mt-3 font-mono text-[11px] leading-5 text-muted-foreground">
                {"// tarif dihitung otomatis: bulan penuh → minggu penuh → sisa hari"}
              </p>
            </section>

            <section id="ulasan-unit" className="mt-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[11px] text-ok">[ulasan]</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                Ulasan pelanggan
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Hanya ulasan dari akun terdaftar yang ditampilkan, dan setiap
                ulasan ditinjau tim kami sebelum dipublikasikan.
              </p>
              <div className="mt-4">
                <ReviewForm
                  motorId={motor.id}
                  returnTo={`/motor/${motor.slug}`}
                />
              </div>
              <div className="mt-4">
                <ReviewList motorId={motor.id} />
              </div>
            </section>
          </div>

          {/* --- Right: booking/schedule --- */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <BookingForm motor={motor} />
            <p className="mt-3 font-mono text-[11px] leading-5 text-muted-foreground">
              {"// jadwal langsung diperiksa saat pengiriman — rentang yang sudah dipesan akan ditolak"}
            </p>
          </div>
        </div>
      </main>

      <FooterCta />
    </motion.div>
  );
}
