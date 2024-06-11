import {
  Box,
  Button,
  Checkbox,
  Divider,
  ListItemText,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, ElementType } from "react";
import theme from "../../../../styles/theme";
import plusIcon from "../../../../assets/img/icons/plus.svg";
import CustomLabel from "../../../../components/customLabel/CustomLabel";
import ReusableTable from "../../../../components/basicTable/BasicTable";
import DeleteIcon from "../../../../components/icons/delete";
import CollapsibleTable from "../../../../components/collapsibleTable/CollapsibleTable";
import PlusIcon from "../../../../components/icons/plus";
import NumberDropdown from "../../../../components/dynamicDropdown/NumberDropdown";
import { SingleSelect } from "../../../../components/dynamicDropdown/DynamicDropdown";

function Publishers(): JSX.Element {
  const [selectedPublisher, setSelectedPublisher] = React.useState<string>();
  const [showAddPublisher, setShowAddPublisher] =
    React.useState<boolean>(false);
  const [showAddNumber, setShowAddNumber] = React.useState<boolean>(false);

  useEffect(() => {
    if (selectedPublisher) setShowAddNumber(true);
    else setShowAddNumber(false);
  }, [selectedPublisher]);

  // const columns = ["Publisher", "Phone Numbers", "Enabled", "Actions"];

  // const rows = [
  //   {
  //     name: "Demo",
  //     phoneNumbers: "+92 823 293 7929",
  //     enabled: "Yes",
  //     actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
  //   },
  //   {
  //     name: "Demo",
  //     phoneNumbers: "+92 823 293 7929",
  //     enabled: "No",
  //     actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
  //   },
  //   {
  //     name: "Demo",
  //     phoneNumbers: "+92 823 293 7949",
  //     enabled: "Yes",
  //     actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
  //   },
  // ];

  // const rows2 = [
  //   {
  //     name: "Test",
  //     phoneNumbers: "+92 823 293 7929",
  //     enabled: "Yes",
  //     actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
  //   },
  //   {
  //     name: "Test",
  //     phoneNumbers: "+92 823 293 7929",
  //     enabled: "No",
  //     actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
  //   },
  //   {
  //     name: "Test",
  //     phoneNumbers: "+92 823 293 7949",
  //     enabled: "Yes",
  //     actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
  //   },
  // ];

  // function CampaignsTable({ className = "" }) {
  //   return (
  //     <ReusableTable className={className} columns={columns} rows={rows} />
  //   );
  // }
  // function CampaignsTable2({ className = "" }) {
  //   return (
  //     <ReusableTable className={className} hideHeader columns={columns} rows={rows2} />
  //   );
  // }



  const handlePublisherChange = (
    event: SelectChangeEvent<typeof selectedPublisher>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedPublisher(value);
  };

  const publisherOptions = [
    {
      value: 10,
      component: PublisherOptionComponent({ publisherName: "Publisher-1" }),
    },
    {
      value: 20,
      component: PublisherOptionComponent({ publisherName: "Publisher-1" }),
    },
    {
      value: 30,
      component: PublisherOptionComponent({ publisherName: "Publisher-1" }),
    },
  ];


  function PublisherOptionComponent({ publisherName }) {
    return (
      <Box>
        <Typography className="title-medium" color="var(--blackColor)">
          {publisherName}
        </Typography>
      </Box>
    );
  }



  function PublisherDropdown({ className }) {
    return (
      <SingleSelect
        label="Choose Publisher"
        options={publisherOptions}
        handleChange={handlePublisherChange}
        value={selectedPublisher}
        className={className}
      />
    );
  }



  return (
    <>
      <Typography
        className="headline-medium"
        marginBottom="16px"
        color={theme.palette.primary.main}
      >
        Publishers
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
            '& svg':{
              fill: '#fff'
            }
          },
        }}
        onClick={() => setShowAddPublisher((prev) => !prev)}
      >
        Add Publisher
      </Button>
      {showAddPublisher && (
        <>
          <Box className="flex justify-center">
            <div className="grid gap-4 grid-cols-10 w-full gap-y-8">
              <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                <CustomLabel label="Publisher" helperText="To receive calls in a campaign, you must include a publisher. Adding a publisher to the campaign allows for improved tracking capabilities." />
              </div>
              <div className="col-span-1" />
              <PublisherDropdown className="col-span-6" />
              {showAddNumber && (
                <>
                  <div className="flex justify-end items-center gap-x-1.5 col-span-3">
                    <CustomLabel label="Number" helperText="Select a number from the list created by the publisher" />
                  </div>
                  <div className="col-span-1" />
                  <NumberDropdown className="col-span-6" />
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
                  Add
                </Button>
              </div>
            </div>
          </Box>
        </>
      )}
      <Box
        sx={{
          marginTop: "64px",
        }}
      >
        {/* <CampaignsTable  /> */}
        {/* <CampaignsTable2  /> */}
        <CollapsibleTable />
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

export default Publishers;
