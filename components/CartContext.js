import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);
  const [dataClient,setDataclient] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts,ls]);
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, [ls]);
  useEffect(() => {
    if (ls && ls.getItem('client')) {
      setDataclient(JSON.parse(ls.getItem('client')));
    }
  }, [ls]);
  function addClient(dataClient) {
    ls.setItem('client', JSON.stringify(dataClient));
  }
  function addProduct(productId) {
    setCartProducts(prev => [...prev,productId]);
  }
  function removeProduct(productId) {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value,index) => index !== pos);
      }
      return prev;
    });
  }
  function clearCart() {
    setCartProducts([]);
    ls.clear('cart')
  }
  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart,addClient,dataClient}}>
      {children}
    </CartContext.Provider>
  );
}