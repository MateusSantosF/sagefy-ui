"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { validateIsAllowedApp } from "../utils/validate-is-allowed-app";

type UserMetadataContextType = {
  origin?: string;
  metadata?: Record<string, unknown>;
};

const UserMetadataContext = createContext<UserMetadataContextType | undefined>(undefined);

export const UserMetadataProvider = ({ children }: { children: React.ReactNode }) => {
  const [origin, setOrigin] = useState<string | undefined>(undefined);
  const [metadata, setMetadata] = useState<Record<string, unknown> | undefined>(
    undefined
  );

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const isOriginAllowed = validateIsAllowedApp(event.origin);
      if (!isOriginAllowed) {
        console.error("App origin not allowed", event.origin);
        return;
      }
      if (event.data.type === "update") {
        setOrigin(event.data.origin);
        setMetadata((prev)=>{return {...prev, ...event.data.metadata}});
      }
    };
    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  return (
    <UserMetadataContext.Provider value={{ origin, metadata }}>
      {children}
    </UserMetadataContext.Provider>
  );
};

export function useUserMetadata() {
  const context = useContext(UserMetadataContext);
  if (!context) {
    throw new Error("useUserMetadata must be used within a UserMetadataProvider");
  }
  return context;
}
