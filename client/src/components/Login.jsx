import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

import { useSnackbar } from "notistack";

export default function Login({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "signup") {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("photo", photo);
        const response = await axios({
          method: "post",
          url: "http://localhost:4000/api/v1/signup",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/home");
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
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        await console.log(response);
        navigate("/home");
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
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 20, mx: 70 }}
    >
      <Typography
        gutterBottom
        variant={"h5"}
        sx={{ fontFamily: "inherit", fontWeight: "bold" }}
      >
        {type === "signup" ? "Signup Form" : "Login Form"}
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {type === "signup" && (
        <>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Typography variant="caption" display="block">
            Add profile picture
          </Typography>
          <TextField
            name="photo"
            id="outlined-basic"
            variant="outlined"
            type="file"
            sx={{ my: "8px" }}
            fullWidth
            onChange={(e) => {
              console.log(e.target.files[0]);
              setPhoto(e.target.files[0]);
            }}
          />
        </>
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {type === "signup" ? "signup" : "login"}
      </Button>
      {type !== "signup" && (
        <>
          <Link to={"/forgotpassword"}>Forgot Password</Link>
          <br />
          <Link to={"/signup"}>{"Sign up"}</Link>
        </>
      )}
      {type === "signup" && (
        <Link to={"/login"}>{"Already registered? login here"}</Link>
      )}
    </Box>
  );
}
