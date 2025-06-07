import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: 'Banking System',
  description: 'Manage your accounts and branches efficiently.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
