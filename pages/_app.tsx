import localFont from 'next/font/local';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import styled from 'styled-components';

const bigNoodle = localFont({ src: '../fonts/big_noodle_titling_oblique.ttf' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Main className={bigNoodle.className}>
      <Component {...pageProps} />
    </Main>
  );
}

const Main = styled.main`
  margin: 50px;
  box-sizing: border-box;
`;
