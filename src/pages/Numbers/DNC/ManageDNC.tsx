import {
  Box,
  Typography,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import ReusableTable from "../../../components/basicTable/BasicTable";
import EditIcon from "../../../components/icons/edit";
import theme from "../../../styles/theme";
import SearchIcon from "../../../components/icons/search";
import DeleteIcon from "../../../components/icons/delete";
import DynamicTabs from "../../../components/dynamicTabs/DynamicTabs";
import { classNames } from "../../../utils";
import Individual from "./Individual";

function ManageDNC(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState("one");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabs = [
    { value: "one", label: "Individual" },
    { value: "two", label: "Bulk" },
    { value: "three", label: "DNC scrubbing" },
  ];

  const SearchField = ({ placeholder }) => {
    return (
      <TextField
        sx={{
          maxWidth: "255px",
          "input::placeholder": {
            // opacity: "1 !important",
          },
          input: {
            color: "#000",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "120%",
          },
          "& .MuiInputBase-input": {},
          "& .MuiInputBase-root": {
            borderRadius: "0px",
            border: "1px solid var(--blackColor) !important",
            padding: "2px 12px",
          },
          "& .MuiInput-root::before ,.MuiInput-root::after": {
            borderWidth: "0px !important",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="var(--redColor)" />
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
        variant="standard"
      />
    );
  };
  return (
    <>
      <Box className="px-6 py-7">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            className="headline-medium"
            marginBottom="34px"
            color={theme.palette.primary.main}
          >
            Manage DNC
          </Typography>
          <SearchField placeholder="Search Individual Numbers" />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <DynamicTabs
            tabs={tabs}
            height="40px"
            maxWidth="948px"
            className={classNames("w-full flex justify-center")}
            selectedTab={selectedTab}
            handleTabChange={handleTabChange}
          />
        </Box>
        <Box height="76px" />
        {selectedTab == "one" ? <Individual /> : <>slkslkd</>}{" "}
      </Box>
    </>
  );
}

export default ManageDNC;
