import React, { useState, useEffect } from "react";
// import "./CampaignsPage.scss";
import "./CampaignsPage.scss";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../styles/theme";
import axios from "axios";
import plusIcon from "../../assets/img/icons/plus.svg";
import ReusableTable from "../../components/basicTable/DispositionTable1";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../components/icons/edit";
import DeleteIcon from "../../components/icons/delete";
import StatsIcon from "../../components/icons/stats";
import PauseIcon from "../../components/icons/pause";
import PlusIcon from "../../components/icons/plus";
import { PieChart } from "react-minimal-pie-chart";
const { server_address } = require('../../ConfigAddress');
function CampaignsPage(): JSX.Element {


  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Fetch data from API
  //   fetch(server_address + "/get_disposition_freq")
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error("Network response was not ok");
  //     })
  //     .then((data) => {
  //       setData(data.data);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "There has been a problem with your fetch operation: ",
  //         error
  //       );
  //     });
  // }, []);
  // if (data) {
  //   console.log(data);
  // } else {
  //   console.log("none");
  // }

  // Convert the dataObj to the array format that PieChart expects

  // const getRandomColor = () => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

//   const colors = [
//     '#FFC0C0',  // Light Red
//     '#FFA1A1',  // Lighter Red
//     '#FF7F7F',  // Pastel Red
//     '#FF6060',  // Coral Red
//     '#FF4040',  // Red
//     '#FF2020',  // Bright Red
//     '#FF0000',  // Pure Red
//     '#B30000'   // Dark Red
// ];


//   var dataArray = null;
//   if (data) {
//     dataArray = Object.entries(data).map(([key, value]) => {
//       return {
//         title: key,
//         value: value,
//         color: colors[value % colors.length]
//       };
//     });
//   }

  const navigate = useNavigate();
  // Example usage
  const columns = [
    { title: "Name", align: "left" },
    { title: "Country", align: "center" },
    { title: "Connected Calls", align: "center" },
    { title: "Live", align: "center" },
    { title: "Average Call Duration", align: "center" },
    { title: "Total", align: "center" },
    { title: "Status", align: "center" },
    { title: "Actions", align: "right" },
  ];

  const rows = [
    {
      name: { value: "Customer Care", align: "left" },
      country: { value: "Ae", align: "center" },
      connectedCalls: { value: 159, align: "center" },
      live: { value: 6.0, align: "center" },
      averageCallDuration: { value: 24, align: "center" },
      total: { value: 4.0, align: "center" },
      status: { value: "Inactive", align: "center" },
      actions: {
        value: [
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
          { icon: <StatsIcon />, onClick: () => {} },
          { icon: <PauseIcon />, onClick: () => {} },
        ],
        align: "right",
      },
    },
    {
      name: { value: "Proactive Solutions", align: "left" },
      country: { value: "Ae", align: "center" },
      connectedCalls: { value: 159, align: "center" },
      live: { value: 6.0, align: "center" },
      averageCallDuration: { value: 24, align: "center" },
      total: { value: 4.0, align: "center" },
      status: { value: "Inactive", align: "center" },
      actions: {
        value: [
          { icon: <EditIcon />, onClick: () => {} },
          { icon: <DeleteIcon />, onClick: () => {} },
          { icon: <StatsIcon />, onClick: () => {} },
          { icon: <PauseIcon />, onClick: () => {} },
        ],
        align: "right",
      },
    },
    // Additional rows...
  ];

  function CampaignsTable() {
    return <ReusableTable columns={columns} rows={rows} />;
  }
  return (
    <>
      <Box className="px-6 py-7">
        <Typography
          className="headline-medium"
          marginBottom="54px"
          color={theme.palette.primary.main}
        >
          Log Analytics
        </Typography>

        
        <CampaignsTable />





        {/* <div
          style={{
            width: '100%',
            height: 380,
            padding: "60px",
            // backgroundColor: "green",
            borderTop:"black 1px solid"
          }}
        >
          {dataArray ? (
            <PieChart
              data={dataArray}
              animate
              radius={42}
              lengthAngle={360}
              labelPosition={112}
              label={({ dataEntry }) => ` ${dataEntry.title} : ${dataEntry.value}`}
              labelStyle={(index) => ({
                // fill: data[index].color,
                fill: "black",
                fontSize: "5px",
                fontFamily: "sans-serif",
              })}
            />
          ) : (
            console.log("Data Loading")
          )}
        </div> */}

      </Box>
    </>
  );
}

export default CampaignsPage;
