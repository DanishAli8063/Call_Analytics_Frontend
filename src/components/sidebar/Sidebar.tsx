import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import profilePic from "../../assets/img/profile-pic.png";
import theme from "../../styles/theme";
import NavList from "./NavList";
import './Sidebar.scss'

export default function Sidebar() {

  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "0px",
          minHeight: "100%",
          width: "100%",
        }}
      >
    
        <NavList />
      </Box>
    </>
  );
}
