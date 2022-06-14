import React from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Paper, Typography, Box } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../cart/CartContext";
export default function CartItem({ product }) {
  const cartContext = useContext(CartContext);
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 1,
          marginRight: "10px",
          maxHeight: "90px",
          minWidth:{md:"400px"},
          borderBottom: "solid 1px black",
          borderRadius: "0",
        }}
      >
        <Paper
          elevation={0}
          component="img"
          src={product.photos[0].secure_url}
          height={90}
          sx={{ mr: "8px" }}
        />
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            minWidth:{md:"200px"},
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontFamily: "inherit" }}>
            {product.name}
          </Typography>
          <Typography
            variant="button"
            sx={{ fontFamily: "inherit", bgcolor: "lightgrey" }}
          >
            Rs.{product.price}/-
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: "inherit" }}>
            product_id: {product.brand}
          </Typography>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            height: "90px",
            width: "90px",
            display: "flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems: "center",
            ml: "8px",
          }}
        >
          <Box component="h1" sx={{flexGrow:"8"}}>{product.quantity || 2}</Box>
          <Box sx={{flexGrow:"2"}}><RemoveIcon onClick={()=>{cartContext.removeQuantity(product)}} /><AddIcon onClick={()=>{cartContext.addQuantity(product)}} /></Box> 
        </Paper>
      </Paper>
    </>
  );
}
