// pages/_app.js
import '../styles/styles.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;