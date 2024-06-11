import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  FormGroup,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../../components/basicTable/BasicTable";
import DeleteIcon from "../../../components/icons/delete";
import EditIcon from "../../../components/icons/edit";
import PauseIcon from "../../../components/icons/pause";
import plusIcon from "../../assets/img/icons/plus.svg";

import StatsIcon from "../../../components/icons/stats";
import theme from "../../../styles/theme";
import PersonAddIcon from "../../../components/icons/personAdd";
import PlusIcon from "../../../components/icons/plus";
import CustomFormField from "../../../components/customFormField/CustomFormField";
import CustomLabel from "../../../components/customLabel/CustomLabel";
import CustomModal from "../../../components/modal/Modal";
import CustomSwitch from "../../../components/switch/Switch";
function SelectComponent() {
  const checkboxNames = [
    "Solar 1",
    "Solar 2",
    "Medi 1",
    "Medi 2",
  ];
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any[]>([]);
  const [unselectedCheckboxes, setUnselectedCheckboxes] =
    useState<any[]>(checkboxNames);

  const handleChange = (name, select) => {
    const checkboxName = name;
    if (select) {
      setSelectedCheckboxes((prevSelectedCheckboxes) => [
        ...prevSelectedCheckboxes,
        checkboxName,
      ]);
      setUnselectedCheckboxes((prevUnselectedCheckboxes) =>
        prevUnselectedCheckboxes.filter((name) => name !== checkboxName)
      );
    } else {
      setSelectedCheckboxes((prevSelectedCheckboxes) =>
        prevSelectedCheckboxes.filter((name) => name !== checkboxName)
      );
      setUnselectedCheckboxes((prevUnselectedCheckboxes) => [
        ...prevUnselectedCheckboxes,
        checkboxName,
      ]);
    }
  };

  const checkboxList = checkboxNames.map((name) => ({
    name: name,
    label: name,
  }));

  const SearchField = ({ placeholder }) => {
    return (
      <TextField
        sx={{
          height: "40px",
          padding: "0px",
          marginBottom: "6px",
          "input::placeholder": {
            opacity: "1 !important",
          },
          input: {
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "120%",
          },
          "& .MuiInputBase-input": {
            padding: "7px !important",
          },
          "& .MuiInput-root::before ,.MuiInput-root::after": {
            // borderWidth: "0px !important",
          },
        }}
        placeholder={placeholder}
        variant="standard"
        fullWidth
      />
    );
  };

  return (
    <>
      <div className="flex justify-between">
        <Box>
          <FormControl component="fieldset" variant="standard">
            <SearchField placeholder="Search Available" />
            <FormGroup
              sx={{
                boxShadow:
                  "0px 1px 3px 1px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.00)",
                padding: "0px",
                height: "200px",
                flexWrap: "nowrap",
                borderLeft: "2px solid black",
                overflow: "auto",
              }}
            >
              {checkboxList.map((checkbox) => {
                if (unselectedCheckboxes.includes(checkbox.name)) {
                  return (
                    <Button
                      variant="contained"
                      className="body-medium"
                      onClick={() => handleChange(checkbox.name, true)}
                      sx={{
                        padding: "8.5px 16px",
                        textTransform: "none",
                        width: "100%",
                        textAlign: "start",
                        color: "#000",
                        justifyContent: "left",
                        borderRadius: "0px",
                        backgroundColor: "transparent",
                        boxShadow: "unset !important",
                        "&:hover": {
                          backgroundColor: "#000",
                          color: "#fff",
                        },
                      }}
                    >
                      {checkbox.label}
                    </Button>
                  );
                } else return null;
              })}
            </FormGroup>
          </FormControl>
        </Box>
        <Box width="40px" />
        <FormControl component="fieldset" variant="standard">
          <SearchField placeholder="Search Selected" />
          <FormGroup
            sx={{
              boxShadow:
                "0px 1px 3px 1px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.00)",
              padding: "0px",
              height: "200px",
              flexWrap: "nowrap",
              overflow: "auto",
            }}
          >
            {checkboxList.map((checkbox) => {
              if (selectedCheckboxes.includes(checkbox.name)) {
                return (
                  <Button
                    variant="contained"
                    className="body-medium"
                    onClick={() => handleChange(checkbox.name, false)}
                    sx={{
                      padding: "8.5px 16px",
                      textTransform: "none",
                      width: "100%",
                      color: "#000",
                      textAlign: "start",
                      justifyContent: "left",
                      borderRadius: "0px",
                      backgroundColor: "transparent",
                      boxShadow: "unset !important",
                      "&:hover": {
                        backgroundColor: "#000",
                        color: "#fff",
                      },
                    }}
                  >
                    {checkbox.label}
                  </Button>
                );
              } else {
                return null;
              }
            })}
          </FormGroup>
        </FormControl>
      </div>
    </>
  );
}

function BuyerGroups(): JSX.Element {
  const [openAddGroupModal, setOpenAddGroupModal] = useState<boolean>(false);

  const columns = [
    { title: "Name", align: "left" },
    { title: "Admin Report View", align: "center" },
    { title: "Read Only", align: "center" },
    { title: "Type", align: "left" },
    { title: "Actions", align: "right" },
  ];

  const rows = [
    {
      name: { value: "Prime Partener", align: "left" },
      reportView: { value: <CustomSwitch />, align: "center" },
      readOnly: { value: <CustomSwitch />, align: "center" },
      type: { value: "Buyer Manager", align: "left" },
      actions: {
        value: [
          { icon: <PersonAddIcon />, onClick: () => {} },
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "right",
      },
    },
    {
      name: { value: "Prime Innovators", align: "left" },
      reportView: { value: <CustomSwitch />, align: "center" },
      readOnly: { value: <CustomSwitch />, align: "center" },
      type: { value: "Buyer Manager", align: "left" },
      actions: {
        value: [
          { icon: <PersonAddIcon />, onClick: () => {} },
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "right",
      },
    },
  ];
  

  function CampaignsTable() {
    return <ReusableTable columns={columns} rows={rows} />;
  }
  return (
    <>
      <CustomModal
        openVerifyModal={openAddGroupModal}
        setOpenVerifyModal={setOpenAddGroupModal}
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
          <CustomFormField className="col-span-6" label="Solar Buyer" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Admin Report View" helperText="" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <CustomSwitch />
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Read only" helperText="" />
          </div>
          <div className="col-span-1" />
          <div className="col-span-6">
            <CustomSwitch />
          </div>
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Select Publishers" helperText="" />
          </div>
          <div className="col-span-1" />

          <div className="col-span-6">
            <SelectComponent />
          </div>
          <div className="col-span-4" />
          <div className="col-span-6">
            <div className="mt-[56px] flex col-span-6 justify-start">
              <Button
                variant="outlined"
                className="title-medium"
                onClick={() => setOpenAddGroupModal(false)}
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
                onClick={() => setOpenAddGroupModal(false)}
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
                Save
              </Button>
            </div>
          </div>
        </div>
      </CustomModal>
      <Box className="px-6 py-7">
        <Typography
          className="headline-medium"
          marginBottom="34px"
          color={theme.palette.primary.main}
        >
          Manage buyer group
        </Typography>
        <Button
          variant="outlined"
          startIcon={<PlusIcon color="var(--redColor)" />}
          className="title-medium"
          onClick={() => setOpenAddGroupModal(true)}
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
          Add new buyer Group
        </Button>
        <CampaignsTable />
      </Box>
    </>
  );
}

export default BuyerGroups;
