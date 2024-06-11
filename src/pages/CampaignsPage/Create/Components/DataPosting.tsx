import {
  Box,
  Button,
  Divider,
  Input,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import theme from "../../../../styles/theme";
import ReusableTable from "../../../../components/basicTable/BasicTable";
import ArrowIcon from "../../../../components/icons/arrow";
import CustomLabel from "../../../../components/customLabel/CustomLabel";
import CustomFormField from "../../../../components/customFormField/CustomFormField";
import CustomSwitch from "../../../../components/switch/Switch";
import { SingleSelect } from "../../../../components/dynamicDropdown/DynamicDropdown";

function DataPosting(): JSX.Element {
  const [selectedFirePixel, setSelectedFirePixel] = React.useState<string>();
  const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false);

  const handleFirePixelChange = (
    event: SelectChangeEvent<typeof selectedFirePixel>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedFirePixel(value);
  };

  const publisherOptions = [
    {
      value: "Incoming",
      component: FirePixelOptionComponent({ publisherName: "Incoming" }),
    },
    {
      value: "Outgoing",
      component: FirePixelOptionComponent({ publisherName: "Outgoing" }),
    },
    {
      value: "Connected",
      component: FirePixelOptionComponent({ publisherName: "Connected" }),
    },
  ];

  function FirePixelOptionComponent({ publisherName }) {
    return (
      <Box>
        <Typography className="title-medium" color="var(--blackColor)">
          {publisherName}
        </Typography>
      </Box>
    );
  }

  function FirePixelDropdown({ className }) {
    return (
      <SingleSelect
        label="Choose Publisher"
        options={publisherOptions}
        handleChange={handleFirePixelChange}
        value={selectedFirePixel}
        className={className}
        defaultValue={publisherOptions[0].value}
      />
    );
  }

  return (
    <>
      <Typography
        className="headline-medium"
        marginBottom="56px"
        color={theme.palette.primary.main}
      >
        Data Posting
      </Typography>
      <Box className="flex justify-center">
        <div className="grid gap-4 grid-cols-10 w-full gap-y-8">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Name"
              helperText="Enter a name for the pixel of your future reference"
            />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <CustomFormField label="Enter Name" />
            <Typography
              className="body-small"
              sx={{
                color: "var(--greyColor)",
                marginTop: "6px",
                marginBottom: "-20px",
              }}
            >
              Required
            </Typography>
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Fire Pixel on"
              helperText="Choose the event that will trigger your postback."
            />
          </div>
          <div className="col-span-1" />
          <FirePixelDropdown className="col-span-6" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="URL"
              helperText="Callwise will trigger this URL based on your configuration."
            />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6 flex justify-start items-center gap-x-1">
            <CustomFormField
              width="390px"
              maxWidth="390px"
              label="http : // mytracking.tracking.com"
            />
            <Button
              variant="outlined"
              className="title-medium"
              sx={{
                padding: "8.5px 16px",
                textTransform: "none",
                border: "1px solid #E01E26",
                color: "#E01E26",
                borderRadius: "0px",
                width: "110px",
                marginLeft: "2px",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "var(--redColor)",
                },
              }}
            >
              Token
            </Button>
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Choose Authentication"
              helperText="Select the authentication to use if the pixel requires a dynamic token."
            />
          </div>
          <div className="col-span-1" />
          <FirePixelDropdown className="col-span-6" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel
              label="Advanced Options"
              helperText="If this option is enabled, you will need to select pixel HTTP method."
            />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <CustomSwitch
              value={showAdvanced}
              setValue={() => setShowAdvanced((e) => !e)}
            />
          </div>
          {showAdvanced && (
            <>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel
                  label="HTTP Method"
                  helperText="The HTTP method to be used in pixel request to the server."
                />
              </div>
              <div className="col-span-1" />
              <FirePixelDropdown className="col-span-6" />
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Content Type" />
              </div>
              <div className="col-span-1" />
              <FirePixelDropdown className="col-span-6" />
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Body" />
              </div>
              <div className="col-span-1" />
              <CustomFormField className="col-span-6" label="Enter Name" />
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel
                  label="Headers"
                  helperText="Any additional headers to be used on request."
                />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6 flex justify-start items-center gap-x-1">
                <CustomFormField width="177px" label="Key" /> :
                <CustomFormField width="177px" label="Value" />
                <Button
                  variant="outlined"
                  className="title-medium"
                  sx={{
                    padding: "8.5px 16px",
                    textTransform: "none",
                    border: "1px solid #E01E26",
                    color: "#E01E26",
                    borderRadius: "0px",
                    width: "110px",
                    marginLeft: "18px",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "var(--redColor)",
                    },
                  }}
                >
                  Add
                </Button>
              </div>
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
                    marginTop: "40px",
                  }}
                >
                  Create
                </Button>
              </div>
            </>
          )}
        </div>
      </Box>
    </>
  );
}

export default DataPosting;
