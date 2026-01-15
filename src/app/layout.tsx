import type { Metadata } from 'next';

import './../scss/style.scss';

// project imports
import ProviderWrapper from 'store/ProviderWrapper';

export const metadata: Metadata = {
  title: 'Radiant Research - Clinical Research Testing Lab - Bangalore',
  description:
    'Radiant Research is a Clinical Research Testing Lab in Bangalore, India. We provide a wide range of Clinical Research Services.'
};

// ==============================|| ROOT LAYOUT ||============================== //

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
