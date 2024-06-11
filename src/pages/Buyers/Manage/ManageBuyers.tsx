import { Box, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PauseIcon from "../../../components/icons/pause";
import EditIcon from "../../../components/icons/edit";
import ReusableTable from "../../../components/basicTable/BasicTable";
import theme from "../../../styles/theme";
import PlusIcon from "../../../components/icons/plus";
import CustomSwitch from "../../../components/switch/Switch";
import PersonAddIcon from "../../../components/icons/personAdd";
import DeleteIcon from "../../../components/icons/delete";

function ManageBuyers(): JSX.Element {
  const navigate = useNavigate();
  const columns = [
    { title: "Name", align: "left" },
    { title: "Can Pause Targets", align: "center" },
    { title: "Set Target Call & Concurrency Cap", align: "center" },
    { title: "Restrict Duplicates", align: "left" },
    { title: "Status", align: "center" },
    { title: "Actions", align: "left" },
  ];

  const rows = [
    {
      name: { value: "Medi buyer", align: "left" },
      canPauseTarget: { value: <CustomSwitch />, align: "center" },
      setCallTarget: { value: <CustomSwitch />, align: "center" },
      restrictDuplicates: { value: "Do not Restrict", align: "left" },
      status: { value: "Active", align: "center" },
      actions: {
        value: [
          { icon: <PersonAddIcon />, onClick: () => {} },
          { icon: <PauseIcon />, onClick: () => {} },
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "left",
      },
    },
    {
        name: { value: "Solar buyer", align: "left" },
        canPauseTarget: { value: <CustomSwitch />, align: "center" },
        setCallTarget: { value: <CustomSwitch />, align: "center" },
        restrictDuplicates: { value: "Do not Restrict", align: "left" },
        status: { value: "Active", align: "center" },
        actions: {
          value: [
            { icon: <PersonAddIcon />, onClick: () => {} },
            { icon: <PauseIcon />, onClick: () => {} },
            { icon: <EditIcon />, onClick: () => {} },
            { icon: <DeleteIcon />, onClick: () => {} },
          ],
          align: "left",
        },
      },

  ];

  function CampaignsTable() {
    return <ReusableTable columns={columns} rows={rows} />;
  }
  return (
    <Box className="px-6 py-7">
      <Typography
        className="headline-medium"
        marginBottom="34px"
        color={theme.palette.primary.main}
      >
        Manage Buyers
      </Typography>
      <Button
        variant="outlined"
        startIcon={<PlusIcon color="var(--redColor)" />}
        className="title-medium"
        onClick={()=>navigate('/manage-buyers/add')}
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
      >
        Create Buyer
      </Button>
      <CampaignsTable />
    </Box>
  );
}

export default ManageBuyers;
