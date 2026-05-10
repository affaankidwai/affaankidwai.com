import "./globals.css";
import "./polish.css";

export const metadata = {
  metadataBase: new URL("https://affaankidwai.com"),
  title: {
    default: "Affaan Kidwai — Wildlife Photography & Journal",
    template: "%s · Affaan Kidwai",
  },
  description:
    "The personal site of Affaan Kidwai: wildlife photographs from Indian forests, slow trip journals, and the patience behind a memorable frame.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Affaan Kidwai — Wildlife Photography & Journal",
    description:
      "Wildlife photographs from Indian forests, slow trip journals, and the patience behind a memorable frame.",
    type: "website",
    locale: "en_IN",
    url: "https://affaankidwai.com",
    siteName: "Affaan Kidwai",
    images: [
      {
        url: "/gallery/IMG_0757.jpg",
        width: 2400,
        height: 1547,
        alt: "A Bengal tiger walking on a forest trail.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affaan Kidwai — Wildlife Photography & Journal",
    description:
      "Wildlife photographs from Indian forests, slow trip journals, and the patience behind a memorable frame.",
    images: ["/gallery/IMG_0757.jpg"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
