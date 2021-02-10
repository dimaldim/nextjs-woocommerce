import Error from 'next/error';
import { useRouter } from 'next/router';
import ProductPage from '../../components/ProductPage';
import { initializeGraphQL } from '../../lib/graphql-client';
import graphQLRequest from '../../lib/graphql-request';
import Head from 'next/head';
import { getProductBySlug, getProductsWithSlug } from '../../lib/queries';

function ProductPageContainer({ product }) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;
  if (!router.isFallback && !product?.slug) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <ProductPage {...product} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const client = initializeGraphQL();
  const getProduct = await graphQLRequest(client, getProductBySlug, {
    variables: {
      slug: params.slug,
    },
  });
  const {
    data: { product = {} },
  } = getProduct;
  // Parse the price
  if (product?.price) {
    product.price = parseInt(product.price.substring(1));
  }
  //
  console.log(product);
  return {
    props: { product },
  };
}

export async function getStaticPaths() {
  const client = initializeGraphQL();

  const paths = await graphQLRequest(client, getProductsWithSlug, {});

  const {
    data: {
      products: { nodes = [] },
    },
  } = paths;

  return {
    paths: nodes.map((node) => ({ params: { slug: node.slug } })) || [],
    fallback: true,
  };
}

export default ProductPageContainer;
