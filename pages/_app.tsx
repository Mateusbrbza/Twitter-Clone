import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';
import '@/styles/globals.css';
import LoginModal from '@/components/modals/LoginModal';
import Modal from '@/components/Modal';
import RegisterModal from '@/components/modals/RegisterModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <RegisterModal />
    <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
