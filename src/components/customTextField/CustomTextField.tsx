import { Outlet } from "react-router-dom";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import logo from "../../assets/img/logo.png";
import "./CustomTextField.scss";
import {
  Box,
  FilledInputProps,
  IconButton,
  InputAdornment,
  InputProps,
  OutlinedInputProps,
  SvgIcon,
  TextField,
  Typography,
  makeStyles,
  withStyles,
} from "@mui/material";
import theme from "../../styles/theme";
import eyeIcon from "../../assets/img/icons/eye.svg";
import closedEyeIcon from "../../assets/img/icons/closed-eye.svg";
import { classNames } from "../../utils";

type Props = {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  maxWidth?: string;
  className?: string;
  placeholderColor?: string;
  simple?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomTextField(props: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputAdorment: JSX.Element = (
    <InputAdornment position="end">
      <IconButton
        onClick={handleTogglePassword}
        disableRipple
        onMouseDown={(e) => e.preventDefault()}
        edge="end"
      >
        {/* {showPassword ? ( */}
        <img
          className={`password-icon ${showPassword ? "show" : "hide"}`}
          src={eyeIcon}
        />
        {/* ) : ( */}
        <img
          className={`password-icon ${showPassword ? "hide" : "show"}`}
          src={closedEyeIcon}
        />
        {/* )} */}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box
      className={classNames(props.className!)}
      width="100%"
      maxWidth={props.maxWidth}
    >
      <Typography
        variant="h1"
        fontFamily="Roboto"
        fontWeight="500"
        fontSize="14px"
        textAlign="left"
        color={theme.palette.text.primary}
        className="mx-6"
      >
        {props.label}
      </Typography>
      <TextField
        sx={{
          "& .MuiInput-underline:before": {
            borderBottomWidth: "1.1px",
            borderBottomColor: "#010101",
          },
          "& .MuiInput-underline:after": {
            borderBottomWidth: "1.1px",
            borderBottomColor: props.simple ? "#000" : "primary",
          },
          "input::placeholder": {
            opacity: "1 !important",
            color: props.placeholderColor ? props.placeholderColor : "#000",
            fontSize: "16px",
          },
        }}
        value={props.value}
        placeholder={props.placeholder ? props.placeholder : ""}
        type={
          props.type == "password"
            ? showPassword
              ? "text"
              : "password"
            : "text"
        }
        onChange={props.onChange}
        variant="standard"
        InputProps={{
          endAdornment: props.type == "password" && passwordInputAdorment,
        }}
        fullWidth
      />
    </Box>
  );
}
