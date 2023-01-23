import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Rating,
  TextField,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { CartContext } from "../cart/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Navbar from "./Navbar";
import { useSnackbar } from "notistack";
import Footer from "./Footer";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  let params = useParams();
  const [product, setProduct] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState(null);
  const cartContext = useContext(CartContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `https://shopyapp.onrender.com/api/v1/product/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(res.data.product);
        setReviews(res.data.product.reviews);
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        navigate("/products");
      }
    };
    getProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "https://shopyapp.onrender.com/api/v1/review",
        {
          productId: product._id,
          comment: e.target[6].value,
          rating: userRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      enqueueSnackbar("review added successfully", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      const getProduct = async () => {
        try {
          const res = await axios.get(
            `https://shopyapp.onrender.com/api/v1/product/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setReviews(res.data.product.reviews);
        } catch (error) {
          console.log(error);
          enqueueSnackbar("Something went wrong", {
            variant: "error",
            autoHideDuration: 1000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          navigate("/products");
        }
      };
      getProduct();
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    product && (
      <Container component="main" maxWidth="md">
        <Navbar />
        <Box sx={{}} mt={10} mb={4}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-evenly",
              alignItems: "center",
              px: 8,
              py: 2,
            }}
          >
            <Box
              component="img"
              src={product.photos[0].secure_url}
              height={300}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                pl: 5,
                maxWidth: 500,
              }}
            >
              <Typography
                variant="overline"
                gutterBottom
                sx={{
                  my: 1,
                  bgcolor: "#E5E4E2",
                  width: "fit-content",
                  px: 1,
                  fontSize: 10,
                }}
              >
                {product.category}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: "inherit", fontWeight: "bold" }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ fontFamily: "inherit" }}
              >
                {" "}
                by {product.brand}
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  my: 1,
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
                value={Number(product.ratings)}
                readOnly
                sx={{ my: "10px" }}
              />
              <Typography
                variant="subtitle2"
                fontFamily={"inherit"}
                fontWeight={"bold"}
              >
                Product Details :{" "}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                gutterBottom
                sx={{ maxWidth: 300, wordWrap: "break-word" }}
              >
                {product.description}
              </Typography>

              <Button
                variant="contained"
                sx={{ mt: "20px" }}
                startIcon={<ShoppingCartIcon />}
                onClick={() => {
                  cartContext.addToCart(product);
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",

              height: "280px",
            }}
          >
            {reviews &&
              reviews
                .slice(0)
                .reverse()
                .map((review) => {
                  return (
                    <Paper sx={{ width: "450px", p: "20px", mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <AccountCircleIcon />{" "}
                        <Typography component="span" px={"10px"}>
                          {" "}
                          {review.name}
                        </Typography>
                      </Box>
                      <Rating
                        name="read-only"
                        size="small"
                        value={Number(review.rating)}
                        readOnly
                        sx={{ my: "10px", px: "20px" }}
                      />
                      <Typography sx={{ px: "25px" }}>
                        {review.comment}
                      </Typography>
                    </Paper>
                  );
                })}
          </Box>
          <Box>
            <Paper
              component="form"
              onSubmit={handleSubmit}
              sx={{ padding: "8px", width: "250px" }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  bgcolor: "lavender",
                  fontFamily: "inherit",
                  border: "solid 1px black",
                  borderRadius: "10%",
                  width: "fit-content",
                  p: 1,
                }}
              >
                Add review
              </Typography>
              <Rating
                name="simple-controlled"
                size="small"
                sx={{ py: 2 }}
                value={userRating}
                onChange={(event, newValue) => {
                  setUserRating(newValue);
                }}
              />{" "}
              <br />
              <TextField
                id="outlined-multiline-flexible"
                label="please say something....."
                multiline
                maxRows={8}
                fullWidth
                sx={{ mb: "8px" }}
              />
              <Button variant="contained" fullWidth type="submit">
                Submit review
              </Button>
            </Paper>
          </Box>
        </Box>
        <Footer></Footer>
      </Container>
    )
  );
};

export default ProductDetails;
