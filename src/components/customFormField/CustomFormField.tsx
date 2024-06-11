import { Outlet } from "react-router-dom";
import React, { useState, ChangeEvent } from "react";
import "./CustomFormField.scss";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { classNames } from "../../utils";

type Props = {
  type?: string;
  label?: string;
  value?: string | undefined;
  className?: string;
  maxWidth?: string;
  minimal?: boolean;
  textAlignLeft?: boolean;
  width?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomFormField(props: Props) {
  return (
    <Box
      className={classNames(
        props.className!,
        " flex items-center p-2 ",
        props.minimal ? "bg-white pl-0 pb-4" : "bg-[var(--greyColor)]  pl-4"
      )}
      key={props.label}
      height={props.minimal ? "25px" : "40px"}
      width={props.width ? props.width : "100%"}
      maxWidth={props.maxWidth ? props.maxWidth : "263px"}
      sx={{
        borderBottom: props.minimal
          ? "1px solid var(--blackColor) !important"
          : "",
      }}
    >
      <TextField
        sx={{
          "input::placeholder": {
            opacity: "1 !important",
          },
          "& .MuiInputBase-input": {
            padding: "0px !important",
            paddingLeft: "16px !important",
            color: props.minimal ? "black !important" : "white !important",
            textAlign: props.minimal
              ? props.textAlignLeft
                ? "left"
                : "right"
              : "left",
          },
          "& .MuiInput-root::before ,.MuiInput-root::after": {
            borderWidth: "0px !important",
            borderLeft: "1px solid var(--blackColor) !important",
            borderLeftWidth: props.minimal ? "2px !important" : "1px",
          },
        }}
        value={props.value}
        placeholder={props.label}
        onChange={props.onChange}
        variant="standard"
        fullWidth
      />
    </Box>
  );
}
