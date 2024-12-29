import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Loading from "@/lib/Loading";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`antialiased bg-gray-900 text-white ${montserrat.className}`}
        >
          <>
            <Loading />
            {children}
          </>
        </body>
      </html>
    </ClerkProvider>
  );
}
