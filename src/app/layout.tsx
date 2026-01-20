import { InitColorSchemeScript } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "The Growth App",
  description: "Simple, reliable baby growth measurement app.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "The Growth App",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#664ce9",
  userScalable: false,
  width: "device-width",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={roboto.variable} lang="en" suppressHydrationWarning={true}>
      <body>
        <InitColorSchemeScript />
        <AppRouterCacheProvider>
          <main>{children}</main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
