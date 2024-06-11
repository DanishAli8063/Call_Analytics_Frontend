import { Box, Typography } from "@mui/material";
import React from "react";
import { SingleSelect } from "./DynamicDropdown";


const options = [
    {
      value: "UAE",
      component: OptionComponent({countryName: "UAE", symbol : "ae"}),
    },
    {
      value: "USA",
      component: OptionComponent({countryName: "USA", symbol : "us"}),
    },
    {
      value: "China",
      component: OptionComponent({countryName: "China", symbol : "cn"}),
    },
  ];

  function OptionComponent({countryName, symbol}) {
    return (
      <Box display="flex" justifyContent="space-between" width="100%">
      <Typography className="title-medium" color="var(--blackColor)">
        {countryName}
      </Typography>
      <img
        src={`https://flagcdn.com/16x12/${symbol.toLowerCase()}.png`}
        className="object-contain"
        alt={countryName}
      />
    </Box>    );
  }
  
  export function CountryDropdown({className}) {
    return (
      <SingleSelect className={className} label="Country" options={options} />
    );
  }