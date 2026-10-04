import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Loader2, Star } from "lucide-react";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} dari 5`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={
            value <= rating
              ? "size-3.5 fill-current text-ok"
              : "size-3.5 text-border"
          }
          aria-hidden
        />
      ))}
    </span>
  );
}

/** Daftar ulasan terpublikasi — boleh dilihat tanpa login. */
export function ReviewList({
  motorId,
  limit = 6,
  emptyText = "Belum ada ulasan terpublikasi. Jadilah pelanggan pertama yang berbagi pengalaman.",
}: {
  motorId?: string;
  limit?: number;
  emptyText?: string;
}) {
  const { isAuthenticated } = useAuth();
  const reviews = useQuery(
    api.reviews.listApproved,
    motorId ? { motorId } : {},
  );

  if (reviews === undefined) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-border bg-card p-6">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border bg-background p-5 font-mono text-xs leading-5 text-muted-foreground">
        {"// "}
        {emptyText}
        {!isAuthenticated ? " Masuk untuk menjadi yang pertama." : ""}
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {reviews.slice(0, limit).map((review) => (
        <li
          key={review._id}
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Stars rating={review.rating} />
            <span className="font-mono text-[11px] text-muted-foreground">
              {format(new Date(review.createdAt), "d MMM yyyy", {
                locale: idLocale,
              })}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-foreground">{review.body}</p>
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">
            — {review.authorName}
          </p>
        </li>
      ))}
    </ul>
  );
}
