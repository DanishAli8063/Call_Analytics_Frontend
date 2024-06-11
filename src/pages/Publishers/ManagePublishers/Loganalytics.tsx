import React, { useState, useEffect } from "react";
import "./ManagePublishers.scss";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../../components/basicTable/BasicTable";
import DeleteIcon from "../../../components/icons/delete";
import EditIcon from "../../../components/icons/edit";
import PauseIcon from "../../../components/icons/pause";
import plusIcon from "../../assets/img/icons/plus.svg";
import CustomLabel from "../../../components/customLabel/CustomLabel";
import StatsIcon from "../../../components/icons/stats";
import theme from "../../../styles/theme";
import PersonAddIcon from "../../../components/icons/personAdd";
import PlusIcon from "../../../components/icons/plus";
import CustomSwitch from "../../../components/switch/Switch";
// import  { SingleSelect } from "../../../../components/dynamicDropdown/DynamicDropdown";/
import  { SingleSelect } from "../../../components/dynamicDropdown/DynamicDropdown";

function Loganalytics(): JSX.Element {
  const navigate = useNavigate();
  // Example usage
  const columns = [
    { title: "Name", align: "left" },
    { title: "Access To Recordings", align: "center" },
    { title: "Number Creation", align: "center" },
    { title: "Numbers Assigned", align: "center" },
    { title: "Live", align: "center" },
    { title: "Status", align: "center" },
    { title: "Actions", align: "left" },
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
  

  const rows = [
    {
      name: { value: "TeleTech Services", align: "left" },
      accessToRecordings: { value: <CustomSwitch />, align: "center" },
      createNumber: { value: <CustomSwitch />, align: "center" },
      total: { value: 0, align: "center" },
      live: { value: 0, align: "center" },
      status: { value: "Active", align: "center" },
      actions: { 
        value: [
          { icon: <PersonAddIcon />, onClick: () => {} },
          { icon: <StatsIcon />, onClick: () => {} },
          { icon: <PauseIcon />, onClick: () => {} },
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "left" 
      },
    },
    {
      name: { value: "TeleTech Services", align: "left" },
      accessToRecordings: { value: <CustomSwitch />, align: "center" },
      createNumber: { value: <CustomSwitch />, align: "center" },
      total: { value: 0, align: "center" },
      live: { value: 0, align: "center" },
      status: { value: "Active", align: "center" },
      actions: { 
        value: [
          { icon: <PersonAddIcon />, onClick: () => {} },
          { icon: <StatsIcon />, onClick: () => {} },
          { icon: <PauseIcon />, onClick: () => {} },
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "left" 
      },
    },
    {
      name: { value: "TeleTech Services", align: "left" },
      accessToRecordings: { value: <CustomSwitch />, align: "center" },
      createNumber: { value: <CustomSwitch />, align: "center" },
      total: { value: 0, align: "center" },
      live: { value: 0, align: "center" },
      status: { value: "Active", align: "center" },
      actions: { 
        value: [
          { icon: <PersonAddIcon />, onClick: () => {} },
          { icon: <StatsIcon />, onClick: () => {} },
          { icon: <PauseIcon />, onClick: () => {} },
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "left" 
      },
    },
    {
      name: { value: "You", align: "left" },
      accessToRecordings: { value: <CustomSwitch />, align: "center" },
      createNumber: { value: <CustomSwitch />, align: "center" },
      total: { value: 0, align: "center" },
      live: { value: 0, align: "center" },
      status: { value: "Active", align: "center" },
      actions: { 
        value: [
          { icon: <PersonAddIcon />, onClick: () => {} },
          { icon: <StatsIcon />, onClick: () => {} },
          { icon: <PauseIcon />, onClick: () => {} },
        ],
        align: "left" 
      },
    },
    // Additional rows...
  ];
  

  function CampaignsTable() {
    return <ReusableTable columns={columns} rows={rows} />;
  }
  return (
    <>
    <div className="flex justify-end pt-10 pr-10">
    <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            {/* <CustomLabel label="Buyer" helperText="s" /> */}
          </div>
          <div className="col-span-1" />
          <BuyerDropdown className="col-span-6 float-right" />
          </div>

    <Box className="px-6">
      <Typography
        className="headline-medium"
        marginBottom="34px"
        color={theme.palette.primary.main}
      >
        {/* Manage Publishers */}
      </Typography>
      
      {/* <Button
        variant="outlined"
        startIcon={<PlusIcon color="var(--redColor)" />}
        className="title-medium"
        sx={{
          padding: "8.5px 16px",
          textTransform: "none",
          border: "1px solid #E01E26",
          color: "#E01E26",
          marginBottom: "24px",
          borderRadius: "5px",
          "&:hover": {
            color: "#fff",
            backgroundColor: "var(--redColor)",
            "& svg": {
              fill: "#fff",
            },
          },
        }}
        onClick={() => navigate("/publishers/add")}
      >
        Add Publisher
      </Button> */}
      <CampaignsTable />
    </Box>
    </>
  );
}

export default Loganalytics;
