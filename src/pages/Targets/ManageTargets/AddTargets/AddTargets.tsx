import React, { useState, useEffect, MouseEventHandler } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";


import CapSettings from "./Components/CapSettings";
import ConcurrencySettings from "./Components/ConcurrencySettings";
import RestrictDuplicate from "./Components/RestrictDuplicate";
import TagRoutingFilters from "./Components/TagRoutingFilters/TagRoutingFilters";
import CustomFormField from "../../../../components/customFormField/CustomFormField";
import CustomLabel from "../../../../components/customLabel/CustomLabel";
import  { SingleSelect } from "../../../../components/dynamicDropdown/DynamicDropdown";
import DynamicTabs from "../../../../components/dynamicTabs/DynamicTabs";
import CustomSwitch from "../../../../components/switch/Switch";
import theme from "../../../../styles/theme";

function AddTargetsPage(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState("one");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabs = [
    { value: "one", label: "Toll Free" },
    { value: "two", label: "SIP" },
  ];
  const options = [
    {
      value: "VoiceConnect",
    },
    {
      value: "SupportLine",
    },
    {
      value: "CallWave",
    },
    {
      value: "DialDirect",
    },
    {
      value: "HelpLine",
    },
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
  function BuyerDropdown({ className = "" }) {
    return (
      <SingleSelect
        className={className}
        label="Select Buyer"
        defaultStyle
        options={options}
      />
    );
  }

  function TimezoneDropdown({ className = "" }) {
    return (
      <SingleSelect
        className={className}
        label="Select Timezone"
        defaultStyle
        options={TimezoneOptions}
      />
    );
  }
  return (
    <Box className="px-6 py-7">
      <Typography
        className="headline-medium"
        marginBottom="16px"
        color={theme.palette.primary.main}
      >
        Add Target
      </Typography>
      {/* <Typography
        className="body-small max-w-[494px]"
        color="var(--blackColor)"
      >
        Enter information about a new publisher to track their calls and analyse
        their performance. Publishers are entities or individuals who promote
        your products or services and generate phone leads for your business. By
        adding publishers to your call tracking system, you can measure the
        effectiveness of their campaigns and optimise your marketing strategy.
      </Typography> */}
      <Box height="96px" />

      <Box className="flex justify-center">
        <div className="form-grid">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Name" helperText="s" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <CustomFormField minimal={false} label="IDRAK AI" />
            <Typography
              className="body-small"
              sx={{
                color: "var(--greyColor)",
                marginTop: "6px",
                // marginBottom: "-20px",
              }}
            >
              Required
            </Typography>
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Buyer" helperText="s" />
          </div>
          <div className="col-span-1" />
          <BuyerDropdown className="col-span-6" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Number Type" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <DynamicTabs
              className="max-w-md"
              tabs={tabs}
              selectedTab={selectedTab}
              handleTabChange={handleTabChange}
            />
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Number" helperText="s" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <CustomFormField label="+" />
            <Typography
              className="body-small"
              sx={{
                color: "var(--greyColor)",
                marginTop: "6px",
                // marginBottom: "-20px",
              }}
            >
              Required
            </Typography>
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Connection Timeout" helperText="s" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6 flex items-end">
            <CustomFormField label="30" />
            <Typography
              className="body-small"
              sx={{
                color: "var(--greyColor)",
                marginTop: "6px",
                marginLeft: "10px",
              }}
            >
              Seconds
            </Typography>
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Time Zone" helperText="s" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <TimezoneDropdown />
            <Typography
              className="body-small"
              sx={{
                color: "var(--greyColor)",
                marginTop: "6px",
                // marginBottom: "-20px",
              }}
            >
              Required
            </Typography>
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Disable Recordings" helperText="" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6 flex items-center">
            <CustomSwitch />
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Hours of Operation" helperText="" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6 flex items-center">
            <CustomSwitch />
          </div>
          {/* <div className="col-span-2" />
          <div className="col-span-5" />
          <div className="col-span-5" />
          <div className="flex col-span-5 justify-between">
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
            >
              Create
            </Button>
          </div> */}
        </div>
      </Box>
      <Divider
        sx={{
          borderColor: "var(--greyColor)",
          marginY: "72px",
          marginX: "-24px",

        }}
      />
      <CapSettings />
      <ConcurrencySettings />
      <RestrictDuplicate />
      <TagRoutingFilters />
    </Box>
  );
}

export default AddTargetsPage;
