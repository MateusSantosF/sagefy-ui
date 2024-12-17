import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sagefy",
  description: "Sagefy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
