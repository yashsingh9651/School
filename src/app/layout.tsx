import "./globals.css";
import { Roboto } from "next/font/google";
import Navbar from "../components/Navbar";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "XYZ School",
  description: "Everything About Us is now on your",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
