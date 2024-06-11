import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  Grid,
  InputBase,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import theme from "../../styles/theme";
import googleIcon from "../../assets/img/icons/google.svg";

import facebookIcon from "../../assets/img/icons/facebook.svg";
import infinity from "../../assets/img/icons/infinity.svg";

import "./SignupScreen.scss";
import CustomTextField from "../../components/customTextField/CustomTextField";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../components/modal/Modal";
import TickIcon from "../../components/icons/tickIcon";

function SignupScreen(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [remember, setRemember] = useState<boolean>(true);

  const [openVerifyModal, setOpenVerifyModal] = useState<boolean>(false);

  const timeZones = [
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
    "(UTC-05:00) Eastern Time (US & Canada)",
  ];

  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    padding: "5% 10%",
    transform: "translate(-50%, -50%)",
    width: 780,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: Dispatch<SetStateAction<string>>
  ) => {
    setFieldValue(event.target.value);
  };

  return (
    <>
      <Box
        className="signup"
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "26px 24px",
          width: "-webkit-fill-available",
          height: "100%",
          flexGrow: 1,
          backgroundColor: "#FFF",
        }}
      >
        <div className="right">
          <div className="inner">
            <Typography
              variant="h1"
              fontFamily="Roboto"
              fontWeight="400"
              fontSize="45px"
              textAlign="center"
              color="#fff"
            >
              Already have an account?
            </Typography>
            <Typography
              variant="h1"
              fontFamily="Roboto"
              fontWeight="400"
              fontSize="24px"
              lineHeight="32px"
              textAlign="center"
              color="#fff"
            >
              To keep connected with us please login with your personal info
            </Typography>
            <Button
              variant="contained"
              disableElevation
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#fff",
                mt: "10px",
                p: "10px 30px",
                fontSize: "16px",
                fontWeight: "16px",
                color: "#000 !important",
                transition: "opacity 0.3s",
                width: "212px",
                height: "40px",
                ":hover": {
                  opacity: 0.7,
                  backgroundColor: "white",
                },
              }}
              className="mr-10px"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
            <img src={infinity} />
          </div>
        </div>
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
              Create Account
            </Typography>
            <Box className="socials">
              <div className="icon">
                <img src={googleIcon} width="34px"></img>
              </div>
              <div className="icon">
                <img src={facebookIcon} width="34px"></img>
              </div>
            </Box>
            <Typography
              variant="h1"
              fontFamily="Roboto"
              fontWeight="400"
              fontSize="28px"
              textAlign="center"
              color={theme.palette.text.secondary}
              className="mx-6"
            >
              or use your email for registration
            </Typography>
            <CustomTextField
              label="Name"
              type="text"
              onChange={(event) => handleInputChange(event, setEmail)}
              value={email}
            />{" "}
            <CustomTextField
              label="Email"
              type="email"
              onChange={(event) => handleInputChange(event, setEmail)}
              value={email}
            />{" "}
            <CustomTextField
              label="Company Name"
              type="text"
              onChange={(event) => handleInputChange(event, setEmail)}
              value={email}
            />{" "}
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <Typography
                variant="h1"
                fontFamily="Roboto"
                fontWeight="500"
                fontSize="14px"
                textAlign="left"
                color={theme.palette.text.primary}
                className="mx-6"
              >
                Time Zone
              </Typography>
              <Select
                // value={age}
                // onChange={handleChange}
                sx={{
                  "& .MuiSelect-standard": {
                    borderBottomWidth: "1.1px",
                    borderBottomColor: "#010101",
                  },
                  "& .MuiSelect-standard:before": {
                    borderBottomWidth: "1.1px",
                    borderBottomColor: "#010101",
                  },
                  "& .MuiSelect-standard:after": {
                    borderBottomWidth: "1.1px",
                    borderBottomColor: "primary",
                  },
                  "& .MuiInput-base:focused": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                {timeZones.map((zone, i) => (
                  <MenuItem key={i} value={zone}>{zone}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <CustomTextField
              label="Password"
              type="password"
              onChange={(event) => handleInputChange(event, setPassword)}
              value={password}
            />
            <Box sx={{ width: "100%" }}>
              <Button
                disableElevation
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => setOpenVerifyModal(true)}
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
                Sign up
              </Button>
            </Box>
          </div>
        </div>
      </Box>
      <CustomModal
        openVerifyModal={openVerifyModal}
        setOpenVerifyModal={setOpenVerifyModal}
      >
        <TickIcon width="40" height="29" color="#16CF16" />
        <Typography
          variant="h1"
          fontFamily="Roboto"
          fontWeight="400"
          fontSize="28px"
          textAlign="center"
          color={theme.palette.primary.main}
          sx={{
            marginTop: '22px !important'
          }}
          className="mx-6"
        >
          Confirmation Email Sent!
        </Typography>
        <Typography
          variant="h1"
          fontFamily="Roboto"
          fontWeight="400"
          fontSize="16px"
          lineHeight="24px"
          marginY="22px"
          textAlign="center"
          color={theme.palette.text.primary}
        >
          Thank you for choosing our call tracking software. We've sent a
          confirmation email to your registered address. Please check your inbox
          and follow the instructions to complete the verification process.{" "}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          sx={{
            mb: 1,
            color: "#fff !important",
            backgroundColor: theme.palette.secondary.main,
            fontFamily: "Roboto",
            fontWeight: "500",
            fontSize: "16px",
            textTransform: "none",
            width: "200px",
            height: "40px",
            transition: "opacity 0.3s",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              opacity: 0.8,
            },
          }}
          size="large"
        >
          Continue
        </Button>
      </CustomModal>
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openVerifyModal}
        onClose={() => setOpenVerifyModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <Box
            component="img"
            onClick={() => setOpenVerifyModal(false)}
            sx={{
              position: "absolute",
              top: 15,
              right: 15,
              height: 20,
              width: 20,
            }}
            src={crossIcon}
          />{" "}
          <Typography
            variant="h1"
            fontFamily="Roboto"
            fontWeight="400"
            fontSize="28px"
            textAlign="center"
            color={theme.palette.primary.main}
            className="mx-6"
          >
            Confirmation Email Sent!
          </Typography>
          <Typography
            variant="h1"
            fontFamily="Roboto"
            fontWeight="400"
            fontSize="16px"
            lineHeight="24px"
            marginY="22px"
            textAlign="center"
            color={theme.palette.text.primary}
          >
            Thank you for choosing our call tracking software. We've sent a
            confirmation email to your registered address. Please check your
            inbox and follow the instructions to complete the verification
            process.{" "}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              mb: 1,
              color: "#fff !important",
              backgroundColor: theme.palette.secondary.main,
              fontFamily: "Roboto",
              fontWeight: "500",
              fontSize: "16px",
              textTransform: "none",
              width: "200px",
              height: "40px",
              transition: "opacity 0.3s",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                opacity: 0.8,
              },
            }}
            size="large"
          >
            Continue
          </Button>
        </Box>
      </Modal> */}
    </>
  );
}

export default SignupScreen;
