import { useQuery } from 'graphql-hooks';
import { ALL_PRODUCTS_QUERY } from '../lib/queries';
import ProductCard from './ProductCard';

export default function PostList() {
  const { loading, error, data, refetch } = useQuery(ALL_PRODUCTS_QUERY, {});

  if (error) return <div>Error!</div>;
  if (!data) return <div>Loading</div>;

  const {
    products: { nodes: products = [] },
  } = data;

  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-2xl font-medium">Recent products</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {!loading && products.map((product) => <ProductCard key={product.id} {...product} />)}
      </div>
    </div>
  );
}
