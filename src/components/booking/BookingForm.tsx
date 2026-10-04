import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Motor } from "@/data/motors";
import { useAuth } from "@/hooks/use-auth";
import { errorMessage } from "@/lib/errors";
import { formatRupiah } from "@/lib/format";
import {
  computeTotal,
  maxBookingDate,
  rentalDays,
  todayJakarta,
} from "@/lib/pricing";
import { SITE, waLink } from "@/lib/site";
import { useMutation } from "convex/react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { CalendarClock, CheckCircle2, Copy, Loader2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const TIME_OPTIONS: string[] = Array.from({ length: 25 }, (_, i) => {
  const minutes = 8 * 60 + i * 30;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
});

type FormState = {
  customerName: string;
  phone: string;
  email: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  notes: string;
};

const EMPTY: FormState = {
  customerName: "",
  phone: "",
  email: "",
  startDate: "",
  endDate: "",
  startTime: "08:00",
  endTime: "20:00",
  notes: "",
};

function validate(
  form: FormState,
  today: string,
): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = form.customerName.trim();
  if (name.length < 2 || name.length > 100) {
    errors.customerName = "Nama harus 2–100 karakter.";
  }
  const phone = form.phone.replace(/[\s()-]/g, "");
  if (!/^(\+?62|0)8\d{7,11}$/.test(phone)) {
    errors.phone = "Nomor tidak valid. Contoh: 081234567890.";
  }
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Format email tidak valid.";
  }
  if (!form.startDate) {
    errors.startDate = "Pilih tanggal ambil.";
  } else if (form.startDate < today) {
    errors.startDate = "Tanggal ambil sudah lewat.";
  }
  if (!form.endDate) {
    errors.endDate = "Pilih tanggal kembali.";
  } else if (form.startDate && form.endDate < form.startDate) {
    errors.endDate = "Tanggal kembali mendahului tanggal ambil.";
  } else if (form.startDate && rentalDays(form.startDate, form.endDate) > 30) {
    errors.endDate = "Durasi maksimal 30 hari.";
  }
  if (
    form.startDate &&
    form.endDate === form.startDate &&
    form.endTime <= form.startTime
  ) {
    errors.endTime = "Jam kembali harus setelah jam ambil.";
  }
  return errors;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </Label>
      {children}
      {error ? (
        <p className="font-mono text-[11px] text-destructive">{error}</p>
      ) : null}
    </div>
  );
}

/**
 * Formulir jadwal sewa di halaman detail motor.
 * Butuh masuk akun; validasi ringan di klien, otoritas di server
 * (termasuk cek rentang tanggal beririsan / anti double booking).
 */
