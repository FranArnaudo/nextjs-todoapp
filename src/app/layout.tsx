import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={`${montserrat.className} h-full w-full flex`}>
        <div className="h-full w-1/4 bg-sky-100">
          sidebar :D
        </div>
        {children}
      </body>
    </html>
  );
}
