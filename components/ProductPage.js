import { useState } from 'react';
import Image from 'next/image';
import { useAppContext } from './context/AppContext';

function ProductPage(props) {
  const [count, setCount] = useState(1);
  const handleCount = (value) => (!(count === 0 && value === -1) ? setCount(count + value) : count);
  const { id, name, image, description, regularPrice, price } = props;
  const appContext = useAppContext();
  const { addToCart } = appContext;
  const handleAddToCard = (e) => {
    e.preventDefault();
    addToCart({
      id,
      name,
      image,
      price,
      qty: count,
    });
    setCount(1);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="md:flex md:items-center">
        <div className="w-full">
          <Image
            src={image.sourceUrl}
            sizes={image.srcSet}
            width={image?.mediaDetails?.width}
            height={image?.mediaDetails?.height}
            loading="eager"
            layout="responsive"
          />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 className="text-gray-700 uppercase text-lg">{name}</h3>
          <span className="text-gray-500 mt-3">${price}</span>
          <hr className="my-3" />
          <div className="mt-2">
            <label className="text-gray-700 text-sm" htmlFor="count">
              Quantity:
            </label>
            <div className="flex items-center mt-1">
              <button
                onClick={() => handleCount(1)}
                className="text-gray-500 focus:outline-none focus:text-gray-600"
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
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <span className="text-gray-700 text-lg mx-2">{count}</span>
              <button
                onClick={() => handleCount(-1)}
                className="text-gray-500 focus:outline-none focus:text-gray-600"
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
                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <button
              onClick={handleAddToCard}
              className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
            >
              Add to card
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 md:w-2/3">
        <h3 className="text-gray-600 text-2xl font-medium">Description</h3>
        <span dangerouslySetInnerHTML={{ __html: description }}></span>
      </div>
    </div>
  );
}

export default ProductPage;
