import type { Metadata } from "next";
import "./globals.css";
import { SkullTrail } from "@/components/SkullTrail";
import { MidiPlayer } from "@/components/MidiPlayer";

export const metadata: Metadata = {
  title: "My Awesome Website",
  description: "Welcome to my cool website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <MidiPlayer />
        <SkullTrail />
      </body>
    </html>
  );
}
