import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PlusIcon from "../../../components/icons/plus";
import ReusableTable from "../../../components/basicTable/BasicTable";
import DeleteIcon from "../../../components/icons/delete";
import EditIcon from "../../../components/icons/edit";
import PersonAddIcon from "../../../components/icons/personAdd";
import CustomFormField from "../../../components/customFormField/CustomFormField";
import CustomLabel from "../../../components/customLabel/CustomLabel";
import DynamicTabs from "../../../components/dynamicTabs/DynamicTabs";
import CustomModal from "../../../components/modal/Modal";
import CustomSwitch from "../../../components/switch/Switch";
import theme from "../../../styles/theme";

function ManageUsers(): JSX.Element {
  const [openInviteModal, setOpenInviteModal] = useState<boolean>(false);

  const [selectedTab, setSelectedTab] = useState("one");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabs = [
    { value: "one", label: "Admin" },
    { value: "two", label: "Report Access" },
  ];

  const columns = [
    { title: "Name", align: "left" },
    { title: "Email", align: "left" },
    { title: "Role", align: "left" },
    { title: "Invitaion", align: "left" },
    { title: "Can export reports", align: "left" },
    { title: "Actions", align: "left" },
  ];

  const rows = [
    {
      name: { value: "Tele Tech Services", align: "left" },
      email: { value: "teletech@gmail.com", align: "left" },
      role: { value: "Report Access", align: "left" },
      invitation: { value: "Accepted", align: "left" },
      export: { value: "Yes", align: "left" },
      actions: {
        value: [{ icon: <DeleteIcon />, onClick: () => {} }],
        align: "left",
      },
    },
    {
      name: { value: "Call Link USA", align: "left" },
      email: { value: "call_link@gmail.com", align: "left" },
      role: { value: "Admin", align: "left" },
      invitation: { value: "Accepted", align: "left" },
      export: { value: "Yes", align: "left" },
      actions: {
        value: [{ icon: <DeleteIcon />, onClick: () => {} }],
        align: "left",
      },
    },
    {
      name: { value: "Publishing Innovators", align: "left" },
      email: { value: "Innovators_publisher01@gmail.com", align: "left" },
      role: { value: "Publisher manager", align: "left" },
      invitation: { value: "Accepted", align: "left" },
      export: { value: "Yes", align: "left" },
      actions: {
        value: [{ icon: <DeleteIcon />, onClick: () => {} }],
        align: "left",
      },
    },
    {
      name: { value: "Prime partners", align: "left" },
      email: { value: "primepartners@gmail.com", align: "left" },
      role: { value: "Buyer Manager", align: "left" },
      invitation: { value: "Accepted", align: "left" },
      export: { value: "Yes", align: "left" },
      actions: {
        value: [{ icon: <DeleteIcon />, onClick: () => {} }],
        align: "left",
      },
    },
    {
      name: { value: "Dialease solar", align: "left" },
      email: { value: "supportlink@gmail.com", align: "left" },
      role: { value: "Publisher", align: "left" },
      invitation: { value: "Accepted", align: "left" },
      export: { value: "Yes", align: "left" },
      actions: {
        value: [{ icon: <DeleteIcon />, onClick: () => {} }],
        align: "left",
      },
    },
    {
      name: { value: "Solar Buyer", align: "left" },
      email: { value: "supportlink@gmail.com", align: "left" },
      role: { value: "Buyer", align: "left" },
      invitation: { value: "Accepted", align: "left" },
      export: { value: "Yes", align: "left" },
      actions: {
        value: [{ icon: <DeleteIcon />, onClick: () => {} }],
        align: "left",
      },
    },
  ];

  function UsersTable() {
    return <ReusableTable alignLeft columns={columns} rows={rows} />;
  }

  return (
    <>
      <CustomModal
        openVerifyModal={openInviteModal}
        setOpenVerifyModal={setOpenInviteModal}
        minWidth={900}
        sx={{
          padding: "5% 5%",
        }}
      >
        <div className="grid gap-4 grid-cols-10 w-full gap-y-8">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="First Name" />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="John" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Last Name" />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="Smith" />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Email" />
          </div>
          <div className="col-span-1" />
          <CustomFormField
            className="col-span-6"
            label="supportemail@gmail.com"
          />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Confirm Email" />
          </div>
          <div className="col-span-1" />
          <CustomFormField
            className="col-span-6"
            label="supportemail@gmail.com"
          />
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Role" />
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
          {selectedTab == "two" && (
            <>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Can Export Reports" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-6">
                <CustomSwitch />
              </div>
            </>
          )}
          <div className="col-span-4" />
          <div className="col-span-6">
            <div className="flex gap-x-5">
              <Button
                variant="outlined"
                className="title-medium"
                sx={{
                  padding: "8.5px 16px",
                  textTransform: "none",
                  width: "100%",
                  maxWidth: "150px",
                  borderRadius: "5px",
                  borderColor: "var(--redColor)",
                  boxShadow: "unset !important",
                  marginTop: "56px",
                }}
                onClick={() => setOpenInviteModal(false)}
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
                  marginTop: "56px",
                }}
                onClick={() => setOpenInviteModal(false)}
              >
                Invite
              </Button>
            </div>
          </div>
        </div>
      </CustomModal>
      <Box className="px-6 py-7">
        {/* <Typography
          className="headline-small"
          padding="13px 32px"
          color="#fff"
          sx={{
            backgroundColor: "var(--redColor)",
          }}
        >
          User Management
        </Typography> */}
        <Typography
          className="headline-medium"
          color={theme.palette.primary.main}
        >
          Manage Users
        </Typography>
        <Box height="40px" />
        <Button
          variant="outlined"
          startIcon={<PlusIcon color="var(--redColor)" />}
          onClick={() => setOpenInviteModal(true)}
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
        >
          Invite User
        </Button>
        <UsersTable />
        <Box height={300} />
      </Box>
    </>
  );
}

export default ManageUsers;
