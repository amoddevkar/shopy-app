import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Box, TextField, Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Navbar from "./Navbar";
import { useSnackbar } from "notistack";

axios.defaults.withCredentials = true;
export default function Profile() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState(null);
  async function getUser() {
    try {
      const res = await axios.get("/api/v1/userdashboard");
      setUser(res.data.user);
    } catch (error) {
      enqueueSnackbar("User not found", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/login");
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("email", e.target.email.value);
      formData.append("photo", e.target.photo.files[0]);
      const response = await axios({
        method: "post",
        url: "/api/v1/userdashboard/update",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await setUser(response.data.user);
      enqueueSnackbar("User info updated", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      enqueueSnackbar("Incorrect credentials", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
  return (
    user && (
      <>
        <Navbar />
        <Box mt={16} ml={62}>
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={user.photo.secure_url}
              />
              <CardContent>
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    defaultValue={user.name}
                    name="name"
                    sx={{ my: "8px" }}
                    fullWidth
                  />
                  <TextField
                    id="outlined-basic"
                    label="email"
                    type="email"
                    variant="outlined"
                    defaultValue={user.email}
                    name="email"
                    sx={{ my: "8px" }}
                    fullWidth
                  />
                  <Typography variant="caption" display="block">
                    Add new image
                  </Typography>
                  <TextField
                    name="photo"
                    id="outlined-basic"
                    variant="outlined"
                    type="file"
                    sx={{ my: "8px" }}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                  >
                    Update
                  </Button>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </>
    )
  );
}
