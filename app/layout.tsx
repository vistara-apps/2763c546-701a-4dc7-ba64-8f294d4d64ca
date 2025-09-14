import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'AuraListen - Your AI Audio Guide to Niche Products',
  description: 'A personalized audio shopping assistant for niche markets, enhancing recommendations and brand stories through voice.',
  openGraph: {
    title: 'AuraListen',
    description: 'Your AI audio guide to niche products',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuraListen',
    description: 'Your AI audio guide to niche products',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
