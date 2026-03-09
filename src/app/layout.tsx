import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  variable: '--font-mono',
  display:  'swap',
});

export const metadata: Metadata = {
  title:       'Cloud Metrics — Infrastructure Dashboard',
  description: 'Drill-down cluster / namespace / pod metrics with React Query and Framer Motion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
