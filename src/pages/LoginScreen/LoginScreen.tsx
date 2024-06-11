import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import theme from "../../styles/theme";
import "./LoginScreen.scss";
import CustomTextField from "../../components/customTextField/CustomTextField";
import { useNavigate } from "react-router-dom";
const { server_address } = require('../../ConfigAddress');
function LoginScreen(): JSX.Element {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setValue: Function
  ) => {
    setValue(event.target.value);
  };
  const [loginStatus, setLoginStatus] = useState(false);


  const handleLogin = async () => {
    try {
      const requestBody = {
        grant_type: "password", // Since the grant type is password
        username, // User provided username, e.g., "danish@gmail.com"
        password, // User provided password, e.g., "Cybercity1"
        scope: "", // If your API requires a scope, specify it here
        client_id: "", // Specify if required
        client_secret: "", // Specify if required
      };
  
      const response = await fetch(server_address +"/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Content type for OAuth 2.0 should be x-www-form-urlencoded
        },
        body: new URLSearchParams(requestBody).toString(), // Convert the request body object to URL-encoded string
      });
  
      const data = await response.json(); // Always try to parse JSON to access the response
  
      if (response.ok) {
        if (data.access_token) {
          
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("userId", data.user_id); // Adjust based on actual response
            localStorage.setItem('isLoggedIn', 'true');
         

      
          setLoginStatus(true);
          navigate("/");
          window.location.reload();
        } else {
          setError("Unexpected error. Please try again later.");
        }
      } else if (response.status === 401) {
        setError("Unauthorized access. Please check your credentials.");
      } else if (response.status === 422) {
        setError(data.message || "Validation error. Please check your input.");
      } else {
        setError("An error occurred during login. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    }
  };
  
  
  


  
  return (
    <Box
      className="login"
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "26px 24px",
        width: "-webkit-fill-available",
        height: "100%",
        flexGrow: 1,
        backgroundColor: "white",
      }}
    >
      <div className="left">
        <div className="inner">
          <Typography
            variant="h1"
            fontFamily="Roboto"
            fontWeight="400"
            fontSize="45px"
            textAlign="center"
            color={theme.palette.primary.main}
            className="mx-6"
          >
            Login
          </Typography>
    
          <CustomTextField
            label="Username"
            type="text"
            onChange={(event) => handleInputChange(event, setUsername)}
            value={username}
          />
          <CustomTextField
            label="Password"
            type="password"
            onChange={(event) => handleInputChange(event, setPassword)}
            value={password}
          />
    
          {error && <Typography color="error">{error}</Typography>}
    
          <Box sx={{ width: "100%" }}>
            <Button
              onClick={handleLogin}
              fullWidth
              variant="contained"
              disableElevation
              sx={{
                mb: 1,
                color: "#fff !important",
                fontFamily: "Roboto",
                fontWeight: "400",
                fontSize: "24px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#AF1C23",
                },
              }}
              size="large"
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </Box>
  );
}

export default LoginScreen;