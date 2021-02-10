import '../styles/globals.css';
import { ClientContext } from 'graphql-hooks';
import { useGraphQLClient } from '../lib/graphql-client';
import Layout from '../components/Layout/Layout';
import { AppWrapper } from '../components/context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState);

  return (
    <ClientContext.Provider value={graphQLClient}>
      <AppWrapper>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
          />
        </Layout>
      </AppWrapper>
    </ClientContext.Provider>
  );
}
