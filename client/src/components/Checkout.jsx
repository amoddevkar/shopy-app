import { useContext, useState, useEffect } from "react";
import { CartContext } from "../cart/CartContext";
import {
  Paper,
  Button,
  Typography,
  Grid,
  Container,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({});
  const amount = cartItems.reduce(
    (totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity,
    0
  );
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  const handleClick = async () => {
    try {
      const res = await axios.get("/api/v1/razorpaykey");
      var options = {
        key: res.data.razorpaykey,
        amount: "",
        name: "",
        description: "",
        order_id: "",
        handler: async function (response) {
          console.log(response);
          let values = {
            shippingInfo: {
              fullname: shippingInfo.fullname,
              phoneNo: shippingInfo.phoneNo,
              address: shippingInfo.address,
              state: shippingInfo.state,
              city: shippingInfo.city,
              postalCode: shippingInfo.postalCode,
              country: shippingInfo.country,
            },
            orderItems: cartItems.map((cartItem) => {
              return {
                name: cartItem.name,
                quantity: cartItem.quantity,
                image: cartItem.photos[0].secure_url,
                price: cartItem.price,
                product: cartItem._id,
              };
            }),
            paymentInfo: { id: response.razorpay_payment_id },
            taxAmount: 0,
            shippingAmount: 0,
            totalAmount: amount,
          };
          try {
            await axios.post("/api/v1/order/create", values);
            enqueueSnackbar("Order placed successfully!!", {
              variant: "success",
              autoHideDuration: 2000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
            navigate("/home");
          } catch (error) {
            enqueueSnackbar("Something went wrong", {
              variant: "error",
              autoHideDuration: 1000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
          }
        },
      };
      try {
        const res = await axios.post("/api/v1/capturerazorpay", {
          amount: amount * 100,
        });
        options.order_id = res.data.id;
        options.amount = res.data.amount;

        var rzp1 = new window.Razorpay(options);
        await rzp1.open();
      } catch (error) {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let info = {
      fullname: e.target.fullname.value,
      phoneNo: e.target.phoneNo.value,
      address: e.target.address.value,
      city: e.target.city.value,
      state: e.target.state.value,
      postalCode: e.target.postalCode.value,
      country: e.target.country.value,
    };

    setShippingInfo(info);
  };
  return (
    amount && (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontFamily: "inherit",
              bgcolor: "lightgreen",
            }}
          >
            Shipping address
          </Typography>
          <Grid component="form" container spacing={3} onSubmit={handleSubmit}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                color="success"
                id="fullname"
                name="fullname"
                label="Full name"
                fullWidth
                autoComplete="full-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="success"
                required
                id="phoneNo"
                name="phoneNo"
                label="Phone no"
                fullWidth
                autoComplete="phone-no"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                color="success"
                id="address"
                name="address"
                label="Address line"
                fullWidth
                autoComplete="shipping address-line"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                color="success"
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                color="success"
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                color="success"
                id="postalCode"
                name="postalCode"
                label="postalCode / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                color="success"
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ my: "10px", borderRadius: "0", boxShadow: "0" }}
                color="success"
              >
                Confirm
              </Button>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontFamily: "inherit",
              bgcolor: "lightgreen",
            }}
          >
            Order summary
          </Typography>

          {cartItems.map((orderItem) => (
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 1,
                marginRight: "10px",
                maxHeight: "90px",

                borderBottom: "solid 1px black",
                borderRadius: "0",
              }}
            >
              <Paper
                elevation={0}
                component="img"
                src={orderItem.photos[0].secure_url}
                height={90}
                sx={{ mr: "8px" }}
              />
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  minWidth: { md: "300px" },
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontFamily: "inherit" }}>
                  {orderItem.name}
                </Typography>
                <Typography
                  variant="button"
                  sx={{ fontFamily: "inherit", bgcolor: "lightgrey" }}
                >
                  Rs.{orderItem.price}/-
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: "inherit" }}>
                  product_id: {orderItem._id}
                </Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  height: "90px",
                  width: "90px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: "8px",
                }}
              >
                <Box component="h1">{orderItem.quantity}</Box>
              </Paper>
            </Paper>
          ))}

          <Typography
            gutterBottom
            fontWeight={"bold"}
            sx={{ fontFamily: "inherit", mt: "20px" }}
          >
            Tax Amount: Rs.0
          </Typography>
          <Typography
            gutterBottom
            fontWeight={"bold"}
            sx={{ fontFamily: "inherit" }}
          >
            Shipping Amount: Rs.0
          </Typography>
          <Typography
            gutterBottom
            fontWeight={"bold"}
            sx={{ fontFamily: "inherit", mb: "20px" }}
          >
            Total amount: Rs.{amount}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                fullWidth
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "inherit",
                  bgcolor: "lightgreen",
                }}
              >
                Shipping Information
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", fontFamily: "inherit" }}
                gutterBottom
              >
                Address: {shippingInfo.address}
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", fontFamily: "inherit" }}
                gutterBottom
              >
                Fullname: {shippingInfo.fullname}
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", fontFamily: "inherit" }}
                gutterBottom
              >
                Contact: {shippingInfo.phoneNo}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ my: "10px", borderRadius: "0", boxShadow: "0" }}
                onClick={handleClick}
                color="success"
              >
                Checkout
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    )
  );
}
