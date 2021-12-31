import '../sass/main.scss';
import 'prism-themes/themes/prism-vsc-dark-plus.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as gtag from '../lib/gtag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
