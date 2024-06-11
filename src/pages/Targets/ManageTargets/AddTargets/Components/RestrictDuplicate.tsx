import {
  Box,
  Divider,
  Input,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomLabel from "../../../../../components/customLabel/CustomLabel";
import DynamicTabs from "../../../../../components/dynamicTabs/DynamicTabs";
import theme from "../../../../../styles/theme";
import CustomFormField from "../../../../../components/customFormField/CustomFormField";
import { SingleSelect } from "../../../../../components/dynamicDropdown/DynamicDropdown";

function RestrictDuplicate(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState("one");
  const [selectedOption, setSelectedOption] = useState("");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabs = [
    { value: "one", label: "Always" },
    { value: "two", label: "Time Limit" },
  ];

  const options = [
    {
      label: "Buyer Settings (Do not Restrict)",
      value: "Buyer Settings (Do not Restrict)",
    },
    {
      label: "Do not Restrict",
      value: "Do not Restrict",
    },
    {
      label: "By Campaign - Individual Campaign",
      value: "By Campaign",
    },
  ];

  const options1 = [
    {
      value: "Converted",
    },
    {
      value: "Connected",
    },
  ];

  const handleChange = (event: SelectChangeEvent<typeof selectedOption>) => {
    const {
      target: { value },
    } = event;
    setSelectedOption(value);
  };

  function RestrictDropdown({ className = "" }) {
    return (
      <SingleSelect
        className={className}
        defaultValue={options[0].label}
        handleChange={handleChange}
        defaultStyle
        options={options}
      />
    );
  }
  function RestrictAfterDropdown({ className = "" }) {
    return (
      <SingleSelect
        className={className}
        defaultValue={options1[0].value}
        defaultStyle
        options={options1}
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
        Restrict Duplicate Calls Settings
      </Typography>
      <Box className="flex justify-center">
        <div className="cap-form-grid">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Restrict Duplicate" helperText="s" />
          </div>
          <div className="col-span-1" />
          <RestrictDropdown className="col-span-6" />
          {selectedOption == "By Campaign" && (
            <>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Restrict After" helperText="s" />
              </div>
              <div className="col-span-1" />
              <RestrictAfterDropdown className="col-span-6" />
              <div className="col-span-4" />
              <div className="col-span-6 flex flex-col gap-y-5">
                <DynamicTabs
                  tabs={tabs}
                  className="w-full"
                  selectedTab={selectedTab}
                  handleTabChange={handleTabChange}
                />
              </div>
              {selectedTab == "two" && (
                <div className=" col-span-6 flex items-center gap-x-2">
                  <CustomFormField
                    minimal
                    className="col-span-10"
                    label=""
                    maxWidth="100px"
                  />
                  <Typography className="body-large">Hours</Typography>
                </div>
              )}
            </>
          )}
        </div>
      </Box>

      <Divider
        sx={{
          borderColor: "var(--greyColor)",
          marginY: "72px",
          marginX: "-24px",

        }}
      />
    </>
  );
}

export default RestrictDuplicate;
