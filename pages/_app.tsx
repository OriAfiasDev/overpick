import localFont from 'next/font/local';

const bigNoodle = localFont({ src: '../fonts/big_noodle_titling_oblique.ttf' });

import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={bigNoodle.className}>
      <Component {...pageProps} />
    </main>
  );
}
