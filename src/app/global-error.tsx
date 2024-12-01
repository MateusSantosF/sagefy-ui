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
        status="500"
        title="Oops! Algo não saiu como esperado"
        subTitle="Já estamos trabalhando para resolver! Por favor, tente novamente mais tarde."
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
