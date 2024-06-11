import {
  Box,
  Button,
  Divider,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { Profiler, Suspense, useMemo, useState } from "react";
import DailyCapTable from "./DailyCapTable";
import HourlyCapTable from "./HourlyCapTable";
import theme from "../../../../../styles/theme";
import CustomLabel from "../../../../../components/customLabel/CustomLabel";
import CustomFormField from "../../../../../components/customFormField/CustomFormField";
import CustomSwitch from "../../../../../components/switch/Switch";
import { SingleSelect } from "../../../../../components/dynamicDropdown/DynamicDropdown";

function CapSettings(): JSX.Element {
  const [caps, setCaps] = useState({
    globalCallCap: false,
    monthlyCap: false,
    dailyCap: false,
    hourlyCap: false,
  });

  const [dailyCapAdvanced, setDailyCapAdvanced] = useState(true);

  const OtherComponent = React.lazy(() => import("./HourlyCapTable"));
  const MemoizedOtherComponent = useMemo(() => <OtherComponent />, [caps.hourlyCap]);

  const options = [
    {
      value: "Connection",
    },
    {
      value: "Conversation",
    },
  ];

  function CaponDropdown({ className = "" }) {
    return (
      <SingleSelect
        className={className}
        label="Select Buyer"
        defaultValue={options[0].value}
        defaultStyle
        options={options}
      />
    );
  }

  function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    console.table([
      {
        prop: id,
        description:
          'The "id" prop of the Profiler tree that has just committed',
      },
      {
        prop: phase,
        description:
          'Either "mount" (if the tree just mounted) or "update" (if it re-rendered)',
      },
      {
        prop: actualDuration,
        description: "Time spent rendering the committed update",
      },
      {
        prop: baseDuration,
        description:
          "Estimated time to render the entire subtree without memoization",
      },
      {
        prop: startTime,
        description: "When React began rendering this update",
      },
      {
        prop: commitTime,
        description: "When React committed this update",
      },
      {
        prop: interactions,
        description: "The Set of interactions belonging to this update",
      },
    ]);
  }

  return (
    <>
      <Typography
        className="headline-medium"
        marginBottom="56px"
        color={theme.palette.primary.main}
      >
        Cap Settings
      </Typography>

      <Box className="flex justify-center">
        {/* <div className="grid gap-4 grid-cols-10 w-full gap-y-6 max-w-2xl"> */}
        <div className="cap-form-grid">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Cap on" helperText="s" />
          </div>
          <div className="col-span-1" />
          <CaponDropdown className="col-span-6" />

          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Global Call Cap" helperText="" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6 flex items-center gap-x-12">
            <CustomSwitch
              value={caps.globalCallCap}
              setValue={() =>
                setCaps((prevCaps) => ({
                  ...prevCaps,
                  globalCallCap: !prevCaps.globalCallCap,
                }))
              }
            />
            {caps.globalCallCap && (
              <CustomFormField
                minimal
                className="col-span-10"
                label=""
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
              value={caps.monthlyCap}
              setValue={() =>
                setCaps((prevCaps) => ({
                  ...prevCaps,
                  monthlyCap: !prevCaps.monthlyCap,
                }))
              }
            />
            {caps.monthlyCap && (
              <CustomFormField
                minimal
                className="col-span-10"
                label=""
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
              value={caps.dailyCap}
              setValue={() =>
                setCaps((prevCaps) => ({
                  ...prevCaps,
                  dailyCap: !prevCaps.dailyCap,
                }))
              }
            />
            {caps.dailyCap && (
              <div className="flex items-end">
                <CustomFormField
                  minimal
                  className="col-span-10"
                  label=""
                  maxWidth="100px"
                />
                <Box width="40px" />
                <Button
                  variant="contained"
                  className="body-small"
                  sx={{
                    padding: "9px 29px",
                    textTransform: "none",
                    color: "#fff",
                    borderRadius: "5px",
                    height: "25px",
                    boxShadow: "unset !important",
                    backgroundColor: "var(--blackColor)",
                    "&:hover": {
                      backgroundColor: "var(--blackColor)",
                    },
                  }}
                  onClick={() => setDailyCapAdvanced((prev) => !prev)}
                >
                  {dailyCapAdvanced ? "Basic" : "Advanced"}
                </Button>
                <Button
                  variant="outlined"
                  className="body-small"
                  sx={{
                    padding: "9px 16px",
                    textTransform: "none",
                    color: "var(--blackColor)",
                    borderRadius: "5px",
                    marginLeft: "8px",
                    height: "25px",
                    boxShadow: "unset !important",
                    borderColor: "var(--blackColor)",
                    "&:hover": {
                      borderColor: "var(--blackColor)",
                    },
                  }}
                >
                  Reset
                </Button>
              </div>
            )}
          </div>
          {caps.dailyCap && dailyCapAdvanced && (
            <div className="col-span-10">
              <DailyCapTable />
            </div>
          )}

          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Hourly Cap" helperText="" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6 flex items-center gap-x-12">
            <CustomSwitch
              value={caps.hourlyCap}
              setValue={() =>
                setCaps((prevCaps) => ({
                  ...prevCaps,
                  hourlyCap: !prevCaps.hourlyCap,
                }))
              }
            />
            {caps.hourlyCap && (
              <CustomFormField
                minimal
                className="col-span-10"
                label=""
                maxWidth="100px"
              />
            )}
          </div>
        </div>
      </Box>
      {caps.hourlyCap && (
        <div className="mt-4">
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              {MemoizedOtherComponent}
              {/* <OtherComponent /> */}
            </Suspense>
          </div>
        </div>
      )}

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

export default CapSettings;
