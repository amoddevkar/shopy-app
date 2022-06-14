import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
axios.defaults.withCredentials = true;
export default function Forgotpassword({ type }) {
  let params = useParams();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorvalue, setErrorvalue] = useState(false);
  const [helperText, setHelperText] = useState("Password is matching");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "resetPassword") {
      try {
        const response = await axios.post(
          `api/v1/password/reset/${params.token}`,
          {
            password: newPassword,
            confirmPassword: confirmPassword,
          }
        );

        navigate("/products");
      } catch (error) {
        alert("incorect credentials");
      }
    } else {
      try {
        const response = await axios.post(
          "api/v1/forgotPassword",
          {
            email,
          }
        );
        enqueueSnackbar("Password reset link sent successfully, kindly check your email", {
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
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    }
  };
 
  const checkPassword = (e) => {
    if (e.target.value === newPassword) {
      setErrorvalue(false)
      setHelperText("Password is matching")
    } else {
     setErrorvalue(true)
     setHelperText("Password is not matching")
    }
    setConfirmPassword(e.target.value);
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
        {type === "forgotPassword" ? "Enter your Email" : "Reset Passeord Form"}
      </Typography>
      {type === "forgotPassword" && (
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
      )}

      {type === "resetPassword" && (
        <>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <TextField
            error={errorvalue}
            helperText={helperText}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={checkPassword}
          />
        </>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {type === "resetPassword" ? "Set Password" : "Send Email"}
      </Button>
    </Box>
  );
}
