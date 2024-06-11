import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import "./UnauthenticatedRoot.scss";
import { Box, Typography } from "@mui/material";
import theme from "../../styles/theme";

export default function UnAuthenticatedRoot() {
  return (
    <>
      <Box
      className = 'UnAuthenticatedRoot'
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        }}
      >
        <header>
        <div className="column flex flex-col justify-center">
            <img width="165px" src={logo} />
          </div>
          <Typography
            variant="h1"
            fontFamily="Circle"
            fontWeight="700"
            fontSize="28px"
            textAlign="center"
            color={theme.palette.primary.main}
            className="mx-6"
          >
            {/* Track your calls like never before! */}
          </Typography>
        </header>

          <Outlet  />
        </Box>
    </>
  );
}
