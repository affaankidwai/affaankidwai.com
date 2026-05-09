import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://affaankidwai.com"),
  title: {
    default: "Affaan Kidwai — Wildlife Photography & Field Notes",
    template: "%s · Affaan Kidwai",
  },
  description:
    "The personal site of Affaan Kidwai: wildlife photographs from Indian forests, slow trip journals, and the patience behind a memorable frame.",
  openGraph: {
    title: "Affaan Kidwai — Wildlife Photography & Field Notes",
    description:
      "Wildlife photographs from Indian forests, slow trip journals, and the patience behind a memorable frame.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }) {
  const themeScript = `
    (() => {
      try {
        const saved = localStorage.getItem("affaan-theme");
        const theme = saved || "dark";
        document.documentElement.dataset.theme = theme;
      } catch (_) {
        document.documentElement.dataset.theme = "dark";
      }
    })();
  `;

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
