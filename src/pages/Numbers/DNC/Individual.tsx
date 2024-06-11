import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import ReusableTable from "../../../components/basicTable/BasicTable";
import DeleteIcon from "../../../components/icons/delete";
import EditIcon from "../../../components/icons/edit";
import CustomFormField from "../../../components/customFormField/CustomFormField";
import CustomLabel from "../../../components/customLabel/CustomLabel";
import DynamicTabs from "../../../components/dynamicTabs/DynamicTabs";
import CustomModal from "../../../components/modal/Modal";
import CampaignsDropdown from "../../../components/dynamicDropdown/CampaignsDropdown";
import CustomTab from "../../../components/dynamicTabs/CustomTab";

function Individual(): JSX.Element {
  const [selectedNumbers, setSelectedNumbers] = React.useState<string[]>([]);
  const [openNumberModal, setOpenNumberModal] = useState<boolean>(true);
  const [selectedBlockTab, setSelectedBlockTab] = useState("one");
  const [selectedScopeTab, setSelectedScopeTab] = useState("one");

  const [selectedTabs, setSelectedTabs] = useState({
    Global: false,
    Campaigns: true,
    Targets: false,
  });

  const tabLabels = ['Global', 'Campaigns', 'Targets'];

  const scopeTabs = [
    { value: "one", label: "Global" },
    { value: "two", label: "Campaings" },
    { value: "three", label: "Targets" },
  ];
  const blockTabs = [
    { value: "one", label: "Number" },
    { value: "two", label: "Prefix" },
  ];

  const handleBlockTabChange = (event, newValue) => {
    setSelectedBlockTab(newValue);
  };

  const handleScopeTabChange = (event, newValue) => {
    setSelectedScopeTab(newValue);
  };

  const columns = [
    { title: "Blocked number", align: "left" },
    { title: "Scope", align: "left" },
    { title: "Name", align: "left" },
    { title: "Blocked until", align: "left" },
    { title: "Actions", align: "left" },
  ];

  const rows = [
    {
      number: { value: "+1 (908) 927 1657", align: "left" },
      scope: { value: "Global", align: "left" },
      name: { value: "-", align: "left" },
      blockedUntil: { value: "24/06/2023", align: "left" },
      actions: {
        value: [
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "left",
      },
    },
    {
      number: { value: "+1 (908) 927 1657", align: "left" },
      scope: { value: "Global", align: "left" },
      name: { value: "Medicare campaign", align: "left" },
      blockedUntil: { value: "24/06/2023", align: "left" },
      actions: {
        value: [
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
        ],
        align: "left",
      },
    },
    {
      number: { value: "+1 (908) 927 1657", align: "left" },
      scope: { value: "Global", align: "left" },
      name: { value: "Medi 2", align: "left" },
      blockedUntil: { value: "24/06/2023", align: "left" },
      actions: {
        value: [
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
    <>
      <CustomModal
        openVerifyModal={openNumberModal}
        setOpenVerifyModal={setOpenNumberModal}
        minWidth={900}
        sx={{
          padding: "5% 5%",
        }}
      >
        <div className="grid gap-4 grid-cols-10 w-full gap-y-8">
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Block" helperText="s" />
          </div>
          <div className="col-span-1" />

          <div className="col-span-6 flex flex-col">
            <DynamicTabs
              tabs={blockTabs}
              className="w-full"
              selectedTab={selectedBlockTab}
              handleTabChange={handleBlockTabChange}
            />
          </div>
          {selectedBlockTab == "one" ? (
            <>
              <div className="flex justify-end items-center col-span-3">
                <Typography className="title-small" color="var(--blackColor)">
                  Prefix
                </Typography>
              </div>
              <div className="col-span-1" />
              <CustomFormField className="col-span-6" label="" />
            </>
          ) : (
            <>
              <div className="flex justify-end items-center col-span-3">
                <Typography className="title-small" color="var(--blackColor)">
                  Number
                </Typography>
              </div>
              <div className="col-span-1" />
              <CustomFormField className="col-span-6" label="" />
            </>
          )}
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Scope" helperText="s" />
          </div>
          <div className="col-span-1" />

          <div className="col-span-6 flex flex-col">
            {/* <DynamicTabs
              tabs={scopeTabs}
              className="w-full"
              selectedTab={selectedScopeTab}
              handleTabChange={handleScopeTabChange}
            /> */}

            <CustomTab selectedTabs={selectedTabs} setSelectedTabs={setSelectedTabs} tabLabels={tabLabels}  />
          </div>
          {selectedTabs.Campaigns ? (
            <>
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel
                  label="Campaign"
                  helperText="To receive calls in a campaign, you must include a publisher. Adding a publisher to the campaign allows for improved tracking capabilities."
                />
              </div>
              <div className="col-span-1" />
              <CampaignsDropdown className="col-span-6" />
            </>
          ) : (
            <>
              {/* <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel
                  label="Publisher"
                  helperText="To receive calls in a campaign, you must include a publisher. Adding a publisher to the campaign allows for improved tracking capabilities."
                />
              </div>
              <div className="col-span-1" />
              <CampaignDropdown className="col-span-6" /> */}
            </>
          )}
          <div className="flex justify-end items-center gap-x-1.5 col-span-3">
            <CustomLabel label="Prefix" />
          </div>
          <div className="col-span-1" />
          <CustomFormField className="col-span-6" label="Optional" />

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
              onClick={() => setOpenNumberModal(true)}
            >
              Create
            </Button>
          </div>
        </div>
      </CustomModal>
      <Box className="px-6 py-7">
        <Button
          variant="outlined"
          className="title-medium"
          sx={{
            padding: "8.5px 16px",
            textTransform: "none",
            border: "1px solid #E01E26",
            color: "#E01E26",
            marginBottom: "24px",
            width: "200px",
            borderRadius: "5px",
            "&:hover": {
              color: "#fff",
              backgroundColor: "var(--redColor)",
              "& svg": {
                fill: "#fff",
              },
            },
          }}
          onClick={() => setOpenNumberModal(true)}
        >
          Add Number
        </Button>
        <CampaignsTable />
      </Box>
    </>
  );
}

export default Individual;
