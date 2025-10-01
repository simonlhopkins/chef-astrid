import type {Metadata} from "next";
import {Geist} from "next/font/google";
import {ThemeProvider} from "next-themes";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import {ThemeSwitcher} from "@/components/theme-switcher";
import {Toaster} from "@/components/ui/sonner";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Chef Astrid",
    description: "Restaurant reviews for Kendra",
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    display: "swap",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main className="min-h-screen flex flex-col items-center">
                <Navbar/>
                <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 w-full">
                    {children}
                </div>

                <footer
                    className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                    <p>
                        Chef astrid
                    </p>
                    <ThemeSwitcher/>
                </footer>
                <Toaster/>
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}
