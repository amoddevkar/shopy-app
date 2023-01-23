import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { Box, Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sorting from "./Sorting";
import { useSnackbar } from "notistack";
import Footer from "./Footer";
axios.defaults.withCredentials = true;
const Products = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  let params = useParams();
  let initialCategory = null;
  if (params.category) {
    initialCategory = params.category;
  }
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(initialCategory);
  const [gteRatings, setGteRatings] = useState(null);
  const [ltePrice, setLtePrice] = useState(null);
  const [gtePrice, setGtePrice] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    let url = `https://shopyapp.onrender.com/api/v1/products?page=${page}`;
    const getData = async (url) => {
      if (category) {
        url += `&category=${category}`;
      }
      if (gteRatings) {
        url += `&ratings[gte]=${gteRatings}`;
      }
      if (ltePrice) {
        url += `&price[lte]=${ltePrice}`;
      }
      if (gtePrice) {
        url += `&price[gte]=${gtePrice}`;
      }
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(url);
        await setData(response.data);
      } catch (error) {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        console.log(error);
        navigate("/login");
      }
    };
    getData(url);
  }, [page, gteRatings, gtePrice, ltePrice, category]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleGteRatingsChange = (e) => {
    setGteRatings(e.target.value);
  };
  const handleGtePriceChange = (e) => {
    setGtePrice(e.target.value);
  };

  const handleLtePriceChange = (e) => {
    setLtePrice(e.target.value);
  };

  const handleClear = () => {
    setCategory(null);
    setGteRatings(null);
    setGtePrice(null);
    setLtePrice(null);
  };

  return (
    data && (
      <>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: "80px",
          }}
        >
          <Sorting
            onCategoryChange={handleCategoryChange}
            category={category}
            onGteRatingsChange={handleGteRatingsChange}
            gteRatings={gteRatings}
            onGtePriceChange={handleGtePriceChange}
            onLtePriceChange={handleLtePriceChange}
            onClear={handleClear}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mx: "210px",
            width: "1000px",
          }}
        >
          {data.products.map((product, index) => {
            return (
              <ProductCard
                product={product}
                imgUrl={product.photos.map((photo) => {
                  return photo.secure_url;
                })}
                name={product.name}
                category={product.category}
                ratings={product.ratings}
                key={index}
                id={product._id}
              />
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Pagination
            count={data.pageCount}
            color="secondary"
            page={page}
            onChange={handleChange}
            sx={{ my: "10px" }}
          />
        </Box>
        <Footer></Footer>
      </>
    )
  );
};

export default Products;
