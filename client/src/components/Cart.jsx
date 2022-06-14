import { Box, Button, Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import React, { useState, useEffect,useContext  } from "react";
import Navbar from "./Navbar";
import CartItem from "./CartItem";
import { CartContext } from "../cart/CartContext";
import { Link } from "react-router-dom";
import Footer from './Footer';

export default function Cart() {
  
  const { cartItems, removeItem } = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    function calculateCartTatal() {
      const total = cartItems.reduce(
        (totalPrice, cartItem) =>
          totalPrice + cartItem.price * cartItem.quantity,
        0
      );
      const qty = cartItems.reduce(
        (totalQuantity, cartItem) => totalQuantity + cartItem.quantity,
        0
      );
      setCartTotal(total);
      setCartQuantity(qty);
    }
    calculateCartTatal();
  }, [cartItems]);

  return (
    <>
      <Navbar />
      <Box
        component="h2"
        sx={{
          bgcolor: "#ffc14d",
          width: "800px",
          mt: 12,
          mb: 2,
          textAlign: "center",
          padding: "5px",
          ml: { xs: "0px", md: "293px" },
        }}
      >
        Your Shopping Cart
      </Box>
      <Box
        sx={{
          mx: "20px",

          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {cartItems.map((cartItem) => {
            return (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <CartItem product={cartItem} />
                <Button
                  size="small"
                  onClick={() => {
                    removeItem(cartItem);
                  }}
                  sx={{ color: "black", bgcolor: "white" }}
                >
                  <RemoveShoppingCartIcon />
                </Button>
              </Box>
            );
          })}
        </Box>
        <Box sx={{}}>
          <Typography
            gutterBottom
            variant={"h5"}
            sx={{ fontFamily: "inherit", fontWeight: "bold" }}
          >
            Cart Details
          </Typography>
          <Typography
            gutterBottom
            variant={"h6"}
            sx={{ fontFamily: "inherit" }}
          >
            Total items: {cartQuantity}
          </Typography>
          <Typography
            gutterBottom
            variant={"h6"}
            sx={{ fontFamily: "inherit" }}
          >
            Total amount: Rs.{cartTotal}
          </Typography>

          <Link
            to="/checkout"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button variant="contained"> Checkout</Button>
          </Link>
        </Box>
      </Box>
      <Footer></Footer>
    </>
  );
}
