import {
  MOTOR_CATEGORIES,
  MOTORS,
  type MotorCategory,
} from "@/data/motors";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { MotorCard } from "./MotorCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Filter = MotorCategory | "semua";

export function Catalog() {
  const [active, setActive] = useState<Filter>("semua");
  const [query, setQuery] = useState("");

  const motors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOTORS.filter((motor) => {
      const matchesCategory = active === "semua" || motor.category === active;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [
        motor.name,
        motor.brand,
        motor.category,
        motor.description,
        ...motor.features,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [active, query]);

  return (
    <section
      id="katalog"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <Reveal>
        <SectionHeading
          index="02"
          title="Katalog unit"
          description="Unit terawat dengan kondisi terjamin untuk kebutuhan harian. Pilih unit lalu buka halaman detailnya untuk melihat spesifikasi dan menjadwalkan sewa."
          prompt={`~/katalog $ ls -1 --kategori ${active}`}
        />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="cari: vario, trail, listrik…"
              aria-label="Cari motor di katalog"
              className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-8 font-mono text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/40"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Hapus pencarian"
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {MOTOR_CATEGORIES.map((category) => {
              const isActive = active === category.value;
              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setActive(category.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "cursor-pointer rounded-[3px] border px-3 py-1.5 font-mono text-xs transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {isActive ? "> " : "  "}
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {motors.map((motor, index) => (
          <MotorCard key={motor.id} motor={motor} index={index + 1} />
        ))}
      </motion.div>

      {motors.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center font-mono text-sm text-muted-foreground">
          {"// tidak ada unit yang cocok — coba kata kunci atau kategori lain"}
        </div>
      ) : null}

      <Reveal delay={0.1}>
        <p className="mt-6 font-mono text-[11px] leading-5 text-muted-foreground">
          {"// status ketersediaan diperbarui oleh tim kami — konfirmasi jadwal lewat booking sebelum berangkat"}
        </p>
      </Reveal>
    </section>
  );
}
