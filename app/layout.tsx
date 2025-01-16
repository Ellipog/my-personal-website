import type { Metadata } from "next";
import "./globals.css";
import { SkullTrail } from "@/components/SkullTrail";
import { MidiPlayer } from "@/components/MidiPlayer";

export const metadata: Metadata = {
  title: "My Awesome Cool Website",
  description:
    "Welcome to my totally radical website from 2014! Best viewed in Netscape Navigator 4.0 at 800x600! Don't forget to sign my guestbook!",
  icons: {
    icon: "/img/icon.png",
  },
  openGraph: {
    title: "My Awesome Cool Website",
    description:
      "Welcome to my totally radical website from 2014! Best viewed in Netscape Navigator 4.0 at 800x600!",
    url: "https://www.myawesomecoolwebsite.aaenz.no",
    siteName: "My Awesome Cool Website",
    images: [
      {
        url: "/img/cool-image.jpeg",
        width: 1200,
        height: 630,
        alt: "My Awesome Cool Website Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Awesome Cool Website",
    description:
      "Welcome to my totally radical website from 2014! Best viewed in Netscape Navigator 4.0 at 800x600!",
    images: ["/img/og-image.png"],
  },
  keywords: [
    "retro",
    "website",
    "2004",
    "guestbook",
    "blog",
    "netscape",
    "ipod",
    "midi",
  ],
  themeColor: "#ff00ff", // Hot pink for that retro feel
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
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
