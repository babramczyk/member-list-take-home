import { ReactNode } from "react";

// TODO: Consider renaming this component? It's uh.... not great
/**
 * A header / divider to separate rows in our member table into separate, meaningful sections
 */
export function RowDivider({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-500 text-white text-2xl text-center p-4 border-b-2 font-bold">
      {children}
    </div>
  );
}
