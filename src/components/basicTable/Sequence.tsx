import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import "./BasicTable.scss";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../styles/theme";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { classNames } from "../../utils";
import TablePagination from "@mui/material/TablePagination";
import { FlagIcon } from "../icons/flagIcon";

// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Margin } from "@mui/icons-material";

const { server_address } = require('../../ConfigAddress');
// Reusable table component
export default function Sequence({
  columns,
  rows,
  className = "",
  blackBorder = false,
  alignLeft = false,
  outlineHeader = false,
  hideHeader = false,
}) {
  // State to manage pagination

  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
  const [page2, setPage2] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Set the number of rows per page here
  const [rowsPerPage1, setRowsPerPage1] = useState(10);
  const [rowsPerPage2, setRowsPerPage2] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangePage1 = (_, newPage) => {
    setPage1(newPage);
  };
  const handleChangePage2 = (_, newPage) => {
    setPage2(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(parseInt(event.target.value, 10));
    setPage2(0);
  };

  const all = rows.length;


  const [pharsesData, setpharsesData] = useState(null);
  const [wordData, setWordData] = useState(null);
  const [botData, setBotData] = useState(null);
  const [state, setState] = useState(null);

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
  // console.log(state)

  const handleOnChangeSelect = (e) => {
    // console.log(e)
    const option = e.target.value;
    setAge(option);
    fetch(server_address + "/get_phrase_freq/" + option)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setpharsesData(data.data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation: ",
          error
        );
      });
      fetch(server_address + "/get_word_freq/" + option)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setWordData(data.data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation: ",
          error
        );
      });
  };

  useEffect(() => {
    // Fetch data from API
    fetch(server_address + "/get_phrase_freq/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setpharsesData(data.data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation: ",
          error
        );
      });
  }, []);
  // console.log(pharsesData);


  useEffect(() => {
    // Fetch data from API
    fetch(server_address + '/get_word_freq')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        setWordData(data.data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation: ', error);
      });
  }, []);
  // console.log(wordData)


  useEffect(() => {
    // Fetch data from API
    fetch(server_address + '/get_bot_hanged')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        setBotData(data.data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation: ', error);
      });
  }, []);
  console.log(botData)



  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    // console.log(event.target.value)
  };

  return (
    <>


{ state ? 
<Box sx={{ minWidth: 120 }}>
      <FormControl   style={{
            float:"right",
            width: "20%",
            marginBottom: "20px",
          }}>
        <InputLabel id="demo-simple-select-label">Select</InputLabel> 
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state.value}
          label="Selected"
          onChange={handleOnChangeSelect}
        >
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          { Object.entries(state.data)
                .map((item, key) => {
              return (
               <MenuItem value={item[1]}>{item[1]}</MenuItem>
               )
           })}

          
        </Select>

      </FormControl>
    </Box>
    : console.log('Kuch bhi') }


    {/* 1st table */}

    <Box>

