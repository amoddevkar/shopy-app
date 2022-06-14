import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,Box
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../cart/CartContext";

const ProductCard = ({ imgUrl, name, category, ratings, id, product }) => {
  const cartContext = useContext(CartContext);

  return (
    <Card sx={{ maxWidth: 220, margin: "20px", boxShadow:"0"}}>
      <CardMedia
        component="img"
        height="200"
        src={imgUrl}
        alt="image"
      ></CardMedia>
      <CardContent sx={{ height: 120 }}>
        <Typography sx={{ fontWeight: "bold", fontFamily: "inherit" }}>
          {product.name}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontFamily: "inherit" }}
        >
          by {product.brand}
        </Typography>
        <Typography
          variant="overline"
          gutterBottom
          sx={{
            bgcolor: "#E5E4E2",
            width: "fit-content",
            p: 1,
            fontSize: 10,
          }}
        >
          {product.category}
        </Typography>
        <Typography
          gutterBottom
          sx={{
            color: "white",
            fontFamily: "inherit",
            bgcolor: "darkorange",
            width: "fit-content",
            px: 2,
          }}
        >
          Rs. {product.price} /-
        </Typography>
        <Rating
          name="read-only"
          size="small"
          value={ratings ? Number(ratings) : 3}
          readOnly
        />
      </CardContent>
      <Box sx={{ display: "flex", flexDirection: "column" ,bgcolor:"inherit"}}>
      <Link
            to={`/product/${id}`}
            style={{ textDecoration: "none", color: "white" }}
          > <Button
          variant="contained"
          size="small"
          startIcon={<InfoIcon />}
          fullWidth
          sx={{mb:1,borderRadius:"0",boxShadow:"0"}}
        >
          
            Details
          
        </Button></Link>
        <Button
          fullWidth
          variant="contained"
          size="small"
          onClick={() => {
            cartContext.addToCart(product);
          }}
          startIcon={<ShoppingCartIcon />}
         sx={{borderRadius:"0",boxShadow:"0"}}
        >
          Add to cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
