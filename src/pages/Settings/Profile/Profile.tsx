import React, { useState, useEffect, MouseEventHandler } from "react";
import { Box, Button, Typography, Tab, Tabs, Divider } from "@mui/material";

import theme from "../../../styles/theme";
import CustomFormField from "../../../components/customFormField/CustomFormField";
import CopyIcon from "../../../components/icons/copy";
import CustomNotification from "../../../components/notification/Notification";
import CustomSwitch from "../../../components/switch/Switch";
import CustomLabel from "../../../components/customLabel/CustomLabel";
import DynamicTabs from "../../../components/dynamicTabs/DynamicTabs";
import CustomTextField from "../../../components/customTextField/CustomTextField";
import profilePic from "../../../assets/img/profile-pic.png";
import EditPenIcon from "../../../components/icons/editPen";
import DeleteIcon from "../../../components/icons/delete";
import { SingleSelect } from "../../../components/dynamicDropdown/DynamicDropdown";

function ProfileSettings(): JSX.Element {
  const [showNotification, setShowNotification] = useState(false);
  const [selectedTab, setSelectedTab] = useState("one");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabs = [
    { value: "one", label: "Normally" },
    { value: "two", label: "To Original" },
    { value: "three", label: "To Different" },
  ];

  const TimezoneOptions = [
    {
      value: "Eastern Standard Time (EST) - UTC-5:00",
    },
    {
      value: "Pacific Standard Time (PST) - UTC-8:00",
    },
    {
      value: "Indian Standard Time (IST) - UTC+5:30",
    },
    {
      value: "China Standard Time (CST) - UTC+8:00",
    },
    {
      value: "Japan Standard Time (JST) - UTC+9:00",
    },
  ];

  function TimezoneDropdown({ className = "" }) {
    return (
      <SingleSelect
        className={className}
        label="Select Timezone"
        maxWidth="300px"
        defaultStyle
        defaultField
        options={TimezoneOptions}
      />
    );
  }

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000); // Set the duration (in milliseconds) for 2 seconds
  };

  return (
    <Box className="px-6 py-7">
      {showNotification && (
        <CustomNotification message="Text Copied" duration={2000} />
      )}
      <Typography
        className="headline-small"
        marginBottom="16px"
        padding="13px 32px"
        color="#fff"
        sx={{
          backgroundColor: "var(--redColor)",
        }}
      >
        Profile
      </Typography>
      <Box height="27px" />
      <Typography
        className="headline-small"
        marginBottom="38px"
        marginLeft="35px"
        color={theme.palette.primary.main}
      >
        General
      </Typography>
      <Box className="flex justify-center">
        <div className="grid gap-4 grid-cols-10 w-full gap-y-8">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Campaign name"
              helperText="The campaign name you provide will be displayed throughout the CallWise portal to share relevant information."
            />
          </div>
          <div className="col-span-1" />
          <CustomTextField
            className="col-span-3"
            placeholder="Idrak"
            maxWidth="300px"
            simple
          />
          <div className="col-span-3" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Time Zone" />
          </div>
          <div className="col-span-1" />
          <TimezoneDropdown className="col-span-3" />
          <div className="col-span-3" />
          <div className="col-span-4" />
          <Button
            variant="contained"
            className="title-medium"
            disableElevation
            sx={{
              padding: "8.5px 16px",
              textTransform: "none",
              backgroundColor: "#000",
              marginBottom: "24px",
              minWidth: "200px",
              height: "40px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "var(--redColor)",
                "& svg": {
                  fill: "#fff",
                },
              },
            }}
          >
            Update
          </Button>
        </div>
      </Box>
      <Divider
        sx={{
          borderColor: "var(--greyColor)",
          marginY: "72px",
          marginX: "-24px",

        }}
      />
      <Typography
        className="headline-small"
        marginBottom="38px"
        marginLeft="35px"
        color={theme.palette.primary.main}
      >
        Password
      </Typography>
      <Box className="flex justify-center">
        <div className="grid gap-4 grid-cols-10 w-full gap-y-8">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Enter your Current Password" />
          </div>
          <div className="col-span-1" />
          <CustomTextField
            type="password"
            placeholderColor="#999"
            className="col-span-3"
            placeholder="******"
            maxWidth="300px"
            simple
          />
          <div className="col-span-3" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="New Password" />
          </div>
          <div className="col-span-1" />
          <CustomTextField
            type="password"
            placeholderColor="#999"
            className="col-span-3"
            placeholder="******"
            maxWidth="300px"
            simple
          />
          <div className="col-span-3" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Confirm Password" />
          </div>
          <div className="col-span-1" />
          <CustomTextField
            type="password"
            placeholderColor="#999"
            className="col-span-3"
            placeholder="******"
            maxWidth="300px"
            simple
          />
          <div className="col-span-3" />
          <div className="col-span-4" />
          <Button
            variant="contained"
            className="title-medium"
            disableElevation
            sx={{
              padding: "8.5px 16px",
              textTransform: "none",
              backgroundColor: "#000",
              marginBottom: "24px",
              minWidth: "200px",
              height: "40px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "var(--redColor)",
                "& svg": {
                  fill: "#fff",
                },
              },
            }}
          >
            Update
          </Button>
        </div>
      </Box>
      <Divider
        sx={{
          borderColor: "var(--greyColor)",
          marginY: "72px",
          marginX: "-24px",

        }}
      />
      <Typography
        className="headline-small"
        marginBottom="38px"
        marginLeft="35px"
        color={theme.palette.primary.main}
      >
        Personal information
      </Typography>
      <Box className="flex justify-center">
        <div className="grid gap-4 grid-cols-10 w-full gap-y-8">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Your Name" />
          </div>
          <div className="col-span-1" />
          <CustomTextField
            className="col-span-3"
            placeholder="John"
            maxWidth="300px"
            simple
          />
          <div className="col-span-3" />
          <div className="flex justify-end items-start gap-x-1.5 col-span-3">
            <CustomLabel label="Profile Picture" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <Box className="flex justify-between gap-x-9" maxWidth="525px">
              <Box minWidth="120px">
                <img width="120px" height="120px" src={profilePic} />
              </Box>
              <div>
                <Typography className="body-large">
                  To personalize your account and make it uniquely yours, you
                  can change your profile picture.
                </Typography>
                <Box height="24px" />
                <div className="flex justify-start gap-x-6">
                  <Button
                    variant="outlined"
                    startIcon={<EditPenIcon />}
                    className="title-medium"
                    sx={{
                      padding: "8.5px 16px",
                      textTransform: "none",
                      border: "1px solid var(--blackColor)",
                      color: "var(--blackColor)",
                      minWidth: "150px",
                      marginBottom: "24px",
                      borderRadius: "5px",
                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "var(--blackColor)",
                        border: "1px solid var(--blackColor)",
                        "& svg": {
                          fill: "#fff",
                        },
                      },
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    className="title-medium"
                    sx={{
                      padding: "8.5px 16px",
                      textTransform: "none",
                      border: "1px solid var(--blackColor)",
                      color: "var(--blackColor)",
                      minWidth: "150px",

                      marginBottom: "24px",
                      borderRadius: "5px",
                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "var(--blackColor)",
                        border: "1px solid var(--blackColor)",
                        "& svg": {
                          fill: "#fff",
                        },
                      },
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Box>
          </div>
          <div className="col-span-4" />
          <Button
            variant="contained"
            className="title-medium"
            disableElevation
            sx={{
              padding: "8.5px 16px",
              textTransform: "none",
              backgroundColor: "#000",
              marginBottom: "24px",
              minWidth: "200px",
              height: "40px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "var(--redColor)",
                "& svg": {
                  fill: "#fff",
                },
              },
            }}
          >
            Save Changes
          </Button>
        </div>
      </Box>
      <Box height={300} />
    </Box>
  );
}

export default ProfileSettings;
