import { ReactNode } from "react";

export function EmptyListMessage({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 text-center italic text-slate-400">
      {children}
    </div>
  );
}
