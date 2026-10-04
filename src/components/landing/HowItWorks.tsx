import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    n: "01",
    cmd: "buat_akun",
    text: "Daftar atau masuk menggunakan email. Kode verifikasi dikirim langsung, prosesnya selesai dalam satu menit.",
  },
  {
    n: "02",
    cmd: "pilih_unit",
    text: "Telusuri katalog, gunakan pencarian, lalu buka halaman detail unit untuk melihat spesifikasi dan tarif.",
  },
  {
    n: "03",
    cmd: "tentukan_jadwal",
    text: "Pilih tanggal dan jam ambil serta kembali. Durasi dan total biaya dihitung otomatis, tanpa tebak-tebakan.",
  },
  {
    n: "04",
    cmd: "konfirmasi",
    text: "Booking tersimpan di dashboard Anda. Tim kami meninjau jadwal dan mengonfirmasi lewat WhatsApp.",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-sewa" className="border-y border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            title="Cara sewa, empat langkah"
            description="Seluruh proses dapat diselesaikan dari HP: buat akun, pilih unit, tentukan jadwal, lalu pantau statusnya dari dashboard."
            prompt="~/cara-sewa $ cat alur.txt"
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.07}>
              <div className="h-full rounded-lg border border-border bg-background p-4 transition-colors hover:border-foreground/40">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-ok">step_{step.n}</span>
                  <span className="text-muted-foreground">{"{ }"}</span>
                </div>
                <p className="mt-3 font-mono text-sm font-bold text-foreground">
                  {step.cmd}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {step.text}
                </p>
                {index < STEPS.length - 1 ? (
                  <p
                    className="mt-4 font-mono text-[11px] text-muted-foreground"
                    aria-hidden
                  >
                    ↓ lanjut
                  </p>
                ) : (
                  <p
                    className="mt-4 font-mono text-[11px] text-ok"
                    aria-hidden
                  >
                    ✓ selesai
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 font-mono text-[11px] leading-5 text-muted-foreground">
            {"// syarat pengambilan: SIM C aktif dan identitas asli — salinan tidak disimpan di sistem"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
