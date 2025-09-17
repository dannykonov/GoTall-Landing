import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoTall - Unlock Your Growth Potential",
  description: "Track your height journey, optimize health habits, and grow up to 2–3 inches in 6 months with GoTall.",
  other: {
    'apple-itunes-app': 'app-id=6747467975, app-argument=https://apps.apple.com/us/app/gotall/id6747467975'
  }
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
