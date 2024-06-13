import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Papersfinder",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
