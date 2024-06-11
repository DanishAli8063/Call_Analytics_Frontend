import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import "./BasicTable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "../../components/icons/search";
import theme from "../../styles/theme";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import { classNames } from "../../utils";
import { FlagIcon } from "../icons/flagIcon";
const { server_address } = require('../../ConfigAddress');

// Reusable table component with pagination
export default function FullTranscriptTable({
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
  const [rowsPerPage, setRowsPerPage] = useState(20); // Set the number of rows per page here

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [fullTranscript, setFullTranscript] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch(server_address  + "/get_full_transcripts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setFullTranscript(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation: ",
          error
        );
      });
  }, []);

  const [sequence, setSequence] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch(server_address + "/get_sequences")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setSequence(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation: ",
          error
        );
      });
  }, []);
  if (sequence) {
    console.log(sequence.data);
    // console.log(sequence.data[0].file_id)
  } else {
    // console.log("hello")
  }

  // search field

  const SearchField = ({ placeholder }) => {
    return (
      <TextField
        sx={{
          float: "start",
          minWidth: "250px",
          width: "30%",
          "input::placeholder": {},
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

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = fullTranscript
    ? fullTranscript.data.filter(
        (item) =>
          item.file_id.toString().includes(searchTerm) ||
          item.full_transcript[item.file_id]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
   


      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          marginBottom:"10px",
          
        }}
      >
<input
            style={{
              padding: "10px",
              fontSize: "14px",
              borderRadius: "3px",
              border: "1px #e01e26 solid",
              // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
              width: "30%",
              outline:"none",
            }}
            type="text"
            placeholder="Type a Keyword..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
</Box>


      {fullTranscript ? (
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
                <TableCell>ID</TableCell>

                <TableCell>Full Transcript</TableCell>
                <TableCell>Sequence</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Render rows based on the current page and rowsPerPage */}
              {(rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{fullTranscript.data[index].file_id}</TableCell>

                  <TableCell>
                    {
                      fullTranscript.data[index].full_transcript[
                        fullTranscript.data[index].file_id
                      ]
                    }
                  </TableCell>
                  <TableCell>
                    {sequence ? (
                      sequence.data[index].sequence_dict[
                        fullTranscript.data[index].file_id
                      ]
                        .split(" ")
                        .map((i, j) => {
                          return (
                            <>
                              <div key={j} className="badge">
                                {i}
                              </div>
                            </>
                          );
                        })
                    ) : (
                      <h2>.</h2>
                    )}
                  </TableCell>
                  {/* {
              
  sequence ? (

    <TableCell>
   {
      sequence.data[index].map((item, index1) => (
        <div key={index1} className="one" >  
          {
            item.sequence_dict[item.file_id].split(',').map((part, partIndex) => (
              <div key={partIndex} className="badge"  >
                {part.trim()} 
              </div>
            ))
          }
        </div>
      ))
    }
    </TableCell>
  
  ):
<p>hello</p>
} */}

                  {/* {
  sequence ? (

  <TableCell>
    {sequence.data[0].sequence_dict[sequence.data[0].file_id]}
  </TableCell>
  
  ):
<p>hello</p>
} */}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add TablePagination */}
          <TablePagination
            rowsPerPageOptions={[20, 50, 100,fullTranscript.data.length]} // Set the available rows per page options
            component="div"
            count={fullTranscript.data.length} // Total number of rows
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <div className="loader_box">
        <span className="blink">Loading...</span>
        <div className="cl1"></div>
        <div className="cl1 cl2"></div>
        <div className="cl1 cl3"></div>
        <div className="cl1 cl4"></div>
      </div>
      )}
    </>
  );
}

// ... The rest of your code remains the same ...

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
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: indicatorColor }}
      />
    </div>
  );
}
