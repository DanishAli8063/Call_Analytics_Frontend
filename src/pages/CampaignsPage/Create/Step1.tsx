import React, { useState, useEffect, MouseEventHandler } from "react";
import {
    Box,
    Button,
    FormControl,
    selectClasses,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  
  import theme from "../../../styles/theme";
  import CustomFormField from "../../../components/customFormField/CustomFormField";
  import ChevronDown from "../../../components/icons/chevronDown";
import DynamicDropdownMenu from "../../../components/dynamicDropdown/DynamicDropdown";
import { CountryDropdown } from "../../../components/dynamicDropdown/CountryDropdown";

  type Props = {
    handleNext: MouseEventHandler<HTMLButtonElement>
  }

function Step1({handleNext}: Props): JSX.Element {



  return (
    <Box className="px-6 py-7">
    <Typography
      className="headline-medium"
      marginBottom="16px"
      color={theme.palette.primary.main}
    >
      Create Campaign
    </Typography>
    <Typography className="body-large" color="var(--blackColor)">
      Fine-Tune Your Call Routing Strategy with Versatile Campaign
      Settings
    </Typography>
    <Box height="96px" />
    <Box className="flex justify-center">
      <div className="grid gap-4 grid-cols-10 w-full max-w-2xl">
        <div className="flex justify-end items-center col-span-3">
          <Typography className="title-small" color="var(--blackColor)">
            Campaign name*
          </Typography>
        </div>
        <div className="col-span-1" />
        <CustomFormField className="col-span-6" label="IDRAK AI" />

        <div className="flex justify-end items-center col-span-3">
          <Typography className="title-small" color="var(--blackColor)">
            Campaign*
          </Typography>
        </div>
        <div className="col-span-1" />
        <CountryDropdown className="col-span-6" />
        <div className="col-span-10 h-[48px]" />
        <div className="col-span-4" />
        <div className="flex col-span-6 justify-start">
          <Button
            variant="outlined"
            className="title-medium"
            sx={{
              padding: "8.5px 16px",
              textTransform: "none",
              width: "100%",
              maxWidth: "150px",
              border: "1px solid var(--blackColor)",
              color: "var(--blackColor)",
              borderRadius: "5px",
              marginRight: '16px',
              "&:hover": {
                color: "var(--redColor)",
                borderColor: "var(--redColor)",
              },
            }}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            className="title-medium"
            sx={{
              padding: "8.5px 16px",
              textTransform: "none",
              width: "100%",
              maxWidth: "150px",
              color: "#fff",
              borderRadius: "5px",
              boxShadow: "unset !important",
            }}
            onClick={handleNext}
          >
            Create
          </Button>
        </div>
      </div>
    </Box>
  </Box>
  );
}

export default Step1;
