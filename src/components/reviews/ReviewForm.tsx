import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { errorMessage } from "@/lib/errors";
import { useMutation } from "convex/react";
import { Loader2, Send, Star } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const MAX_LENGTH = 800;

/**
 * Formulir ulasan pelanggan. Butuh masuk akun; hasil dikirim dengan status
 * "menunggu tinjauan" dan baru tampil publik setelah disetujui admin.
 */
export function ReviewForm({
  motorId,
  returnTo,
}: {
  motorId?: string;
  returnTo: string;
}) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const createReview = useMutation(api.reviews.create);
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rating < 1) {
      toast.error("Pilih nilai bintang terlebih dahulu.");
      return;
    }
    if (body.trim().length < 10) {
      toast.error("Tuliskan minimal 10 karakter.");
      return;
    }
    setSubmitting(true);
    try {
      await createReview({
        rating,
        body: body.trim(),
        ...(motorId ? { motorId } : {}),
      });
      toast.success("Ulasan terkirim", {
        description: "Ulasan ditinjau admin sebelum ditampilkan publik.",
      });
      setBody("");
      setRating(0);
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-border bg-card p-6">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-background p-4">
        <p className="font-mono text-xs text-muted-foreground">
          Masuk dengan akun Anda untuk menulis ulasan.
        </p>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="mt-3 cursor-pointer font-mono text-xs"
        >
          <Link to={`/auth?returnTo=${encodeURIComponent(returnTo)}`}>
            masuk / daftar
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-border bg-card p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          tulis ulasan
        </Label>
        <div className="flex items-center gap-1" role="group" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              aria-label={`${value} bintang`}
              aria-pressed={rating === value}
              className="cursor-pointer p-0.5 transition-transform hover:scale-110"
            >
              <Star
                className={
                  value <= rating
                    ? "size-4 fill-current text-ok"
                    : "size-4 text-border"
                }
              />
            </button>
          ))}
        </div>
      </div>

      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Ceritakan pengalaman Anda: kondisi unit, ketepatan jadwal, pelayanan."
        rows={3}
        maxLength={MAX_LENGTH}
        className="mt-3 font-mono text-sm"
      />

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-muted-foreground">
          {body.length}/{MAX_LENGTH}
        </span>
        <Button
          type="submit"
          size="sm"
          disabled={submitting}
          className="cursor-pointer font-mono text-xs"
        >
          {submitting ? (
            <>
              <Loader2 className="size-3.5 animate-spin" /> mengirim…
            </>
          ) : (
            <>
              <Send className="size-3.5" /> kirim ulasan
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
