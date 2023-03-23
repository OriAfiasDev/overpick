import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import styled from 'styled-components';
import '@/styles/globals.css';
import StatsContextProvider from '@/context/useStats';

const bigNoodle = localFont({ src: '../assets/fonts/big_noodle_titling_oblique.ttf' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Main className={bigNoodle.className}>
      <StatsContextProvider>
        <Component {...pageProps} />
      </StatsContextProvider>
    </Main>
  );
}

const Main = styled.main`
  margin: 50px;
  box-sizing: border-box;
  text-align: center;
`;
