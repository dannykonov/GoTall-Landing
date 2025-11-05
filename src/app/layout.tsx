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
        <footer className="px-4 sm:px-6 lg:px-12 py-8 border-t border-gray-800 bg-black">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-xs sm:text-sm text-primary-gray">
              GoTall is owned and operated by <span className="text-white font-medium">Grow Labs LLC</span>.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
