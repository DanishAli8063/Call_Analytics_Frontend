import { Outlet } from "react-router-dom";
import React, { useState, ChangeEvent } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "../icons/info";

export default function CustomLabel({
  label,
  helperText = "",
  required = false,
}) {
  return (
    <>
      <Typography
        className="title-small"
        sx={{
          textAlign: "end",
          lineHeight: "22px !important",
        }}
        color="var(--blackColor)"
      >
        {label + (required ? "*" : "")}
      </Typography>
      {helperText != "" && (
        <Tooltip
          className="body-small"
          PopperProps={{
            sx: {
              borderRadius: "0px",
              "& .MuiTooltip-tooltip": {
                padding: "14px",
                borderRadius: "0px",
                maxWidth: "295px",
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
                backgroundColor: "var(--greyColor)",
              },
              "& .MuiTooltip-arrow ": {
                color: "var(--greyColor)",
              },
            },
          }}
          title={helperText}
          placement="right"
          arrow
        >
          <div className="pointer">
            <InfoIcon width="12" height="12" />
          </div>
        </Tooltip>
      )}
    </>
  );
}
