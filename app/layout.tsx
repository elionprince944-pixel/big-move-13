import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "BIG MOVE | Your next obsession", description: "Discover your next favourite movie with BIG MOVE." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
