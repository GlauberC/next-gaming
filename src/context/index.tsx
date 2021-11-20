import { ReactNode } from "react";
import { ClientProvider } from "./client";

interface ContextsProps {
  children: ReactNode;
}

export default function Contexts({ children }: ContextsProps) {
  return <ClientProvider>{children}</ClientProvider>;
}
