import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Footer from "./Footer";
export default function Profile() {
  const [orders, setOrders] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    async function getOrders() {
      try {
        const res = await axios.get("/api/v1/myorder");
        setOrders(res.data.order);
      } catch (error) {
        enqueueSnackbar("You don't have orders yet !!", {
          variant: "info",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        navigate("/home");
      }
    }
    getOrders();
  }, []);
  return (
    orders && (
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
            ml: "293px",
          }}
        >
          Your orders
        </Box>
        <Box
          justifyContent={"center"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          {orders.map((order) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-evenly",
                  maxWidth: { xs: "100%", md: "fit-content" },
                  mb: "10px",
                }}
              >
                <Box>
                  {order.orderItems.map((orderItem) => {
                    return (
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
                          src={orderItem.image}
                          height={90}
                          sx={{ mr: "8px" }}
                        />
                        <Paper
                          elevation={0}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: "bold", fontFamily: "inherit" }}
                          >
                            {orderItem.name}
                          </Typography>
                          <Typography
                            variant="button"
                            sx={{ fontFamily: "inherit", bgcolor: "lightgrey" }}
                          >
                            Rs.{orderItem.price}/-
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ fontFamily: "inherit" }}
                          >
                            product_id: {orderItem.product}
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
                    );
                  })}{" "}
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    maxWidth: "310px",
                    minWidth: { md: "310px" },
                    borderBottom: "solid 1px black",
                    borderRadius: "0",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "inherit", fontWeight: "bold" }}
                  >
                    Shipping Info
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
                    Name: {order.shippingInfo.fullname}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
                    Contact: {order.shippingInfo.phoneNo}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "inherit", lineBreak: "anywhere" }}
                  >
                    Address: {order.shippingInfo.address}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
                    City: {order.shippingInfo.city}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
                    PIN: {order.shippingInfo.postalCode}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
                    State: {order.shippingInfo.state}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
                    Country: {order.shippingInfo.country}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "inherit", fontWeight: "bold" }}
                  >
                    Payment Info
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
                    ID: {order.paymentInfo.id}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
                    Tax amount: Rs. {order.taxAmount}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
                    Shipping amount: Rs. {order.shippingAmount}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "inherit", bgcolor: "#ffe5b4" }}
                  >
                    Total amount: Rs. {order.totalAmount}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
                    Order status: {order.orderStatus}
                  </Typography>
                  <Typography></Typography>
                </Paper>
              </Box>
            );
          })}
        </Box>
        <Footer></Footer>
      </>
    )
  );
}
