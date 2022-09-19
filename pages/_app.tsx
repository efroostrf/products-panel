import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { setupStore } from 'utils/store';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import 'styles/global.scss';

TimeAgo.addDefaultLocale(en);

const store = setupStore();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component { ...pageProps } />
    </Provider>
  )
}
