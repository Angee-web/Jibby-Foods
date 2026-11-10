/**
 * Marks content that is waiting for confirmation from Jibby Foods.
 * Visible in development (and when NEXT_PUBLIC_SHOW_PLACEHOLDERS=true)
 * so the owner can see what still needs input; hidden on the live site.
 */
export const showPlaceholders =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export function Pending({ note }: { note: string }) {
  if (!showPlaceholders) return null;
  return (
    <span
      title={note}
      className="ml-2 inline-flex items-center rounded-sm border border-dashed border-sorghum/60 bg-sorghum/5 px-1.5 py-0.5 align-middle font-sans text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-sorghum"
    >
      To confirm: {note}
    </span>
  );
}
