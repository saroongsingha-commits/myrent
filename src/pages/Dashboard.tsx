import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { BookingStatusBadge } from "@/components/BookingStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
  BOOKING_STATUS_META,
  REVIEW_STATUS_META,
} from "@/lib/booking-status";
import { errorMessage } from "@/lib/errors";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  CalendarDays,
  Loader2,
  LogOut,
  Star,
  TicketCheck,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

function formatDateRange(
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
) {
  const fmt = (iso: string) =>
    format(new Date(`${iso}T00:00:00`), "d MMM yyyy", { locale: idLocale });
  return `${fmt(startDate)} ${startTime.replace(":", ".")} → ${fmt(endDate)} ${endTime.replace(":", ".")}`;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const bookings = useQuery(api.bookings.listMine);
  const reviews = useQuery(api.reviews.listMine);
  const cancelBooking = useMutation(api.bookings.cancelMine);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  async function handleCancel(id: Id<"bookings">) {
    try {
      await cancelBooking({ id });
      toast.success("Booking dibatalkan.", {
        description: "Status berubah menjadi DIBATALKAN.",
      });
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setConfirmId(null);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-ok">ryokourent@app</span>:~/dashboard$
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Ruang Anda
              {user?.name ? ` — ${user.name}` : ""}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Pantau jadwal sewa dan ulasan yang Anda kirim.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 self-start">
            {user?.role === "admin" ? (
              <Button
                asChild
                variant="outline"
                className="cursor-pointer font-mono text-xs"
              >
                <Link to="/admin">area admin</Link>
              </Button>
            ) : null}
            <Button
              asChild
              variant="outline"
              className="cursor-pointer font-mono text-xs"
            >
              <Link to="/#katalog">lihat katalog</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer gap-2 font-mono text-xs"
              onClick={handleSignOut}
            >
              <LogOut className="size-4" />
              keluar
            </Button>
          </div>
        </header>

        <Tabs defaultValue="booking" className="mt-8">
          <TabsList className="font-mono text-xs">
            <TabsTrigger value="booking" className="cursor-pointer gap-2">
              <CalendarDays className="size-3.5" aria-hidden />
              booking saya
            </TabsTrigger>
            <TabsTrigger value="reviews" className="cursor-pointer gap-2">
              <Star className="size-3.5" aria-hidden />
              ulasan saya
            </TabsTrigger>
          </TabsList>

          {/* ------------------------- bookings ------------------------- */}
          <TabsContent value="booking" className="mt-5">
            {bookings === undefined ? (
              <div className="flex items-center justify-center rounded-lg border border-border bg-card p-10">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
                <p className="font-mono text-sm text-muted-foreground">
                  {"// belum ada booking"}
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Pilih unit di katalog lalu tentukan jadwal sewa Anda —
                  booking akan tercatat di sini beserta statusnya.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 cursor-pointer font-mono text-xs"
                >
                  <Link to="/#katalog">pilih motor</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {bookings.map((booking) => {
                  const meta = BOOKING_STATUS_META[booking.status];
                  const cancellable =
                    booking.status === "pending" ||
                    booking.status === "confirmed";
                  return (
                    <li
                      key={booking._id}
                      className="overflow-hidden rounded-lg border border-border bg-card"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted px-4 py-2.5 font-mono text-[11px]">
                        <span className="font-bold text-foreground">
                          {booking.code}
                        </span>
                        <BookingStatusBadge status={booking.status} />
                      </div>
                      <div className="grid gap-4 p-4 sm:grid-cols-[1.4fr_1fr]">
                        <div className="min-w-0">
                          <p className="text-sm font-bold tracking-tight">
                            {booking.motorName}
                          </p>
                          <p className="mt-1 break-words font-mono text-xs text-muted-foreground">
                            {formatDateRange(
                              booking.startDate,
                              booking.endDate,
                              booking.startTime,
                              booking.endTime,
                            )}
                          </p>
                          <p className="mt-1 font-mono text-xs text-muted-foreground">
                            {booking.durationDays} hari ·{" "}
                            {meta.hint}
                          </p>
                          {booking.notes ? (
                            <p className="mt-2 border-l-2 border-border pl-3 text-xs leading-5 text-muted-foreground">
                              {booking.notes}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex flex-col items-start justify-between gap-3 sm:items-end">
                          <div className="text-right">
                            <p className="text-lg font-bold tracking-tight">
                              {formatRupiah(booking.total)}
                            </p>
                            <p className="font-mono text-[11px] text-muted-foreground">
                              dibuat{" "}
                              {format(
                                new Date(booking.createdAt),
                                "d MMM yyyy",
                                { locale: idLocale },
                              )}
                            </p>
                          </div>
                          {cancellable ? (
                            confirmId === booking._id ? (
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  className="cursor-pointer border-destructive/50 font-mono text-xs text-destructive"
                                  onClick={() => handleCancel(booking._id)}
                                >
                                  ya, batalkan
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  className="cursor-pointer font-mono text-xs"
                                  onClick={() => setConfirmId(null)}
                                >
                                  kembali
                                </Button>
                              </div>
                            ) : (
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="cursor-pointer font-mono text-xs"
                                onClick={() => setConfirmId(booking._id)}
                              >
                                batalkan booking
                              </Button>
                            )
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </TabsContent>

          {/* ------------------------- reviews -------------------------- */}
          <TabsContent value="reviews" className="mt-5">
            {reviews === undefined ? (
              <div className="flex items-center justify-center rounded-lg border border-border bg-card p-10">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
                <p className="font-mono text-sm text-muted-foreground">
                  {"// belum ada ulasan"}
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Setelah sewa, buka kembali halaman unit dan tuliskan ulasan
                  Anda. Ulasan tampil publik setelah ditinjau tim kami.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 cursor-pointer font-mono text-xs"
                >
                  <Link to="/#katalog">buka katalog</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {reviews.map((review) => {
                  const state = REVIEW_STATUS_META[review.status];
                  return (
                    <li
                      key={review._id}
                      className="rounded-lg border border-border bg-card p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <Star
                              key={value}
                              className={cn(
                                "size-3.5",
                                value <= review.rating
                                  ? "fill-current text-ok"
                                  : "text-border",
                              )}
                              aria-hidden
                            />
                          ))}
                        </span>
                        <span
                          className={cn(
                            "flex items-center gap-1.5 font-mono text-[11px]",
                            state.className,
                          )}
                        >
                          <span
                            className="size-1.5 rounded-full bg-current"
                            aria-hidden
                          />
                          {state.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6">{review.body}</p>
                      <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                        {format(new Date(review.createdAt), "d MMM yyyy", {
                          locale: idLocale,
                        })}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </TabsContent>
        </Tabs>

        <p className="mt-8 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <TicketCheck className="size-3.5 text-ok" aria-hidden />
          {"sesi aman — hanya booking Anda yang tampil di halaman ini"}
        </p>
      </div>
    </main>
  );
}
