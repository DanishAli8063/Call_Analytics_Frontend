import {
  Box,
  Button,
  Divider,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import DynamicDropdownMenu from "../../../../components/dynamicDropdown/DynamicDropdown";
import EditIcon from "../../../../components/icons/edit";

function CallRouting(): JSX.Element {
  const columns = [
    { title: "Name", align: "left" },
    { title: "Status", align: "center" },
    { title: "Destination", align: "center" },
    { title: "Add", align: "right" },
  ];
  
  const columns1 = [
    { title: "Name", align: "left" },
    { title: "Priority", align: "center" },
    { title: "Weight", align: "center" },
    { title: "Destination", align: "center" },
    { title: "Revenue", align: "center" },
    { title: "Actions", align: "right" },
  ];
  

  const [openVerifyModal, setOpenVerifyModal] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState("one");
  const [payoutOn, setPayoutOn] = useState("Call Length");


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    console.log(selectedTab);
  });

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
    }
  ];
  const rows = [
    {
      name: { value: "RignLink", align: "left" },
      status: { value: "Active", align: "center" },
      destination: { value: "+1 (908) 334 2046", align: "center" },
      actions: { 
        value: [
          {
            icon: <ArrowIcon />,
            onClick: () => {
              setOpenVerifyModal(true);
            },
          },
        ],
        align: "right" 
      },
    },
    {
      name: { value: "QuickCall", align: "left" },
      status: { value: "Active", align: "center" },
      destination: { value: "+1 (908) 334 2046", align: "center" },
      actions: { 
        value: [
          { icon: <ArrowIcon />, onClick: () => setOpenVerifyModal(true) },
        ],
        align: "right" 
      },
    },
  ];
  
  const rows1 = [
    {
      name: { value: "CallPro", align: "left" },
      priority: { value: <NumberInput />, align: "center" },
      weight: { value: <NumberInput />, align: "center" },
      destination: { value: "+1 (908) 334 2046", align: "center" },
      revenue: { value: "$20", align: "center" },
      actions: { 
        value: [
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "right" 
      },
    },
    {
      name: { value: "CallEase", align: "left" },
      priority: { value: <NumberInput />, align: "center" },
      weight: { value: <NumberInput />, align: "center" },
      destination: { value: "+1 (908) 334 2046", align: "center" },
      revenue: { value: "$20", align: "center" },
      actions: { 
        value: [
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "right" 
      },
    },
    {
      name: { value: "ConnectPlus", align: "left" },
      priority: { value: <NumberInput />, align: "center" },
      weight: { value: <NumberInput />, align: "center" },
      destination: { value: "+1 (908) 334 2046", align: "center" },
      revenue: { value: "$20", align: "center" },
      actions: { 
        value: [
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "right" 
      },
    },
  ];
  
  function TargetsTable({ className = "" }) {
    return (
      <ReusableTable
        className={className}
        blackBorder
        columns={columns}
        rows={rows}
      />
    );
  }

  function RoutesTable({ className = "" }) {
    return (
      <ReusableTable
        className={className}
        blackBorder
        columns={columns1}
        rows={rows1}
      />
    );
  }


  return (
    <>
      <CustomModal
        openVerifyModal={openVerifyModal}
        setOpenVerifyModal={setOpenVerifyModal}
        minWidth={900}
        sx={{
          padding: "5% 5%",
        }}
      >
        <div className="grid gap-4 grid-cols-10 w-full gap-y-8">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Name" />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="Callwise Target" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Priority" />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="1" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Weight" />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="1" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Revenue" />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="$" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Duplicate Conversion" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6 flex flex-col gap-y-5">
            <DynamicTabs
              tabs={tabs}
              className="w-full"
              selectedTab={selectedTab}
              handleTabChange={handleTabChange}
            />
          </div>
          {selectedTab == "three" && (
            <>
              <div className="col-span-4" />
              <div className=" col-span-6 flex items-center gap-x-2">
                <CustomFormField
                  minimal
                  className="col-span-10"
                  label=""
                  maxWidth="100px"
                />
                <Typography className="body-large">Hours</Typography>
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
              onClick={() => setOpenVerifyModal(false)}
            >
              Save
            </Button>
          </div>
        </div>
      </CustomModal>
      <Typography
        className="headline-medium"
        marginBottom="56px"
        color={theme.palette.primary.main}
      >
        Call routing
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridColumnGap: "20px",
        }}
      >
        <Box>
          <Typography className="title-medium" color="var(--blackColor)">
            Targets
          </Typography>
          <TextField
            id="standard-basic"
            className="label-medium"
            sx={{
              marginTop: "24px",
              marginLeft: "20px",
              marginBottom: "18px",
              "& .MuiInputBase-input, & .MuiInputBase-root, input::placeholder":
                {
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  fontFamily: "inherit",
                  lineHeight: "inherit",
                  opacity: 1,
                },
            }}
            placeholder="Search"
            variant="standard"
          />
          <TargetsTable />
        </Box>
        <Box>
          <Typography className="title-medium" color="var(--blackColor)">
            Routing Plan
          </Typography>
          <Box
            sx={{
              marginTop: "24px",
            }}
          >
            <RoutesTable />
          </Box>
        </Box>
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

export default CallRouting;
