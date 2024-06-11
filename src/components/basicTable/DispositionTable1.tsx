import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Chip
} from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import theme from "../../styles/theme";
import "./BasicTable.scss";
import { classNames } from "../../utils";
const { server_address } = require('../../ConfigAddress');
export default function DispositionTable({
  className = "",
  blackBorder = false,
  outlineHeader = false,
  hideHeader = false,
}) {
  const [data, setData] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [chartData, setChartData] = useState([]);
  const [additionalData, setAdditionalData] = useState({
    totalCalls: 0,
    validCalls: 0,
    calculatedValidCalls: 0,
  });

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(server_address+'/get_new_states');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setStates(json.data.data);
      } catch (error) {
        console.error("Fetching states error: ", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startIndex = page * rowsPerPage;
        const url = server_address+`/get_all_logs/${selectedState}?start_index=${startIndex}&num_rows=${rowsPerPage}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.data.data.disposition_table);
      } catch (error) {
        console.error("Fetching data error: ", error);
      }
    };

    fetchData();
  }, [selectedState, page, rowsPerPage]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(server_address+`/get_counter_data/${selectedState}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        const dispositionData = json.data.data[0].dispostion;
        let calculatedValidCalls = 0;
        Object.entries(dispositionData).forEach(([key, value]) => {
          if (key !== "A" && key !== "DNC") {
            calculatedValidCalls += value;
          }
        });

        setAdditionalData({
          totalCalls: json.data.data[0].total_calls,
          validCalls: json.data.data[0].valid_calls,
          calculatedValidCalls,
        });

        const getShadeOfRed = (index, total) => {
          const redValue = Math.round(255 - (index / total * 100));
          return `rgb(${redValue}, 0, 0)`;
        };

        const transformedData = Object.keys(dispositionData).map((key, index) => ({
          title: key,
          value: dispositionData[key],
          color: getShadeOfRed(index, Object.keys(dispositionData).length),
        }));
        setChartData(transformedData);
      } catch (error) {
        console.error("Fetching chart data error: ", error);
      }
    };

    fetchChartData();
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
     <div className="select-div">
  <Box>
    <FormControl
      style={{
        float: "left",
        width: "100%", // Use a percentage to make it responsive
        maxWidth: "340px", // Set a maximum width to prevent it from getting too wide
      }}
    >
      <InputLabel id="demo-simple-select-label">Select</InputLabel>
      <Select
        labelId="state-select-label"
        id="state-select"
        value={selectedState}
        label="State"
        onChange={handleStateChange}
      >
        {states.map((state, index) => (
          <MenuItem key={index} value={state}>
            {state}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
</div>

<div>
<Typography
  className="headline-medium"
  paddingLeft="14px"
  color={theme.palette.primary.main}
>
  Stats Counter
</Typography>
<div className="out-div">
  <div className="box">
    <span className="headding-d">Total Calls :</span>
    <span>{additionalData.totalCalls}</span>
  </div>
  <div className="box">
    <span className="headding-d">Call Drop :</span>
    <span>{additionalData.validCalls}</span>
  </div>
  <div className="box">
    <span className="headding-d">Valid Calls :</span>
    <span>{additionalData.calculatedValidCalls}</span>
  </div>
</div>
  </div>



      {/* Chart heading */}
      <div>   
      <Typography
            className="headline-medium accordion-title"
            // marginBottom="94px"
            paddingLeft="4%"
            // color={theme.palette.primary.main}
          >
        Graphical Representation
          </Typography>
      </div>
      {/* chart code */}
      <div className="chart-out"
          // style={{
          //   width: "100%",
          //   height: "780px",
          //   padding: "60px",
          //   paddingTop: "30px",
          // }}
        >     
      {chartData.length > 0 && (
        <PieChart
          data={chartData}
          animate
          label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value})`}
          labelStyle={{
            fill: 'black',
            fontSize: '5px',
            fontFamily: 'Arial, sans-serif', // Optional: Set the font family if needed
          }}
          labelPosition={112} // Position labels outside the chart
          radius={42} // Reduced chart radius
          lengthAngle={360}
        />
        
      )}
      </div>
      {/* table data */}
      <TableContainer
        className={`${className} basic-table ${blackBorder ? "black-border" : ""} ${outlineHeader ? "outline-header" : ""}`}
        component={Paper}
      >
        <Box sx={{ display: "flex", marginBottom: "10px" }}>
          <Typography
            className="headline-medium"
            color={theme.palette.primary.main}
          >
            Disposition Table
          </Typography>
        </Box>

        <Table aria-label="simple table" sx={{ ...(hideHeader && { thead: { display: "none !important" } }) }}>
          <TableHead>
            <TableRow>
              <TableCell>Caller ID</TableCell>
              <TableCell>Transcript</TableCell>
              <TableCell>Disposition</TableCell>
              <TableCell>States</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.caller_id.map((callerId, index) => (
              <TableRow key={callerId}>
                <TableCell>{callerId}</TableCell> 
                <TableCell>{data.transcript[index]}</TableCell>
                <TableCell>{data.disposition[index]}</TableCell>
                <TableCell>
                  {data.states[index].map((state, idx) => (
                    <Chip
                      key={idx}
                      label={state}
                      variant="outlined"
                      color="primary"
                      size="small"
                      style={{ margin: '3px', fontWeight: 'bold' }}
                    />
                  ))}
                </TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={-1} // Replace with the total number of rows if known
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />


    </>
  );
}