<Typography
        className="headline-medium"
        marginBottom="25px"
        color={theme.palette.primary.main}
        >
          Phrases frequency
      </Typography>
        </Box>
      <TableContainer
        className={classNames(
          `basic-table`,
          className,
          blackBorder ? "black-border" : "",
          outlineHeader ? "outline-header" : ""
        )}
        component={Paper}
      >
        {/* { pharsesData && ( */}

        <Table
          sx={{
            ...(hideHeader && {
              thead: {
                display: "none !important",
              },
            }),
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Sr.</TableCell>

              <TableCell>Phrases</TableCell>
              <TableCell>States</TableCell>
            </TableRow>
          </TableHead>
          {pharsesData && (
            <TableBody>
              {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
              {Object.entries(pharsesData.data)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{(page-1) * rowsPerPage + rowsPerPage + index + 1}</TableCell>

                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>

        {/* Add TablePagination */}
        {pharsesData && (
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              Object.entries(pharsesData.data).length,
            ]} // Set the available rows per page options
            component="div"
            count={Object.entries(pharsesData.data).length} // Total number of rows
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>

{/* 2nd table */}
<Box>

<Typography
        className="headline-medium"
        marginBottom="25px"
        color={theme.palette.primary.main}
        >
           Words frequency
      </Typography>
        </Box>
<TableContainer
        className={classNames(
          `basic-table`,
          className,
          blackBorder ? "black-border" : "",
          outlineHeader ? "outline-header" : ""
        )}
        component={Paper}
      >
        {/* { pharsesData && ( */}

        <Table
          sx={{
            ...(hideHeader && {
              thead: {
                display: "none !important",
              },
            }),
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Sr.</TableCell>

              <TableCell>Words</TableCell>
              <TableCell>States</TableCell>
            </TableRow>
          </TableHead>
          {wordData && (
            <TableBody>
              {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
              {Object.entries(wordData.data)
                .slice(page1 * rowsPerPage1, page1 * rowsPerPage1 + rowsPerPage1)
                .map((row, index) => (
                  <TableRow key={index}>
                   <TableCell>{(page1-1) * rowsPerPage1 + rowsPerPage1 + index + 1}</TableCell>


                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>

        {/* Add TablePagination */}
        {wordData && (
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              Object.entries(wordData.data).length,
            ]} // Set the available rows per page options
            component="div"
            count={Object.entries(wordData.data).length} // Total number of rows
            rowsPerPage={rowsPerPage1}
            page={page1}
            onPageChange={handleChangePage1}
            onRowsPerPageChange={handleChangeRowsPerPage1}
          />
        )}
      </TableContainer>
      

{/* 3rd table */}
<Box>

<Typography
        className="headline-medium"
        marginBottom="25px"
        color={theme.palette.primary.main}
        >
         Bot Hanged Up
      </Typography>
        </Box>
{ botData ? 
      <TableContainer
        className={classNames(
          `basic-table`,
          className,
          blackBorder ? "black-border" : "",
          outlineHeader ? "outline-header" : ""
        )}
        component={Paper}
      >
        <Table
          sx={{
            ...(hideHeader && {
              thead: {
                display: "none !important",
              },
            }),
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Sr.</TableCell>

              <TableCell>Text</TableCell>
              <TableCell>States</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {/* Render rows based on the current page and rowsPerPage */}
            {(rowsPerPage2 > 0
              ? botData.data.slice(
                  page2 * rowsPerPage2,
                  page2 * rowsPerPage2 + rowsPerPage2
                )
              : rows
            ).map((row, index) => (
              <TableRow key={index}>
               <TableCell>{ index+1 }</TableCell>
                <TableCell>{row['AI bot got this data']}</TableCell>
                <TableCell>{row['Current State']}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Add TablePagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, all]} // Set the available rows per page options
          component="div"
          count={botData.data.length} // Total number of rows
          rowsPerPage={rowsPerPage2}
          page={page2}
          onPageChange={handleChangePage2}
          onRowsPerPageChange={handleChangeRowsPerPage2}
        />
      </TableContainer>
       : console.log('Hello')}
    </>
  );
}

export function ActionsCell({ align, actions }) {
  return (
    <div
      className={classNames(
        "flex gap-x-2 items-center",
        align == "left"
          ? "justify-start"
          : align == "center"
          ? "justify-center"
          : "justify-end"
      )}
    >
      {/* // <div className="relative flex justify-end min-w-[110px]"> */}
      {/* <div className="absolute inset-4	 flex items-center justify-end"> */}
      {actions.map((action, index) => (
        <div key={index + action} onClick={action.onClick}>
          <React.Fragment>{action.icon}</React.Fragment>
        </div>
      ))}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}

function StatusIndicator({ align, status }) {
  let indicatorColor = "";
  if (status === "Active") {
    indicatorColor = "var(--greenColor)";
  } else if (status === "Inactive") {
    indicatorColor = "var(--redColor)";
  }

  return (
    <div
      className={classNames(
        "flex",
        align == "left"
          ? "justify-start"
          : align == "center"
          ? "justify-center"
          : "justify-end"
      )}
    >
      <div
        className="w-4	h-4 rounded-full"
        style={{ backgroundColor: indicatorColor }}
      />
    </div>
  );
}
