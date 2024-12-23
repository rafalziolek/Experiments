import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="font-sans">
        {children}
        <footer className="flex flex-row gap-4 justify-between align-middle p-4 fixed bottom-0 w-full">
          <p className="text-lg tracking-tight font-semibold ">
            Made by{" "}
            <a
              className="hover:underline"
              href="https://rafalziolek.work"
              target="_blank"
            >
              Rafał Ziołek
            </a>
            .{" "}
            <a
              className="hover:underline"
              href="https://x.com/rafal_ziolek"
              target="_blank"
            >
              @rafal_ziolek
            </a>{" "}
            on x.com
          </p>
        </footer>
      </body>
    </html>
  );
}
