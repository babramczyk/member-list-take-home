import { ReactNode } from "react";

// TODO: Consider renaming this component? It's uh.... not great
/**
 * A header / divider to separate rows in our member table into separate, meaningful sections
 */
export function RowDivider({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-xl p-4 border-b-2 border-slate-100 font-bold ${className}`}
    >
      {children}
    </div>
  );
}
