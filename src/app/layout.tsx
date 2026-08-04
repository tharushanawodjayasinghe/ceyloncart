import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'CeylonCart — Authentic Sri Lankan Products',
    template: '%s | CeylonCart',
  },
  description:
    'Shop authentic Sri Lankan products — premium teas, spices, handloom textiles, and traditional crafts. Delivered worldwide from the heart of Ceylon.',
  keywords: ['Sri Lanka', 'Ceylon', 'tea', 'spices', 'handloom', 'crafts', 'online shopping'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <CartProvider>
          {children}
          <Toaster richColors position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
