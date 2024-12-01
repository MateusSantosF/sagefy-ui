"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { Button, Result } from "antd";

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
      <Result
        status="404"
        title="Oops! Não encontramos a página que você procura"
        subTitle="Verifique se a URL está correta ou volte para a página inicial."
        extra={
          <div className="flex flex-col gap-4">
            <NextLink href="/" className="flex justify-center">
              <Button type="primary" className="m-auto">
                Voltar para a Página Inicial
              </Button>
            </NextLink>
          </div>
        }
      />
    </main>
  );
}
