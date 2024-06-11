import React, { useState, useEffect, MouseEventHandler } from "react";
import {
  Box,
  Button,
  Typography,
  Tab,
  Tabs,
  Divider,
  SelectChangeEvent,
} from "@mui/material";

import theme from "../../../styles/theme";
import CustomFormField from "../../../components/customFormField/CustomFormField";
import CopyIcon from "../../../components/icons/copy";
import CustomNotification from "../../../components/notification/Notification";
import CustomSwitch from "../../../components/switch/Switch";
import Publishers from "./Components/Publishers";
import CallRouting from "./Components/CallRouting";
import CustomLabel from "../../../components/customLabel/CustomLabel";
import DynamicTabs from "../../../components/dynamicTabs/DynamicTabs";
import DataPosting from "./Components/DataPosting";
import CallPayout from "./Components/CallPayout";
import { SingleSelect } from "../../../components/dynamicDropdown/DynamicDropdown";

type Props = {
  handleNext: MouseEventHandler<HTMLButtonElement>;
};

function Step2({ handleNext }: Props): JSX.Element {
  const [showNotification, setShowNotification] = useState(false);

  const [selectedTab, setSelectedTab] = useState("one");
  const [reportDuplicatesOn, setReportDuplicatesOn] = useState("Connect");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleReportDuplicatesOnChange = (
    event: SelectChangeEvent<typeof reportDuplicatesOn>
  ) => {
    const {
      target: { value },
    } = event;
    setReportDuplicatesOn(value);
  };

  const options = [
    {
      value: "Connect",
    },
    {
      value: "Incoming",
    },
    {
      value: "Call length greater than",
    },
  ];

  const tabs = [
    { value: "one", label: "Normally" },
    { value: "two", label: "To Original" },
    { value: "three", label: "To Different" },
  ];

  function ReportDuplicatesOnDropdown({ className = "" }) {
    return (
      <SingleSelect
        className={className}
        defaultValue={options[0].value}
        defaultStyle
        options={options}
        value={reportDuplicatesOn}
        handleChange={handleReportDuplicatesOnChange}
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
        className="headline-medium"
        marginBottom="16px"
        color={theme.palette.primary.main}
      >
        IDRAK AI
      </Typography>
      <Typography className="body-large" color="var(--blackColor)">
        Fine-Tune Your Call Routing Strategy with Versatile Campaign Settings
      </Typography>
      <Box height="27px" />
      <Typography
        className="headline-medium"
        marginBottom="16px"
        color={theme.palette.primary.main}
      >
        General Info
      </Typography>
      <Box className="flex justify-center">
        <div className="grid gap-4 grid-cols-10 w-full gap-y-8">
          {/* <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Campaign ID"
              helperText="This ID is required for configuring CallWise JavaScript tags on your landing page."
            />
          </div>
          <div className="col-span-1" />
          <div
            className="col-span-6 flex gap-x-1.5 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(
                "CA82326133e4ba4d71ba54c6c40841dd8d"
              );
              handleShowNotification();
            }}
          >
            <CopyIcon />
            <p className="body-large">CA82326133e4ba4d71ba54c6c40841dd8d</p>
          </div> */}
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Campaign name"
              helperText="The campaign name you provide will be displayed throughout the CallWise portal to share relevant information."
            />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="IDRAK AI" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Number Format" />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="(nnn) nnn-nnnn" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Report Duplicate Calls on" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6 flex gap-x-6">
            <ReportDuplicatesOnDropdown />
            {reportDuplicatesOn == "Call length greater than" && (
              <div className="flex items-end ">
                <CustomFormField minimal maxWidth="65px" label="0" />
                <Typography
                  className="body-small"
                  sx={{
                    color: "var(--blackColor)",
                    marginTop: "6px",
                    marginBottom: "4px",
                    marginLeft: "10px",
                  }}
                >
                  Seconds
                </Typography>
              </div>
            )}
          </div>

          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Route previously connected calls"
              helperText="When encountering duplicate phone calls, you have the option to direct them to the original intended target, send them to a different target, or simply follow the regular routing plan. This choice applies specifically to the most recent duplicate call."
            />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <DynamicTabs
              tabs={tabs}
              className="max-w-md"
              selectedTab={selectedTab}
              handleTabChange={handleTabChange}
            />
          </div>
          {(selectedTab == "two" || selectedTab == "three") && (
            <>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Strict" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6">
                <CustomSwitch />
              </div>
            </>
          )}
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Record Calls"
              helperText="Record all calls for this campaign"
            />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <CustomSwitch />
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Trim Silence"
              helperText="Trim silence from the recording"
            />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <CustomSwitch defaultChecked />
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Target Dial Attempts"
              helperText="The number of attempts made to reach the targets"
            />
          </div>

          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="03" />
          <div className="col-span-4" />
          <div className="col-span-6">
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
                marginTop: "56px",
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Box>
      <Divider
        sx={{
          borderColor: "var(--greyColor)",
          marginY: "72px",
          marginX: "-24px",
        }}
      />
      <CallPayout />
      <Publishers />
      <CallRouting />
      <DataPosting />
      <Box height={300} />
    </Box>
  );
}

export default Step2;
