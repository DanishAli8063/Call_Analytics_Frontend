import {
  Box,
  Typography,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import LogTable from "../../components/basicTable/LogTable";
import theme from "../../styles/theme";
import SearchIcon from "../../components/icons/search";

import { SingleSelect } from "../../components/dynamicDropdown/DynamicDropdown";
import "./ManageNumber.scss"
const { server_address } = require('../../ConfigAddress');
function ManageNumbers(): JSX.Element {

  const [openNumberModal, setOpenNumberModal] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState("one");
  const [state, setState] = useState(null);
  const [formDataHook,setFormDataHook] = useState(null);

  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("Please Click Upload File .... ");


 

  // file upload


  const handleFileChange = (event) => {
    const files = event.target.files;
    let formData = new FormData();
    let fileNames = [];
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i].name);
      fileNames.push(files[i].name);
    }
    setUploadingFiles(fileNames);
    setFormDataHook(formData);
    
  };

  const sendFiles = async (formData) => {
    setUploadStatus("Please Wait Processing .... ")
    const response = axios({
      url: server_address+"/uploadlogfiles/",
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': true,
      },
      data: formData,
    })
      .then((res) => {
        setUploadStatus("Done Processing .... ")
       })
      .catch((err) => { });
    // console.log(response);
  }

  const handleClick = (event) => {
    event.preventDefault();
    console.log('ac')
    sendFiles(formDataHook);
    setFormDataHook(null);
  };

  useEffect(() => {
    // Fetch data from API
    fetch(server_address + "/get_states")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setState(data.data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation: ",
          error
        );
      });
  }, []);
  console.log("state", state);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  const columns = [
    
  ];

  const rows = [
   
  ];
  const publisherOptions = [
    {
      value: "Publisher-1",
      component: PublisherOptionComponent({ publisherName: "Publisher-1" }),
    },
    {
      value: "Publisher-2",
      component: PublisherOptionComponent({ publisherName: "Publisher-1" }),
    },
    {
      value: "Publisher-3",
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
        label="Select Available Publishers"
        options={publisherOptions}
        className={className}
      />
    );
  }

  function CampaignsTable() {
    return <LogTable columns={columns} rows={rows} />;
  }

  // search field

  const SearchField = ({ placeholder }) => {
    return (

      < TextField
        sx={{
          float: "start",
          // textAlign:"center",
          maxWidth: "315px",
          "input::placeholder": {
            // opacity: "1 !important",
          },
          input: {
            color: "#000",
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "120%",
          },
          "& .MuiInputBase-input": {},
          "& .MuiInputBase-root": {
            borderRadius: "0px",
            border: "1px solid var(--blackColor) !important",
            padding: "2px 12px",
          },
          "& .MuiInput-root::before ,.MuiInput-root::after": {
            borderWidth: "0px !important",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="var(--redColor)" />
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
        variant="standard"
      />

      
    );
  };

  // search field end
  return (
    <>
      <Box className="px-6">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          

          {/* search bar in html */}
          <Typography
            className="headline-medium"
            marginBottom="22px"
            color={theme.palette.primary.main}
          >
            {/* heading */}
          </Typography>
        </Box>

        {/* table component */}

        <CampaignsTable />
      </Box>
    </>
  );
}

export default ManageNumbers;
