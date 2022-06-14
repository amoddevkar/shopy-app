import { createContext, useState } from "react";
import { useSnackbar } from "notistack";
export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();

  let initialItems = new Array();

  if (!JSON.parse(localStorage.getItem("cartItems"))) {
    initialItems = [];
  } else {
    initialItems = JSON.parse(localStorage.getItem("cartItems"));
  }

  const [cartItems, setCartItems] = useState(initialItems);

  const handleAddToCart = (item) => {
    cartItems.push({ quantity: 1, ...item });
    enqueueSnackbar("Product Added to the Cart", {
      variant: "success",
      autoHideDuration: 1000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
    setCartItems(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleRemoveItem = (item) => {
    let filteredCartItems = cartItems.filter((i) => {
      return i !== item;
    });
    enqueueSnackbar("Product Removed from the cart the Cart", {
      variant: "info",
      autoHideDuration: 1000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
    setCartItems(filteredCartItems);
    localStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
  };

  const handleAddQuantity = (item) => {
    let newCartItems = cartItems.map((cItem) => {
      if (cItem === item) {
        cItem.quantity++;
        return cItem;
      } else {
        return cItem;
      }
    });

    setCartItems(newCartItems);

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };
  const handleRemoveQuantity = (item) => {
    let newCartItems = cartItems.map((cItem) => {
      if (cItem === item && cItem.quantity > 1) {
        cItem.quantity--;
        return cItem;
      } else {
        return cItem;
      }
    });

    setCartItems(newCartItems);

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart: handleAddToCart,
        removeItem: handleRemoveItem,
        addQuantity: handleAddQuantity,
        removeQuantity: handleRemoveQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
