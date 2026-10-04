import { ReviewList } from "@/components/reviews/ReviewList";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Ulasan terpublikasi sebagai social proof di landing page. */
export function Testimonials() {
  return (
    <section
      id="ulasan"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <Reveal>
        <SectionHeading
          index="04"
          title="Kata pelanggan"
          description="Pengalaman nyata dari pelanggan Ryokourent App. Ulasan hanya ditampilkan setelah ditinjau tim kami, sehingga yang tampil adalah cerita yang benar-benar terjadi."
          prompt="~/ulasan $ tail -f reviews.log"
        />
      </Reveal>
      <Reveal delay={0.06}>
        <ReviewList limit={6} />
      </Reveal>
    </section>
  );
}
