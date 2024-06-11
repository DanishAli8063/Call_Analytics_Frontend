import React, { useState, useEffect } from "react";
import "./ManagePublishers.scss";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import ReusableTable from "../../../components/basicTable/BasicTable";
import DeleteIcon from "../../../components/icons/delete";
import EditIcon from "../../../components/icons/edit";
import PauseIcon from "../../../components/icons/pause";
import StatsIcon from "../../../components/icons/stats";
import theme from "../../../styles/theme";
import PersonAddIcon from "../../../components/icons/personAdd";
import PlusIcon from "../../../components/icons/plus";
import CustomSwitch from "../../../components/switch/Switch";
// import  { SingleSelect } from "../../../../components/dynamicDropdown/DynamicDropdown";/
import { SingleSelect } from "../../../components/dynamicDropdown/DynamicDropdown";
const { server_address } = require('../../../ConfigAddress');
function ManagePublishers(): JSX.Element {
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

  const [formDataHook, setFormDataHook] = useState(null);

  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(
    "Please Click Upload File  .... "
  );

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
    setUploadStatus("Please Wait Processing .... ");
    const response = axios({
      url: server_address  + "/uploadfiles/",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      data: formData,
    })
      .then((res) => {
        setUploadStatus("Done Processing .... ");
      })
      .catch((err) => {});
    // console.log(response);
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("ac");
    sendFiles(formDataHook);
    setFormDataHook(null);
  };

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
        align: "left",
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
        align: "left",
      },
    },
    // Additional rows...
  ];

  function CampaignsTable() {
    return <ReusableTable columns={columns} rows={rows} />;
  }

  return (
    <>
      <Box className="px-6 py-8">
        {/* heading start */}

        <Typography
          className="headline-medium"
          marginBottom="34px"
          color={theme.palette.primary.main}
        >
          Call Analytics
        </Typography>

        {/* heading end */}

        {/* select start */}

        <div className="form-container  mt-3">
          <Box>
            <Typography
              className="headline-medium heading_log"
              marginBottom="25px"
              color={theme.palette.primary.main}
            >
              Call Files
            </Typography>
          </Box>

          <form method="POST" encType="multipart/form-data" className="input-f">
            <div className="f">
              {/* <label htmlFor="audioFiles">Please select Zip File(s):</label><br /> */}
              <input
                className="background"
                type="file"
                id="files"
                name="files"
                accept=".zip"
                multiple
                onChange={handleFileChange}
                hidden
              />

              <label htmlFor="files" className="custom-file-upload">
                <i className="fa fa-cloud-upload"></i> Select Zip File
              </label>
            </div>

            <div className="uploading-files">
              {uploadingFiles.map((filename, index) => (
                <p key={index} className="p">
                  {uploadStatus} {filename}
                </p>
              ))}
            </div>
            <div className="f">
              <Button
                type="button"
                onClick={handleClick}
                variant="outlined"
                className="title-medium"
                sx={{
                  width: "50%",
                  padding: "8.5px 16px",
                  textTransform: "none",
                  border: "1px solid #E01E26",
                  color: "#E01E26",
                  // marginBottom: "-8%",
                  marginTop: "2%",
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
                Upload File
              </Button>
            </div>
          </form>
        </div>

        {/* select end */}

        {/* table component */}

        <CampaignsTable />
      </Box>
    </>
  );
}

export default ManagePublishers;
