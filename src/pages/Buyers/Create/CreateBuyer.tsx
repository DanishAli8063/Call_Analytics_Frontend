import React, { useState, useEffect, MouseEventHandler } from "react";
import {
  Box,
  Button,
  FormControl,
  selectClasses,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import CustomFormField from "../../../components/customFormField/CustomFormField";
import CustomLabel from "../../../components/customLabel/CustomLabel";
import CustomSwitch from "../../../components/switch/Switch";
import theme from "../../../styles/theme";
import DynamicTabs from "../../../components/dynamicTabs/DynamicTabs";
import { SingleSelect } from "../../../components/dynamicDropdown/DynamicDropdown";

function CreateBuyer(): JSX.Element {
  const [selectedRestrictOption, setSelectedRestrictOption] = useState("");
  const [selectedTab, setSelectedTab] = useState("one");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabs = [
    { value: "one", label: "Always" },
    { value: "two", label: "Time Limit" },
  ];

  const [limits, setLimit] = useState({
    limitRevenue: false,
    globalCap: false,
    monthlyCap: false,
    dailyCap: false,
    hourlyCap: false,
  });

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

  const handleLimitChange = (name) => {
    setLimit((prevState) => ({ ...prevState, [name]: !prevState[name] }));
  };

  const handleRestrictChange = (
    event: SelectChangeEvent<typeof selectedRestrictOption>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedRestrictOption(value);
  };

  function RestrictDropdown({ className = "" }) {
    return (
      <SingleSelect
        className={className}
        defaultValue={options[0].label}
        handleChange={handleRestrictChange}
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
    <Box className="px-6 py-7">
      <Typography
        className="headline-medium"
        marginBottom="16px"
        color={theme.palette.primary.main}
      >
        Create Buyer
      </Typography>
      <Box height="96px" />
      <Box className="flex justify-center">
        <div className="grid gap-8 grid-cols-10 w-full ">
          <div className="flex justify-end items-center gap-x-1.5 col-span-5 pr-28">
            <CustomLabel label="Company Name" />
          </div>
          <div className="col-span-5">
            <CustomFormField label="Callwise" />
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

          <div className="flex justify-end items-center col-span-5 pr-28">
            <CustomLabel label="Allow Buyer To Pause Target " />
          </div>
          <div className="col-span-5">
            <CustomSwitch />
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-5 pr-28">
            <CustomLabel label="Allow Buyer To Set Target Caps & Concurrency" />
          </div>

          <div className="col-span-5">
            <CustomSwitch />
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-5 pr-28">
            <CustomLabel label="Limit Revenue" />
          </div>
          <div className="col-span-5">
            <CustomSwitch
              value={limits.limitRevenue}
              setValue={() => handleLimitChange("limitRevenue")}
            />
          </div>
          {limits.limitRevenue && (
            <>
              <div className="flex justify-end items-center gap-x-1.5 col-span-5 pr-28">
                <CustomLabel label="Global Revenue Cap" helperText="" />
              </div>
              <div className="col-span-5 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.globalCap}
                  setValue={() => handleLimitChange("globalCap")}
                />
                {limits.globalCap && (
                  <div className="flex items-end ">
                    <CustomFormField
                      minimal
                      textAlignLeft
                      className="col-span-10"
                      label=""
                      maxWidth="100px"
                    />
                    <Typography
                      className="body-small"
                      sx={{
                        color: "var(--blackColor)",
                        marginTop: "6px",
                        marginBottom: "4px",
                        marginLeft: "10px",
                      }}
                    >
                      Days
                    </Typography>
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center gap-x-1.5 col-span-5 pr-28">
                <CustomLabel label="Monthly Revenue Cap" helperText="" />
              </div>
              <div className="col-span-5 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.monthlyCap}
                  setValue={() => handleLimitChange("monthlyCap")}
                />
                {limits.monthlyCap && (
                  <div className="flex items-end ">
                    <CustomFormField
                      minimal
                      textAlignLeft
                      className="col-span-10"
                      label=""
                      maxWidth="100px"
                    />
                    <Typography
                      className="body-small"
                      sx={{
                        color: "var(--blackColor)",
                        marginTop: "6px",
                        marginBottom: "4px",
                        marginLeft: "10px",
                      }}
                    >
                      Days
                    </Typography>
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center gap-x-1.5 col-span-5 pr-28">
                <CustomLabel label="Daily Revenue Cap" helperText="" />
              </div>
              <div className="col-span-5 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.dailyCap}
                  setValue={() => handleLimitChange("dailyCap")}
                />
                {limits.dailyCap && (
                  <div className="flex items-end ">
                    <CustomFormField
                      minimal
                      textAlignLeft
                      className="col-span-10"
                      label=""
                      maxWidth="100px"
                    />
                    <Typography
                      className="body-small"
                      sx={{
                        color: "var(--blackColor)",
                        marginTop: "6px",
                        marginBottom: "4px",
                        marginLeft: "10px",
                      }}
                    >
                      Days
                    </Typography>
                  </div>
                )}
              </div>

              <div className="flex justify-end items-center gap-x-1.5 col-span-5 pr-28">
                <CustomLabel label="Hourly Revenue Cap" helperText="" />
              </div>
              <div className="col-span-5 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.hourlyCap}
                  setValue={() => handleLimitChange("hourlyCap")}
                />
                {limits.hourlyCap && (
                  <div className="flex items-end ">
                    <CustomFormField
                      minimal
                      textAlignLeft
                      className="col-span-10"
                      label=""
                      maxWidth="100px"
                    />
                    <Typography
                      className="body-small"
                      sx={{
                        color: "var(--blackColor)",
                        marginTop: "6px",
                        marginBottom: "4px",
                        marginLeft: "10px",
                      }}
                    >
                      Days
                    </Typography>
                  </div>
                )}
              </div>
            </>
          )}
          <div className="flex justify-end items-center gap-x-1.5 col-span-5 pr-28">
            <CustomLabel label="Restrict Duplicate" helperText="s" />
          </div>
          <RestrictDropdown className="col-span-5" />
          {selectedRestrictOption == "By Campaign" && (
            <>
              <div className="flex justify-end items-center gap-x-1.5 col-span-5 pr-28">
                <CustomLabel label="Restrict After" helperText="s" />
              </div>
              <RestrictAfterDropdown className="col-span-5" />
              <div className="col-span-5" />
              <div className="col-span-5 flex flex-col gap-y-5">
                <DynamicTabs
                  tabs={tabs}
                  className="w-full"
                  selectedTab={selectedTab}
                  handleTabChange={handleTabChange}
                />
              </div>
              {selectedTab == "two" && (
                <>
                  <div className="col-span-5" />
                  <div className=" col-span-5 flex items-center gap-x-2">
                    <CustomFormField
                      minimal
                      className="col-span-10"
                      label=""
                      maxWidth="100px"
                    />
                    <Typography className="body-large">Days</Typography>
                  </div>
                </>
              )}
            </>
          )}
          <div className="col-span-5" />
          <div className="mt-[56px] flex col-span-5 justify-start">
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
                marginRight: "16px",
                "&:hover": {
                  color: "var(--redColor)",
                  borderColor: "var(--redColor)",
                },
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
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default CreateBuyer;
