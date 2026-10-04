import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FAQS = [
  {
    q: "Bagaimana cara menyewa motor?",
    a: "Buat akun, pilih unit di katalog, buka halaman detailnya, lalu tentukan jadwal sewa Anda. Booking langsung tersimpan dan statusnya dapat dipantau dari dashboard sampai dikonfirmasi tim kami.",
  },
  {
    q: "Apakah saya perlu membuat akun?",
    a: "Ya. Dengan akun, jadwal, riwayat booking, dan ulasan Anda tercatat rapi dan bisa dipantau kapan saja. Pendaftaran cukup menggunakan email — kode verifikasi dikirim langsung.",
  },
  {
    q: "Berapa lama durasi sewa yang tersedia?",
    a: "Minimal satu hari dan maksimal tiga puluh hari. Untuk kebutuhan lebih panjang, hubungi admin agar disusun penawaran khusus.",
  },
  {
    q: "Kapan pembayarannya dilakukan?",
    a: "Pembayaran dilakukan saat pengambilan unit, dengan tunai atau transfer — detailnya menyusul. Sistem pembayaran daring belum aktif, dan total Anda selalu tertera jelas di ringkasan booking.",
  },
  {
    q: "Di mana saja area layanannya?",
    a: `${SITE.serviceArea}: Kota Malang, Kabupaten Malang, Kota Batu, dan sekitarnya. Pengambilan dilakukan di lokasi kami; pengantaran dalam kota dapat diminta ke admin dengan biaya tambahan yang disepakati di awal.`,
  },
  {
    q: "Bagaimana jika saya perlu membatalkan booking?",
    a: "Batalkan langsung dari dashboard selama status booking masih menunggu konfirmasi atau sudah dikonfirmasi. Untuk jadwal yang sudah berjalan, konfirmasikan lebih dulu ke admin.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-6xl border-t border-border px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <Reveal>
          <SectionHeading
            index="05"
            title="Pertanyaan umum"
            description="Jawaban ringkas untuk hal yang paling sering ditanyakan calon penyewa."
            prompt="~/faq $ man ryokourent"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="py-4 font-mono text-sm hover:no-underline">
                  <span className="flex items-start gap-2 pr-4 text-left">
                    <span className="text-ok" aria-hidden>
                      ?
                    </span>
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-6 text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
