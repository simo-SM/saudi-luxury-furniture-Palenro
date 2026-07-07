export function PalenroLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        letterSpacing: "0.18em",
      }}
    >
      PALENRO
    </span>
  );
}