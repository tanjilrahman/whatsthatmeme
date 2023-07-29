import "./globals.css";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContextProvider } from "./context/store";

const RFDewi = localFont({
  src: [
    {
      path: "../../fonts/RFDewiExtended-Black.woff2",
      style: "normal",
      weight: "900",
    },
    {
      path: "../../fonts/RFDewiExtended-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../fonts/RFDewi-Regular.woff2",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-RFDewi",
});
export const metadata = {
  title: "What's That Meme?",
  description:
    "Get ready for laughter and creativity in 'What's That Meme?' - an AI-powered game where players generate hilarious memes using personalized contexts. Vote for your favorite meme to crown the champion of comedy!",
  icons: {
    icon: "/icon-512x512.png",
    shortcut: "/icon-256x256.png",
    apple: "/icon-512x512.png",
  },
  themeColor: "#3B4FFE",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${RFDewi.className} bg-bgDark font-bold  text-textLight`}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