export function BookingForm({ motor }: { motor: Motor }) {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const createBooking = useMutation(api.bookings.create);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  const today = todayJakarta();
  /** Nama dari isian, atau nama akun bila kolom belum diisi. */
  const nameValue = form.customerName.trim() || user?.name || "";
  const datesReady =
    /^\d{4}-\d{2}-\d{2}$/.test(form.startDate) &&
    /^\d{4}-\d{2}-\d{2}$/.test(form.endDate) &&
    form.endDate >= form.startDate;
  const days = datesReady ? rentalDays(form.startDate, form.endDate) : 0;
  const total =
    days > 0
      ? computeTotal(days, motor.priceDay, motor.priceWeek, motor.priceMonth)
      : 0;

  const set = (key: keyof FormState) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (motor.status === "rented") {
      toast.error(
        "Unit ini sedang disewa dan belum tersedia. Pilih unit atau jadwal lain.",
      );
      return;
    }
    const nextErrors = validate({ ...form, customerName: nameValue }, today);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Periksa kembali isian yang ditandai.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await createBooking({
        motorId: motor.id,
        customerName: nameValue,
        phone: form.phone.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        startTime: form.startTime,
        endTime: form.endTime,
        ...(form.email.trim() ? { email: form.email.trim() } : {}),
        ...(form.notes.trim() ? { notes: form.notes.trim() } : {}),
      });
      setCode(result.code);
      toast.success("Booking terkirim", {
        description: `Kode ${result.code} — menunggu konfirmasi admin.`,
      });
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  function summaryText(bookingCode: string) {
    const start = format(
      new Date(`${form.startDate}T00:00:00`),
      "d MMM yyyy",
      { locale: idLocale },
    );
    const end = format(new Date(`${form.endDate}T00:00:00`), "d MMM yyyy", {
      locale: idLocale,
    });
    return [
      `Halo ${SITE.name}, saya ingin konfirmasi booking.`,
      `Kode: ${bookingCode}`,
      `Unit: ${motor.name}`,
      `Jadwal: ${start} ${form.startTime} → ${end} ${form.endTime} (${days} hari)`,
      `Total: ${formatRupiah(total)}`,
      `Nama: ${nameValue}`,
      `WhatsApp: ${form.phone.trim()}`,
    ].join("\n");
  }

  /* ----------------------------- success view ----------------------------- */
  if (code) {
    const message = summaryText(code);
    const waUrl = waLink(message);
    return (
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
          <span>~ booking — hasil</span>
          <span className="text-ok">exit 0</span>
        </div>
        <div className="space-y-4 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ok" />
            <div>
              <p className="text-sm font-bold tracking-tight">
                Booking diterima dan tersimpan
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Status awal: menunggu konfirmasi admin. Pantau perkembangannya
                di dashboard Anda.
              </p>
            </div>
          </div>

          <dl className="divide-y divide-border rounded-md border border-border bg-background font-mono text-xs">
            <div className="flex justify-between gap-4 px-3 py-2">
              <dt className="text-muted-foreground">kode</dt>
              <dd className="font-bold text-foreground">{code}</dd>
            </div>
            <div className="flex justify-between gap-4 px-3 py-2">
              <dt className="text-muted-foreground">unit</dt>
              <dd className="text-right">{motor.name}</dd>
            </div>
            <div className="flex justify-between gap-4 px-3 py-2">
              <dt className="text-muted-foreground">durasi</dt>
              <dd>{days} hari</dd>
            </div>
            <div className="flex justify-between gap-4 px-3 py-2">
              <dt className="text-muted-foreground">total</dt>
              <dd className="font-bold text-foreground">
                {formatRupiah(total)}
              </dd>
            </div>
          </dl>

          <pre className="overflow-x-auto whitespace-pre-wrap rounded-md border border-border bg-background p-3 font-mono text-[11px] leading-5 text-muted-foreground">
            {message}
          </pre>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              className="cursor-pointer font-mono text-xs"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(message);
                  toast.success("Ringkasan booking disalin.");
                } catch {
                  toast.error("Gagal menyalin. Pilih teks secara manual.");
                }
              }}
            >
              <Copy className="size-3.5" /> salin ringkasan
            </Button>
            {waUrl ? (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="cursor-pointer font-mono text-xs"
              >
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  kirim ke WhatsApp
                </a>
              </Button>
            ) : null}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="cursor-pointer font-mono text-xs"
            >
              <Link to="/dashboard">lihat booking saya</Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="cursor-pointer font-mono text-xs"
              onClick={() => {
                setCode(null);
                setForm(EMPTY);
                setErrors({});
              }}
            >
              booking lain
            </Button>
          </div>
          {!waUrl ? (
            <p className="font-mono text-[11px] leading-5 text-muted-foreground">
              {"// nomor WhatsApp resmi belum dipasang (TODO) — salin ringkasan lalu kirim ke admin"}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  /* ---------------------------- sign-in gate ------------------------------ */
  if (authLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-border bg-card p-10">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
          <span>~ booking — akses</span>
          <span className="text-warn">401</span>
        </div>
        <div className="space-y-4 p-5">
          <p className="font-mono text-sm font-bold tracking-tight">
            Masuk untuk menjadwalkan sewa
          </p>
          <p className="text-xs leading-5 text-muted-foreground">
            Jadwal, riwayat booking, dan ulasan tercatat pada akun Anda sehingga
            mudah dipantau. Prosesnya hanya membutuhkan email — kode verifikasi
            dikirim langsung.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              size="sm"
              className="cursor-pointer font-mono text-xs"
            >
              <Link to={`/auth?returnTo=${encodeURIComponent(`/motor/${motor.slug}`)}`}>
                masuk / daftar
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="cursor-pointer font-mono text-xs"
            >
              <Link to="/#katalog">pilih unit lain</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ form view ------------------------------- */
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
        <span>~ booking — jadwal sewa</span>
        <CalendarClock className="size-3.5" aria-hidden />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="bk-name" label="nama lengkap" error={errors.customerName}>
            <Input
              id="bk-name"
              value={nameValue}
              onChange={(e) => set("customerName")(e.target.value)}
              placeholder="Nama sesuai identitas"
              autoComplete="name"
              className="font-mono text-sm"
            />
          </Field>
          <Field id="bk-phone" label="whatsapp" error={errors.phone}>
            <Input
              id="bk-phone"
              value={form.phone}
              onChange={(e) => set("phone")(e.target.value)}
              placeholder="081234567890"
              inputMode="tel"
              autoComplete="tel"
              className="font-mono text-sm"
            />
          </Field>
        </div>

        <Field id="bk-email" label="email (opsional)" error={errors.email}>
          <Input
            id="bk-email"
            type="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="nama@email.com"
            autoComplete="email"
            className="font-mono text-sm"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="bk-start-date" label="tanggal ambil" error={errors.startDate}>
            <Input
              id="bk-start-date"
              type="date"
              value={form.startDate}
              min={today}
              max={maxBookingDate()}
              onChange={(e) => set("startDate")(e.target.value)}
              className="font-mono text-sm"
            />
          </Field>
          <Field id="bk-start-time" label="jam ambil">
            <select
              id="bk-start-time"
              value={form.startTime}
              onChange={(e) => set("startTime")(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/40"
            >
              {TIME_OPTIONS.slice(0, -1).map((time) => (
                <option key={time} value={time}>
                  {time.replace(":", ".")}
                </option>
              ))}
            </select>
          </Field>
          <Field id="bk-end-date" label="tanggal kembali" error={errors.endDate}>
            <Input
              id="bk-end-date"
              type="date"
              value={form.endDate}
              min={form.startDate || today}
              max={maxBookingDate()}
              onChange={(e) => set("endDate")(e.target.value)}
              className="font-mono text-sm"
            />
          </Field>
          <Field id="bk-end-time" label="jam kembali" error={errors.endTime}>
            <select
              id="bk-end-time"
              value={form.endTime}
              onChange={(e) => set("endTime")(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 font-mono text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/40"
            >
              {TIME_OPTIONS.slice(1).map((time) => (
                <option key={time} value={time}>
                  {time.replace(":", ".")}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field id="bk-notes" label="catatan (opsional)">
          <Textarea
            id="bk-notes"
            value={form.notes}
            onChange={(e) => set("notes")(e.target.value)}
            placeholder="Titik jemput, kebutuhan helm anak, dll."
            rows={2}
            maxLength={500}
            className="font-mono text-sm"
          />
        </Field>

        <div className="rounded-md border border-border bg-background p-3 font-mono text-xs">
          <div className="flex justify-between gap-4 border-b border-dashed border-border pb-1.5">
            <span className="text-muted-foreground">durasi</span>
            <span>{days > 0 ? `${days} hari` : "—"}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-dashed border-border py-1.5">
            <span className="text-muted-foreground">tarif_hari</span>
            <span>{formatRupiah(motor.priceDay)}</span>
          </div>
          <div className="flex justify-between gap-4 pt-1.5">
            <span className="text-muted-foreground">total</span>
            <span className="font-bold text-foreground">
              {days > 0 ? formatRupiah(total) : "pilih tanggal"}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="w-full cursor-pointer font-mono text-sm"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> mengirim booking…
            </>
          ) : (
            <>kirim booking</>
          )}
        </Button>

        <p className="font-mono text-[11px] leading-5 text-muted-foreground">
          {"// pembayaran dilakukan saat pengambilan; total dikunci sesuai ringkasan di atas"}
        </p>
      </form>
    </div>
  );
}
