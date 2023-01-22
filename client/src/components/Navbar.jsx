import {
  AppBar,
  TextField,
  InputAdornment,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import axios from "axios";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await axios.get("/api/v1/logout");

      await enqueueSnackbar("logout", {
        variant: "success",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      await localStorage.clear();
      navigate("/login");
    } catch (error) {
      await enqueueSnackbar("something went wrong", {
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <AppBar
      sx={{
        position: "fixed",
        top: 0,
        mx: { md: "210px", xs: "opx" },
        height: "fit-content",
        width: "70%",
        bgcolor: "green",
        boxShadow: 0,
        display: "flex",
        flexDirection: "row",
        padding: "8px 10px",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <TextField
        color="success"
        sx={{ width: "10%", bgcolor: "palegreen" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon></SearchIcon>
            </InputAdornment>
          ),
        }}
        variant="standard"
      />

      <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
        <Typography
          variant="h5"
          sx={{
            borderRadius: "10%",
            fontFamily: "inherit",
            border: "solid 1px white",
            p: 1,
          }}
        >
          ShopyApp
        </Typography>
      </Link>

      <Box>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <AccountCircleIcon
                {...bindTrigger(popupState)}
                sx={{ padding: "0 12px" }}
              />
              <Menu {...bindMenu(popupState)}>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={popupState.close}>Profile</MenuItem>
                </Link>
                <Link
                  to="/myorders"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={popupState.close}>My orders</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
        <Link to="/cart" style={{ color: "white" }}>
          <ShoppingCartIcon sx={{ padding: "0 12px" }} />
        </Link>
      </Box>
    </AppBar>
  );
};

export default Navbar;
