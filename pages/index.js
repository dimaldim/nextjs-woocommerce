import graphQLRequest from '../lib/graphql-request';
import { initializeGraphQL } from '../lib/graphql-client';
import ProductList from '../components/ProductList';
import Head from 'next/head';
import { ALL_PRODUCTS_QUERY } from '../lib/queries';

export default function Home() {
  return (
    <>
      <Head>
        <title>NextJS with WooCommerce API</title>
      </Head>
      <div className="my-8">
        <div className="mt-4">
          <ProductList />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const client = initializeGraphQL();

  await graphQLRequest(client, ALL_PRODUCTS_QUERY, {});

  return {
    props: {
      initialGraphQLState: client.cache.getInitialState(),
    },
    revalidate: 1,
  };
}
