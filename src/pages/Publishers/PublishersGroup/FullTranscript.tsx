import React, { useState, useEffect } from "react";
// import "./ManagePublishers.scss";
import axios from 'axios';
import { Box, Typography, Button,  TextField, InputAdornment, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../../components/basicTable/FullTranscriptTable";
import DeleteIcon from "../../../components/icons/delete";
import EditIcon from "../../../components/icons/edit";

import PauseIcon from "../../../components/icons/pause";
import StatsIcon from "../../../components/icons/stats";
import theme from "../../../styles/theme";
import PersonAddIcon from "../../../components/icons/personAdd";
import PlusIcon from "../../../components/icons/plus";
import CustomSwitch from "../../../components/switch/Switch";
// import  { SingleSelect } from "../../../../components/dynamicDropdown/DynamicDropdown";/
import  { SingleSelect } from "../../../components/dynamicDropdown/DynamicDropdown";
const { server_address } = require('../../../ConfigAddress');
function FullTranscript(): JSX.Element {
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





  const [formDataHook,setFormDataHook] = useState(null);

  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("Please Wait Processing .... ");



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
      url: server_address+"/uploadfiles/",
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





  // const options = [
  //   {
  //     value: "VoiceConnect",
  //   },
  //   {
  //     value: "SupportLine",
  //   },
  //   {
  //     value: "CallWave",
  //   },
  //   {
  //     value: "DialDirect",
  //   },
  //   {
  //     value: "HelpLine",
  //   },
  // ];

  // function BuyerDropdown({ className = "" }) {
  //   return (
  //     <SingleSelect
  //       className={className}
  //       label="Select Buyer"
  //       defaultStyle
  //       options={options}
  //     />
  //   );
  // }
  

  const rows = [
    // {
    //   name: { value: "TeleTech Services", align: "left" },
    //   accessToRecordings: { value: <CustomSwitch />, align: "center" },
    //   createNumber: { value: <CustomSwitch />, align: "center" },
    //   total: { value: 0, align: "center" },
    //   live: { value: 0, align: "center" },
    //   status: { value: "Active", align: "center" },
    //   actions: { 
    //     value: [
    //       { icon: <PersonAddIcon />, onClick: () => {} },
    //       { icon: <StatsIcon />, onClick: () => {} },
    //       { icon: <PauseIcon />, onClick: () => {} },
    //       { icon: <EditIcon />, onClick: () => {} },
    //       { icon: <DeleteIcon />, onClick: () => {} },
    //     ],
    //     align: "left" 
    //   },
    // },
    // {
    //   name: { value: "TeleTech Services", align: "left" },
    //   accessToRecordings: { value: <CustomSwitch />, align: "center" },
    //   createNumber: { value: <CustomSwitch />, align: "center" },
    //   total: { value: 0, align: "center" },
    //   live: { value: 0, align: "center" },
    //   status: { value: "Active", align: "center" },
    //   actions: { 
    //     value: [
    //       { icon: <PersonAddIcon />, onClick: () => {} },
    //       { icon: <StatsIcon />, onClick: () => {} },
    //       { icon: <PauseIcon />, onClick: () => {} },
    //       { icon: <EditIcon />, onClick: () => {} },
    //       { icon: <DeleteIcon />, onClick: () => {} },
    //     ],
    //     align: "left" 
    //   },
    // },
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

    {/* select section start*/}

    {/* <div className="flex justify-end pt-10 pr-10">
    <div className="flex justify-end items-center gap-x-1.5 col-span-3">
          </div>
          <div className="col-span-1" />
          <BuyerDropdown className="col-span-6 float-right" />
          </div> */}

{/* select section end*/}


    <Box className="px-6 py-8">

      {/* heading start */}

      <Typography
        className="headline-medium"
        marginBottom="34px"
        color={theme.palette.primary.main}
      >
        Full Transcript
      </Typography>

        {/* heading end */}

 



    {/* table component */}

      <CampaignsTable />
    </Box>
    </>
  );
}

export default FullTranscript;
