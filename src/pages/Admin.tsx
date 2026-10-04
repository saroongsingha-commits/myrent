import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { BookingStatusBadge } from "@/components/BookingStatusBadge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { NEXT_STATUS, REVIEW_STATUS_META } from "@/lib/booking-status";
import type { BookingStatus } from "@/convex/schema";
import { errorMessage } from "@/lib/errors";
import { formatRupiah } from "@/lib/format";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  Loader2,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

function Panel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted px-4 py-2.5 font-mono text-[11px]">
        <span className="font-bold text-foreground">{title}</span>
        {hint ? (
          <span className="text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

/* --------------------------- admin (role = admin) -------------------------- */
function AdminPanels() {
  const bookings = useQuery(api.bookings.listAll);
  const pendingReviews = useQuery(api.reviews.listPending);
  const updateStatus = useMutation(api.bookings.updateStatus);
  const moderate = useMutation(api.reviews.moderate);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleChangeStatus(id: Id<"bookings">, status: BookingStatus) {
    setBusyId(String(id));
    try {
      await updateStatus({ id, status });
      toast.success("Status booking diperbarui.", {
        description: `Menjadi ${status.toUpperCase()}.`,
      });
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setBusyId(null);
    }
  }

  async function handleModerate(
    id: Id<"reviews">,
    status: "approved" | "hidden",
  ) {
    setBusyId(String(id));
    try {
      await moderate({ id, status });
      toast.success(
        status === "approved"
          ? "Ulasan dipublikasikan."
          : "Ulasan disimpan (tidak tampil publik).",
      );
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setBusyId(null);
    }
  }

  const loading = bookings === undefined || pendingReviews === undefined;
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-border bg-card p-10">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const waiting = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const running = bookings.filter((b) => b.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: "booking_total", v: bookings.length },
          { k: "menunggu_konfirmasi", v: waiting },
          { k: "dikonfirmasi", v: confirmed },
          { k: "sedang_berjalan", v: running },
        ].map((stat) => (
          <div
            key={stat.k}
            className="rounded-lg border border-border bg-card p-3"
          >
            <p className="font-mono text-[11px] text-muted-foreground">
              {stat.k}
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{stat.v}</p>
          </div>
        ))}
      </div>

      <Panel
        title="booking masuk"
        hint={`${bookings.length} catatan · ubah status sesuai perkembangan`}
      >
        {bookings.length === 0 ? (
          <p className="font-mono text-xs text-muted-foreground">
            {"// belum ada booking"}
          </p>
        ) : (
          <ul className="space-y-3">
            {bookings.map((booking) => {
              const next = NEXT_STATUS[booking.status];
              return (
                <li
                  key={booking._id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold">
                      {booking.code}
                    </span>
                    <BookingStatusBadge status={booking.status} />
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="font-mono text-xs text-muted-foreground">
                      <p className="text-foreground">{booking.motorName}</p>
                      <p className="mt-1">
                        {format(new Date(booking.startDate), "d MMM yyyy", {
                          locale: idLocale,
                        })}{" "}
                        {booking.startTime.replace(":", ".")} →{" "}
                        {format(new Date(booking.endDate), "d MMM yyyy", {
                          locale: idLocale,
                        })}{" "}
                        {booking.endTime.replace(":", ".")}
                      </p>
                      <p className="mt-1">
                        {booking.durationDays} hari ·{" "}
                        <span className="text-foreground">
                          {formatRupiah(booking.total)}
                        </span>
                      </p>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      <p className="text-foreground">{booking.customerName}</p>
                      <p className="mt-1">WA: {booking.phone}</p>
                      {booking.email ? <p>{booking.email}</p> : null}
                      {booking.notes ? (
                        <p className="mt-1 border-l-2 border-border pl-2">
                          {booking.notes}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {next.length > 0 ? (
                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-dashed border-border pt-3">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        ubah ke:
                      </span>
                      {next.map((status) => (
                        <Button
                          key={status}
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={busyId === String(booking._id)}
                          className="cursor-pointer font-mono text-[11px]"
                          onClick={() => handleChangeStatus(booking._id, status)}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <Panel
        title="moderasi ulasan"
        hint={`${pendingReviews.length} menunggu tinjauan`}
      >
        {pendingReviews.length === 0 ? (
          <p className="font-mono text-xs text-muted-foreground">
            {"// tidak ada ulasan yang menunggu"}
          </p>
        ) : (
          <ul className="space-y-3">
            {pendingReviews.map((review) => {
              const state = REVIEW_STATUS_META[review.status];
              return (
                <li
                  key={review._id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold">
                      {review.authorName} · {review.rating}/5
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[11px]",
                        state.className,
                      )}
                    >
                      {state.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6">{review.body}</p>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-dashed border-border pt-3">
                    <Button
                      type="button"
                      size="sm"
                      disabled={busyId === String(review._id)}
                      className="cursor-pointer font-mono text-xs"
                      onClick={() => handleModerate(review._id, "approved")}
                    >
                      setujui & tampilkan
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={busyId === String(review._id)}
                      className="cursor-pointer font-mono text-xs"
                      onClick={() => handleModerate(review._id, "hidden")}
                    >
                      simpan
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <p className="font-mono text-[11px] leading-5 text-muted-foreground">
        {"// pengaturan harga & nomor WhatsApp menyusul (TASK-024) — saat ini konfigurasi ada di src/lib/site.ts"}
      </p>
    </div>
  );
}

/* --------------------------- bootstrap / gating ---------------------------- */
export default function Admin() {
  const { user, isLoading } = useAuth();
  const hasAdmin = useQuery(api.access.hasAdmin);
  const claimAdmin = useMutation(api.access.claimAdmin);
  const [claiming, setClaiming] = useState(false);

  if (isLoading || (user && hasAdmin === undefined)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (user?.role === "admin") {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-sm text-muted-foreground">
                <span className="text-ok">ryokourent@app</span>:~/admin$
              </p>
              <h1 className="mt-1 flex items-center gap-2 text-3xl font-bold tracking-tight">
                <ShieldCheck className="size-7 text-ok" aria-hidden />
                Area Admin
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Kelola booking, ubah status, dan tinjau ulasan pelanggan.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                variant="outline"
                className="cursor-pointer font-mono text-xs"
              >
                <Link to="/dashboard">dashboard</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="cursor-pointer font-mono text-xs"
              >
                <Link to="/">beranda</Link>
              </Button>
            </div>
          </header>

          <div className="mt-8">
            <AdminPanels />
          </div>
        </div>
      </main>
    );
  }

  if (hasAdmin === false) {
    return (
      <main className="grid-paper flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-muted px-3 py-2 font-mono text-[11px] text-muted-foreground">
            <span>~ ryokourent app — akses admin</span>
            <span className="text-warn">setup</span>
          </div>
          <div className="space-y-4 p-6">
            <h1 className="text-xl font-bold tracking-tight">
              Tetapkan admin pertama
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Belum ada admin di sistem. Jika akun yang sedang masuk ini adalah
              akun pemilik bisnis, klaim akses admin sekarang — cukup dilakukan
              satu kali, lalu kelola booking dan ulasan dari halaman ini.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                disabled={claiming}
                className="cursor-pointer font-mono text-xs"
                onClick={async () => {
                  setClaiming(true);
                  try {
                    await claimAdmin({});
                    toast.success("Akun ini kini menjadi admin.");
                  } catch (error) {
                    toast.error(errorMessage(error));
                  } finally {
                    setClaiming(false);
                  }
                }}
              >
                {claiming ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" /> memproses…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="size-3.5" /> klaim akses admin
                  </>
                )}
              </Button>
              <Button
                asChild
                variant="outline"
                className="cursor-pointer font-mono text-xs"
              >
                <Link to="/">nanti saja</Link>
              </Button>
            </div>
            <p className="font-mono text-[11px] leading-5 text-muted-foreground">
              {"// TODO produksi: penetapan admin lewat undangan, bukan klaim mandiri"}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="grid-paper flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted px-3 py-2 font-mono text-[11px] text-muted-foreground">
          <span>~ ryokourent app — akses admin</span>
          <span className="text-destructive">403</span>
        </div>
        <div className="space-y-4 p-6">
          <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <ShieldAlert className="size-5 text-destructive" aria-hidden />
            Akses ditolak
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Akun Anda bukan admin. Hubungi pemilik akun admin bila Anda
            membutuhkan akses ke halaman ini.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              size="sm"
              className="cursor-pointer font-mono text-xs"
            >
              <Link to="/dashboard">dashboard saya</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="cursor-pointer font-mono text-xs"
            >
              <Link to="/">beranda</Link>
            </Button>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">
            {"// layanan pelanggan tetap bisa dihubungi: "}
            {SITE.hours}
          </p>
        </div>
      </div>
    </main>
  );
}
