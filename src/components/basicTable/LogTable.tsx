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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Margin } from "@mui/icons-material";
const { server_address } = require('../../ConfigAddress');

// Reusable table component
export default function LogTable({
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
  // select section

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
  if (botData) {
    console.log(botData.data.length)
  } else {
    console.log("hello")
  }

  const [age, setAge] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value as string);
    // console.log(event.target.value)
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");

  return (
    <>
      {state ?
        <>
          <Box>
            <Typography
              className="headline-medium"
              marginBottom="18px"
              color={theme.palette.primary.main}
            >
              Phrases frequency
            </Typography>
          </Box>
          <div className="ser-and-sel-div">
            <Box className="ser-and-sel-div-box">
              <FormControl
                style={{
                
                  width: "100%", // Use a percentage to make it responsive
                  maxWidth: "340px",
                 
                }}>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.value}
                  label="Selected"
                  onChange={handleOnChangeSelect}
                >
                  {Object.entries(state.data)
                    .map((item, key) => {
                      return (
                        <MenuItem value={item[1]}>{item[1]}</MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </Box>

          <Box
            className="ser-and-sel-div-box"
            sx={{
              display: "flex",
            }}
          >
            {/* search bar in html */}
            <input
              style={{
                padding: "10px",
                fontSize: "14px",
                borderRadius: "3px",
                border: "1px #e01e26 solid",
                width: "100%", // Use a percentage to make it responsive
                maxWidth: "340px",
                outline: "none",
              }}
              type="text"
              placeholder="Type a Keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          </div>
        </>
        :
        <></>
      }

 {/* 1st table */}
      {pharsesData ?
        <>
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
              <TableBody>
                {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                {
                  Object.entries(pharsesData.data)
                    .filter(([phrase]) => phrase.toLowerCase().includes(searchTerm.toLowerCase()))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{(page - 1) * rowsPerPage + rowsPerPage + index + 1}</TableCell>
                        <TableCell>{row[0]}</TableCell>
                        <TableCell>{row[1]}</TableCell>
                      </TableRow>
                    ))
                }
              </TableBody>
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
        </>
        :
        <div className="loader_box">
          <span className="blink">Loading...</span>
          <div className="cl1"></div>
          <div className="cl1 cl2"></div>
          <div className="cl1 cl3"></div>
          <div className="cl1 cl4"></div>
        </div>
      }
      {/* 2nd table */}
      {wordData ?
        <>
        <div className="nd-search-div">
          <Box>
            <Typography
              className="headline-medium"
              marginBottom="0px"
              color={theme.palette.primary.main}
            >
              Words frequency
            </Typography>
          </Box>

          <Box
          className="nd-search-box"
            sx={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "10px",
            }}
          >
            {/* search bar in html */}
            <input
              style={{
                padding: "10px",
                fontSize: "14px",
                borderRadius: "3px",
                border: "1px #e01e26 solid",
                width: "100%",
                outline: "none",
              }}
              type="text"
              placeholder="Type a Keyword..."
              value={searchTerm1}
              onChange={(e) => setSearchTerm1(e.target.value)}
            />
          </Box>
</div>
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

              <TableBody>
                {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                {
                  Object.entries(wordData.data)
                    .filter(([phrase]) => phrase.toLowerCase().includes(searchTerm1.toLowerCase()))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{(page - 1) * rowsPerPage + rowsPerPage + index + 1}</TableCell>
                        <TableCell>{row[0]}</TableCell>
                        <TableCell>{row[1]}</TableCell>
                      </TableRow>
                    ))
                }
              </TableBody>
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
        </>
        :
        <></>
      }

      {/* 3rd table */}
      {botData ?
        <>
          <Box>
            <Typography
              className="headline-medium"
              marginBottom="10px"
              color={theme.palette.primary.main}
            >
              Bot Hanged Up
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
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row['AI bot got this data']}</TableCell>
                    <TableCell>{row['Current State']}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Add TablePagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, botData.data.length]} // Set the available rows per page options
              component="div"
              count={botData.data.length} // Total number of rows
              rowsPerPage={rowsPerPage2}
              page={page2}
              onPageChange={handleChangePage2}
              onRowsPerPageChange={handleChangeRowsPerPage2}
            />

          </TableContainer>
        </>
        :
        <></>
      }
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
