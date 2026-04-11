import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'מכללת גלגלים — תרגול',
  description: 'מערכת תרגול שאלות למוביל מקצועי',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      {/*
        Desktop: outer bg is soft teal-gray; inner 440px column is the "phone".
        Mobile: full screen, no decoration.
      */}
      <body className="bg-[#F6FAF9]">
        {children}
      </body>
    </html>
  );
}
