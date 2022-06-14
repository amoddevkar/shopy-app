import { Box, Paper, Button, Typography, Grid } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (<>
    <Box>
      <Navbar />
      <Box mt={10} sx={{ position: "relative" }}>
        <Box
          component="img"
          src={
            "https://res.cloudinary.com/dx8vcdcye/image/upload/v1645280205/assets/t-shirts-category-banner-1920-1920x350_rhk7at.webp"
          }
          width={"100%"}
          sizes={"375px,800px"}
          height={"250px"}
        ></Box>
        <Link to={"/products"}>
          <Button
            variant="contained"
            color="success"
            sx={{
              fontFamily: "inherit",
              position: "absolute",
              top: "32vh",
              left: "98vh",
            }}
          >
            Shop now
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          mx: "20px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Paper sx={{ padding: "10px", bgcolor: "#00c8ff" }}>
          <Box
            sx={{
              backgroundImage: `url(${"https://res.cloudinary.com/dx8vcdcye/image/upload/v1645280493/assets/full-sleeve-t-shirts-india-2_ha7ivr.webp"})`,
              height: "300px",
              width: "250px",
              backgroundSize: "38vh 37vh",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Link
              to={"/products/longsleeves"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{
                  top: "257px",
                  left: "44px",
                  fontFamily: "inherit",
                  bgcolor: "red",
                }}
                startIcon={<LocalMallIcon />}
              >
                Long Sleeves
              </Button>
            </Link>
          </Box>
        </Paper>
        <Paper sx={{ padding: "10px", bgcolor: "#f00044" }}>
          <Box
            sx={{
              backgroundImage: `url(${"https://res.cloudinary.com/dx8vcdcye/image/upload/v1645280560/assets/featured-category-t-shirts_n4npg4.webp"})`,
              height: "300px",
              width: "250px",
              backgroundSize: "38vh 37vh",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Link
              to={"/products/shortsleeves"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{
                  top: "257px",
                  left: "41px",
                  fontFamily: "inherit",
                  bgcolor: "#00bbff",
                  color: "black",
                }}
                startIcon={<LocalMallIcon />}
              >
                Short Sleeves
              </Button>
            </Link>
          </Box>
        </Paper>
        <Paper sx={{ padding: "10px", bgcolor: "#00c8ff" }}>
          <Box
            sx={{
              backgroundImage: `url(${"https://res.cloudinary.com/dx8vcdcye/image/upload/v1645280608/assets/featured-category-hoodies_liqunh.webp"})`,
              height: "300px",
              width: "250px",
              backgroundSize: "38vh 37vh",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Link
              to={"/products/hoodies"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{
                  top: "257px",
                  left: "63px",
                  fontFamily: "inherit",
                  bgcolor: "red",
                }}
                startIcon={<LocalMallIcon />}
              >
                Hoodies
              </Button>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Box>
    <Footer /></>
  );
};

export default Home;
