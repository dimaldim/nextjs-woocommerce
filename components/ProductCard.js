import Link from 'next/link';
import { useAppContext } from './context/AppContext';
import Image from 'next/image';

function ProductCard({ id, slug, image, name, price }) {
  const appContext = useAppContext();
  const { addToCart } = appContext;
  const handleAddToCard = (e) => {
    e.preventDefault();
    addToCart({
      id,
      name,
      image,
      price,
      qty: 1,
    });
  };

  if (price) {
    price = parseInt(price.substring(1));
  }

  return (
    <Link href={`/product/${slug}`}>
      <a className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
        <div
          className="flex items-end"
        >
                    <div className="w-full">
                      <div className="image-container">
                        <Image src={image.sourceUrl} layout="fill" className="image" />
                      </div>
                    </div>
          <button
            className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            onClick={handleAddToCard}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-3">
          <h3 className="text-gray-700 uppercase">{name}</h3>
          <span className="text-gray-500 mt-2">${price}</span>
        </div>
      </a>
    </Link>
  );
}

export default ProductCard;
