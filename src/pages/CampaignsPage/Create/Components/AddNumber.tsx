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
import PlusIcon from "../../../../components/icons/plus";
import { SingleSelect } from "../../../../components/dynamicDropdown/DynamicDropdown";

function AddNumber(): JSX.Element {
  const [showAddPublisher, setShowAddPublisher] =
    React.useState<boolean>(false);

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

  function PublisherDropdown({ className = "" }) {
    return (
      <SingleSelect
        label="Choose Number"
        options={publisherOptions}
        className={className}
      />
    );
  }

  return (
    <>
      {!showAddPublisher ? (
        <Button
          variant="outlined"
          startIcon={<PlusIcon color="var(--redColor)" />}
          className="title-medium"
          sx={{
            padding: "8.5px 16px",
            textTransform: "none",
            border: "1px solid #E01E26",
            color: "#E01E26",
            borderRadius: "5px",
            "&:hover": {
              color: "#fff",
              backgroundColor: "var(--redColor)",
              "& svg": {
                fill: "#fff",
              },
            },
          }}
          onClick={() => setShowAddPublisher((prev) => !prev)}
        >
          Add Number
        </Button>
      ) : (
        <>
          <Box className="flex flex-col items-end w-full gap-y-2">
            <PublisherDropdown />
            <Button
              variant="contained"
              className="title-medium"
              sx={{
                padding: "8.5px 16px",
                textTransform: "none",
                width: "100%",
                maxWidth: "200px",
                color: "#fff",
                borderRadius: "5px",
                boxShadow: "unset !important",
              }}
              onClick={() => setShowAddPublisher((prev) => !prev)}
            >
              Add
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export default AddNumber;
