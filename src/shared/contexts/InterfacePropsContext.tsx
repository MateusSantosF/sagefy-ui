"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const DEFAULT_COLOR = "#195128";
const DEFAULT_TITLE = "Chatbot"

type InterfaceColorContextType = {
  color: string;
  setColor: (color: string) => void;
  title: string;
  setTitle: (title: string) => void;
};

const InterfaceColorContext = createContext<InterfaceColorContextType | undefined>(undefined);

export const InterfacePropsProvider = ({ children }: { children: React.ReactNode }) => {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("color")) {
      const colorFromParams = searchParams.get("color") ?? DEFAULT_COLOR;
      setColor(colorFromParams);
    }

    if (searchParams.has("title")) {
      const titleFromParams = searchParams.get("title") ?? DEFAULT_TITLE;
      setTitle(titleFromParams);
    }
  }, [searchParams]);

  useEffect(() => {
    document.documentElement.style.setProperty("--interface", `#${color.replace("#", "")}`);
  }, [color]);

  return (
    <InterfaceColorContext.Provider value={{ color, setColor, title, setTitle }}>
      {children}
    </InterfaceColorContext.Provider>
  );
};

export function useInterfaceProps() {
  const context = useContext(InterfaceColorContext);
  if (!context) {
    throw new Error("useInterfaceColor must be used within an InterfaceColorProvider");
  }
  return context;
}
