import { createContext, useContext, useEffect, useState } from 'react';
import toast from '../Toast';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [cart, setCart] = useState([]);

  const getCartProductsCount = () => {
    return cart.length;
  };

  const getCartData = () => {
    const cartData = localStorage.getItem('cart-data');

    return null !== cartData ? JSON.parse(cartData) : [];
  };

  const saveCartData = () => {
    console.log('Saving cart to local storage', cart);
    localStorage.setItem('cart-data', JSON.stringify(cart));
  };

  const addToCart = (payload) => {
    if (!payload) return;

    const productExistInCart = cart.find((product) => product.id === payload.id);
    const productIndexInCart = cart.indexOf(productExistInCart);
    if (-1 !== productIndexInCart) {
      cart[productIndexInCart].qty += payload.qty;
      setCart((cart) => [...cart]);
      toast({ type: 'success', message: 'Product quantity in the cart has been updated!' });
      return;
    }

    setCart((cart) => [...cart, payload]);
    toast({ type: 'success', message: 'Product added to the cart!' });
  };

  useEffect(() => {
    if (process.browser) {
      setCart(getCartData());
    }
  }, []);

  useEffect(() => {
    saveCartData();
  }, [cart]);

  return (
    <AppContext.Provider value={{ cart, getCartProductsCount, addToCart }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
