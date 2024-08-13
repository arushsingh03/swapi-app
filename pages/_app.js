import { Chakra } from '../lib/chakra';

function MyApp({ Component, pageProps }) {
  return (
    <Chakra>
      <Component {...pageProps} />
    </Chakra>
  );
}

export default MyApp;
