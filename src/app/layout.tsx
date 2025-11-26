import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { Navigation } from "@/components/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AF Cybersecurity",
  description: "منصة تعليمية تفاعلية لفهم هجمات الأمن السيبراني من خلال المحاكاة المرئية",
  keywords: ["الأمن السيبراني", "الهجمات السيبرانية", "التعليم الرقمي", "محاكاة الهجمات", "DDoS", "Phishing", "Ransomware"],
  authors: [{ name: "Cyber Scenarios Team" }],
  icons: {
    icon: "/logo.png", 
  },
  openGraph: {
    title: "AF Cybersecurity",
    description: "تعلم الأمن السيبراني من خلال المحاكاة التفاعلية",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-grid">
            <Navigation />
            <main className="relative z-10">
              {children}
            </main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
