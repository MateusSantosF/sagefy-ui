"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { Button } from "@shared/components//ui/button";

type TErrorProps = {
  error: Error & { digest?: string };
  resetErrorBoundary: () => void;
};

export default function GlobalError({ error }: TErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <NextLink href="/" className="flex justify-center">
        <Button className="m-auto">
          Voltar para a Página Inicial
        </Button>
      </NextLink>
    </main>
  );
}
