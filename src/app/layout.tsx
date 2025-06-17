import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoTall - Unlock Your Growth Potential",
  description: "Track your height journey, optimize health habits, and grow up to 2–3 inches in 6 months with GoTall.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
