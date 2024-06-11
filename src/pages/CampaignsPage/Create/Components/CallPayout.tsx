import {
  Box,
  Button,
  Collapse,
  Divider,
  Input,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../../../styles/theme";
import ReusableTable from "../../../../components/basicTable/BasicTable";
import ArrowIcon from "../../../../components/icons/arrow";
import NumberInput from "../../../../components/numberInput/NumberInput";
import DeleteIcon from "../../../../components/icons/delete";
import CustomModal from "../../../../components/modal/Modal";
import CustomFormField from "../../../../components/customFormField/CustomFormField";
import CustomLabel from "../../../../components/customLabel/CustomLabel";
import DynamicTabs from "../../../../components/dynamicTabs/DynamicTabs";
import CopyIcon from "../../../../components/icons/copy";
import CustomSwitch from "../../../../components/switch/Switch";
import EditIcon from "../../../../components/icons/edit";
import PlusIcon from "../../../../components/icons/plus";
import { classNames } from "../../../../utils";
import { SingleSelect } from "../../../../components/dynamicDropdown/DynamicDropdown";

function CallPayout(): JSX.Element {

  return (
    <>
      <Typography
        className="headline-medium"
        marginBottom="56px"
        color={theme.palette.primary.main}
      >
        Call Payout Settings
      </Typography>
      <AddPayoutComponent />
      <PayoutComponent number="1" text="$22 on Connected Call" />
      <PayoutComponent number="2" text="$12 if call length exceeds 120 sec" />
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

export default CallPayout;

export const PayoutComponent = ({
  number,
  text,
  table = false,
  noBottomMargin = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [payoutOn, setPayoutOn] = useState("Call Length");
  const [selectedTab, setSelectedTab] = useState("one");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handlePayoutOnChange = (event: SelectChangeEvent<typeof payoutOn>) => {
    const {
      target: { value },
    } = event;
    setPayoutOn(value);
  };


  const tabs = [
    { value: "one", label: "Disable" },
    { value: "two", label: "Enable" },
    { value: "three", label: "Time Limit" },
  ];
  const options = [
    {
      value: "Call Length",
    },
    {
      value: "Call Successfully Connected",
    },
    {
      value: "Dialed",
    },
  ];

  function PayoutDropdown({ className = "" }) {
    return (
      <SingleSelect
        className={className}
        defaultValue={options[0].value}
        defaultStyle
        options={options}
        value={payoutOn}
        handleChange={handlePayoutOnChange}
      />
    );
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "800px",
            backgroundColor: "var(--greyColor)" && "#f1f1f1",
            padding: table ? "4px 8px" : "10px 15px",
            borderLeft: table ? "2px solid" : "3px solid",
            marginY: table ? "10px" : "5px",
            marginTop: table ? "0px" : "5px",
            marginBottom: noBottomMargin ? "0px" : table ? "10px" : "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "8px",
            }}
          >
            <Typography className="label-large">{number}.</Typography>
            <Typography className="body-medium">{text}</Typography>
          </Box>
          {!table && (
            <div className={classNames("flex gap-x-4 justify-end")}>
              <div
                onClick={() => {
                  setOpen((prev) => {
                    return !prev;
                  });
                }}
              >
                <EditIcon />
              </div>
              <DeleteIcon />
            </div>
          )}
        </Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="grid gap-4 grid-cols-10 w-full gap-y-8 my-10">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Payout on" helperText="s" />
          </div>
          <div className="col-span-1" />
          <PayoutDropdown className="col-span-5" />
          {payoutOn == "Call Length" && (
            <>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Length" />
              </div>
              <div className="col-span-1" />
              <CustomFormField className="col-span-6" label="" />
            </>
          )}
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Payout Amount" />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="$" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Duplicate Payout" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-4 flex flex-col gap-y-5">
            <DynamicTabs
              tabs={tabs}
              className="w-full"
              selectedTab={selectedTab}
              handleTabChange={handleTabChange}
            />
          </div>
          <div className="col-span-2" />
          {selectedTab == "three" && (
            <>
              <div className="col-span-4" />
              <div className=" col-span-6 flex items-center gap-x-2">
                <CustomFormField
                  minimal
                  textAlignLeft
                  className="col-span-10"
                  label=""
                  maxWidth="100px"
                />
                <Typography className="body-large">Days</Typography>
              </div>
            </>
          )}
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
      </Collapse>
    </>
  );
};

export const AddPayoutComponent = () => {
  const [open, setOpen] = React.useState(false);

  const [selectedTab, setSelectedTab] = useState("one");
  const [payoutOn, setPayoutOn] = useState("Call Length");
  const [limits, setLimit] = useState({
    limitRevenue: false,
    globalCap: false,
    globalPayoutCap: false,
    monthlyCap: false,
    monthlyPayoutCap: false,
    dailyCap: false,
    dailyPayoutCap: false,
    hourlyCap: false,
    hourlyPayoutCap: false,
    concurrencyCap: false,
  });

  const handleLimitChange = (name) => {
    setLimit((prevState) => ({ ...prevState, [name]: !prevState[name] }));
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handlePayoutOnChange = (event: SelectChangeEvent<typeof payoutOn>) => {
    const {
      target: { value },
    } = event;
    setPayoutOn(value);
  };

  const tabs = [
    { value: "one", label: "Disable" },
    { value: "two", label: "Enable" },
    { value: "three", label: "Time Limit" },
  ];
  const options = [
    {
      value: "Call Length",
    },
    {
      value: "Call Successfully Connected",
    },
    {
      value: "Dialed",
    },
  ];

  function PayoutDropdown({ className = "" }) {
    return (
      <SingleSelect
        className={className}
        defaultValue={options[0].value}
        defaultStyle
        options={options}
        value={payoutOn}
        handleChange={handlePayoutOnChange}
      />
    );
  }
  return (
    <>
      <Box
        onClick={() => {
          setOpen((prev) => {
            return !prev;
          });
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            maxWidth: "800px",
            padding: "10px 15px",
            border: "1px solid",
            marginY: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "8px",
            }}
          >
            <PlusIcon />
            <Typography className="body-medium">
              Add Campaign Payout Settings
            </Typography>
          </Box>
        </Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="grid gap-4 grid-cols-10 w-full gap-y-8 my-10">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Payout on" helperText="s" />
          </div>
          <div className="col-span-1" />
          <PayoutDropdown className="col-span-5" />
          {payoutOn == "Call Length" && (
            <>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Length" />
              </div>
              <div className="col-span-1" />
              <CustomFormField className="col-span-6" label="" />
            </>
          )}
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Payout Amount" />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="$" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Limit Revenue" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <CustomSwitch
              value={limits.limitRevenue}
              setValue={() => handleLimitChange("limitRevenue")}
            />
          </div>
          {limits.limitRevenue && (
            <>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Global Cap" helperText="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.globalCap}
                  setValue={() => handleLimitChange("globalCap")}
                />
                {limits.globalCap && (
                  <CustomFormField
                    minimal
                    textAlignLeft
                    className="col-span-10"
                    label=""
                    maxWidth="100px"
                  />
                )}
              </div>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Global Payout Cap" helperText="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.globalPayoutCap}
                  setValue={() => handleLimitChange("globalPayoutCap")}
                />
                {limits.globalPayoutCap && (
                  <CustomFormField
                    minimal
                    textAlignLeft
                    className="col-span-10"
                    label="$"
                    maxWidth="100px"
                  />
                )}
              </div>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Monthly Cap" helperText="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.monthlyCap}
                  setValue={() => handleLimitChange("monthlyCap")}
                />
                {limits.monthlyCap && (
                  <CustomFormField
                    minimal
                    textAlignLeft
                    className="col-span-10"
                    label=""
                    maxWidth="100px"
                  />
                )}
              </div>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Monthly Payout Cap" helperText="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.monthlyPayoutCap}
                  setValue={() => handleLimitChange("monthlyPayoutCap")}
                />
                {limits.monthlyPayoutCap && (
                  <CustomFormField
                    minimal
                    textAlignLeft
                    className="col-span-10"
                    label="$"
                    maxWidth="100px"
                  />
                )}
              </div>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Daily Cap" helperText="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.dailyCap}
                  setValue={() => handleLimitChange("dailyCap")}
                />
                {limits.dailyCap && (
                  <CustomFormField
                    minimal
                    textAlignLeft
                    className="col-span-10"
                    label=""
                    maxWidth="100px"
                  />
                )}
              </div>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Daily Payout Cap" helperText="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.dailyPayoutCap}
                  setValue={() => handleLimitChange("dailyPayoutCap")}
                />
                {limits.dailyPayoutCap && (
                  <CustomFormField
                    minimal
                    textAlignLeft
                    className="col-span-10"
                    label="$"
                    maxWidth="100px"
                  />
                )}
              </div>

              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Hourly Cap" helperText="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.hourlyCap}
                  setValue={() => handleLimitChange("hourlyCap")}
                />
                {limits.hourlyCap && (
                  <CustomFormField
                    minimal
                    textAlignLeft
                    className="col-span-10"
                    label=""
                    maxWidth="100px"
                  />
                )}
              </div>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Hourly Payout Cap" helperText="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.hourlyPayoutCap}
                  setValue={() => handleLimitChange("hourlyPayoutCap")}
                />
                {limits.hourlyPayoutCap && (
                  <CustomFormField
                    minimal
                    textAlignLeft
                    className="col-span-10"
                    label="$"
                    maxWidth="100px"
                  />
                )}
              </div>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Concurrency Cap" helperText="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6 flex items-center gap-x-12">
                <CustomSwitch
                  value={limits.concurrencyCap}
                  setValue={() => handleLimitChange("concurrencyCap")}
                />
                {limits.concurrencyCap && (
                  <CustomFormField
                    minimal
                    textAlignLeft
                    className="col-span-10"
                    label=""
                    maxWidth="100px"
                  />
                )}
              </div>
            </>
          )}
          <div className="flex justify-end items-start gap-x-1.5 col-span-3">
            <CustomLabel label="Duplicate Payout" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-4 flex flex-col gap-y-5">
            <DynamicTabs
              tabs={tabs}
              className="w-full"
              selectedTab={selectedTab}
              handleTabChange={handleTabChange}
            />
          </div>
          <div className="col-span-2" />
          {selectedTab == "three" && (
            <>
              <div className="col-span-4" />
              <div className=" col-span-6 flex items-center gap-x-2">
                <CustomFormField
                  minimal
                  textAlignLeft
                  className="col-span-10"
                  label=""
                  maxWidth="100px"
                />
                <Typography className="body-large">Days</Typography>
              </div>
            </>
          )}
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
      </Collapse>
    </>
  );
};
