import type { ReactNode } from "react";

export function StandardContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {children}
  </div>;
};
