import {
  Box,
  Button,
  Divider,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { Suspense, useMemo, useState } from "react";
import theme from "../../../../../styles/theme";
import CustomFormField from "../../../../../components/customFormField/CustomFormField";
import CustomLabel from "../../../../../components/customLabel/CustomLabel";
import CustomSwitch from "../../../../../components/switch/Switch";


function ConcurrencySettings(): JSX.Element {
  const [toggles, setToggles] = useState({
    maxConcurrency: false,
    hourlyCap: false,
  });

  const [hourlyCapAdvanced, sethourlyCapAdvanced] = useState(false);

  const OtherComponent = React.lazy(() => import("./HourlyCapTable"));
  const MemoizedOtherComponent = useMemo(() => <OtherComponent />, []);

  return (
    <>
      <Typography
        className="headline-medium"
        marginBottom="56px"
        color={theme.palette.primary.main}
      >
        Concurrency Settings
      </Typography>
      <Box className="flex justify-center">
        <div className="cap-form-grid">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Max Concurrency" helperText="" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6 flex items-center gap-x-12">
            <CustomSwitch
              value={toggles.maxConcurrency}
              setValue={() =>
                setToggles((prevCaps) => ({
                  ...prevCaps,
                  maxConcurrency: !prevCaps.maxConcurrency,
                }))
              }
            />
            {toggles.maxConcurrency && (
              <CustomFormField
                minimal
                className="col-span-10"
                label=""
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
              value={toggles.hourlyCap}
              setValue={() =>
                setToggles((prevCaps) => ({
                  ...prevCaps,
                  hourlyCap: !prevCaps.hourlyCap,
                }))
              }
            />
            {toggles.hourlyCap && (
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
                  onClick={() => sethourlyCapAdvanced((prev) => !prev)}
                >
                  {hourlyCapAdvanced ? "Basic" : "Advanced"}
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
        </div>
      </Box>
      {toggles.hourlyCap && hourlyCapAdvanced && (
        <div className="mt-4">
          {/* <HourlyCapTable /> */}
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              {MemoizedOtherComponent}
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

export default ConcurrencySettings;
