import type { ReactNode } from "react";
import { useAuth } from "@/context/auth";
import { DataProvider } from "./DataProvider";

export const AccountDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useAuth();
  const userEmail = user?.email.toLowerCase() ?? null;

  return (
    <DataProvider key={userEmail ?? "anonymous"} userEmail={userEmail}>
      {children}
    </DataProvider>
  );
};
