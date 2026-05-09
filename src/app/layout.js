import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://affaankidwai.com"),
  title: { default: "Affaan Kidwai | Wildlife Photography", template: "%s | Affaan Kidwai" },
  description: "The personal website of Affaan Kidwai, beginning with a modern wildlife photography world for galleries, trip journals, and field notes.",
};

export default function RootLayout({ children }) {
  const themeScript = `(() => { const saved = localStorage.getItem("affaan-theme"); const theme = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"); document.documentElement.dataset.theme = theme; })();`;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
