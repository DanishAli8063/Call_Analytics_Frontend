import { Box, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../../components/basicTable/BasicTable";
import EditIcon from "../../../components/icons/edit";
import PauseIcon from "../../../components/icons/pause";
import theme from "../../../styles/theme";
import plusIcon from "../../assets/img/icons/plus.svg";

import "./ManageTargets.scss";
import PlusIcon from "../../../components/icons/plus";

function ManageTargets(): JSX.Element {
  const navigate = useNavigate();
  // Example usage
  const columns = [
    { title: "Name", align: "left" },
    { title: "Buyer", align: "left" },
    { title: "Number Type", align: "left" },
    { title: "Destination", align: "left" },
    { title: "Status", align: "center" },
    { title: "Actions", align: "right" },
  ];

  const rows = [
    {
      name: { value: "Medi 1", align: "left" },
      buyer: { value: "Medi buyer", align: "left" },
      numberType: { value: "Toll free", align: "left" },
      destination: { value: "+1 (908) 566 6767", align: "left" },
      status: { value: "Active", align: "center" },
      actions: {
        value: [
          { icon: <PauseIcon />, onClick: () => {} },
          { icon: <EditIcon />, onClick: () => {} },
        ],
        align: "right",
      },
    },
    {
      name: { value: "Medi 2", align: "left" },
      buyer: { value: "Medi buyer", align: "left" },
      numberType: { value: "Toll free", align: "left" },
      destination: { value: "+1 (908) 566 6767", align: "left" },
      status: { value: "Active", align: "center" },
      actions: {
        value: [
          { icon: <PauseIcon />, onClick: () => {} },
          { icon: <EditIcon />, onClick: () => {} },
        ],
        align: "right",
      },
    },
    {
      name: { value: "Solar 1", align: "left" },
      buyer: { value: "Solar buyer", align: "left" },
      numberType: { value: "Toll free", align: "left" },
      destination: { value: "+1 (908) 566 6767", align: "left" },
      status: { value: "Active", align: "center" },
      actions: {
        value: [
          { icon: <PauseIcon />, onClick: () => {} },
          { icon: <EditIcon />, onClick: () => {} },
        ],
        align: "right",
      },
    },
    {
      name: { value: "Solar 2", align: "left" },
      buyer: { value: "Solar Buyer", align: "left" },
      numberType: { value: "Toll free", align: "left" },
      destination: { value: "+1 (908) 566 6767", align: "left" },
      status: { value: "Active", align: "center" },
      actions: {
        value: [
          { icon: <PauseIcon />, onClick: () => {} },
          { icon: <EditIcon />, onClick: () => {} },
        ],
        align: "right",
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
        Manage Targets
      </Typography>
      <Button
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
        onClick={() => navigate("/manage-targets/add")}
      >
        Create target
      </Button>
      <CampaignsTable />
    </Box>
  );
}

export default ManageTargets;
