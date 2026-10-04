import { cn } from "@/lib/utils";

/** Terminal-style section heading: `[0N] ───── prompt` + title. */
export function SectionHeading({
  index,
  title,
  description,
  prompt,
  className,
}: {
  index: string;
  title: string;
  description?: string;
  prompt: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 sm:mb-10", className)}>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <span className="text-ok">[{index}]</span>
        <span className="h-px flex-1 bg-border" />
        <span className="hidden max-w-[60%] truncate sm:block">{prompt}</span>
      </div>
      <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
