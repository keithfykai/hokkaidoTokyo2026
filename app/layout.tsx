import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hokkaido + Tokyo 2026",
  description: "A modern itinerary website for a Japan trip across Hokkaido and Tokyo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
