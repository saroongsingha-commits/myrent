import { BOOKING_STATUS_META } from "@/lib/booking-status";
import type { BookingStatus } from "@/convex/schema";
import { cn } from "@/lib/utils";

/** Label status booking bergaya terminal (titik + huruf kapital). */
export function BookingStatusBadge({
  status,
  className,
}: {
  status: BookingStatus;
  className?: string;
}) {
  const meta = BOOKING_STATUS_META[status];
  return (
    <span
      title={meta.hint}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] font-medium",
        meta.className,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {meta.label}
    </span>
  );
}
