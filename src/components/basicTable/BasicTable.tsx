import React, { useState,useEffect } from "react";

import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "../../components/icons/search";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import { classNames } from "../../utils";
import { FlagIcon } from "../icons/flagIcon";

const { server_address } = require('../../ConfigAddress');

// Reusable table component with pagination
export default function ReusableTable({
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
const[fullTranscript, setFullTranscript]= useState(null)

  useEffect(() => {
    // Fetch data from API
    fetch(server_address + '/get_full_transcripts')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        setFullTranscript(data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation: ', error);
      });
  }, []);
  if(fullTranscript)
  {
    // console.log(fullTranscript.data.length)
    // fullTranscript.data[index].full_transcript
    // console.log('abc')
    // console.log(fullTranscript)
  }
  else
  {
    // console.log(fullTranscript)
  }


const navigate=useNavigate()

  const change =()=>{
    navigate("/publishers/add");
  }
  

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = fullTranscript ? fullTranscript.data.filter((item) =>
    item.file_id.toString().includes(searchTerm) ||
    item.full_transcript[item.file_id].toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  let userUrl="."

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


    {
      fullTranscript ?(
 
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
        
              <TableCell>
              ID
              </TableCell>
              
              <TableCell>
               Full Transcript
              </TableCell>
              <TableCell>
              Action
              </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Render rows based on the current page and rowsPerPage */}
          {(rowsPerPage > 0
            ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
            
          ).map((row, index) => { 
            let userId="/add/"+fullTranscript.data[index].file_id
            console.log(fullTranscript.data[index].file_id)
            // +fullTranscript.data[index].file_id
            
            return(
            
          <>
            <TableRow key={index}>
              <TableCell>
               {fullTranscript.data[index].file_id}
              </TableCell>
              
              <TableCell>
                {fullTranscript.data[index].full_transcript[fullTranscript.data[index].file_id]}

              </TableCell>
              <TableCell>
               
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
              }}
            >
              
            <a href={userUrl + userId}> Details</a>
            </Button>

              </TableCell>
            </TableRow>
            </>
          )
            }
          )}
        </TableBody>
      </Table>

      {/* Add TablePagination */}
      <TablePagination
        rowsPerPageOptions={[20,50,100,fullTranscript.data.length]} // Set the available rows per page options
        component="div"
        count={fullTranscript.data.length} // Total number of rows
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>


      ): 
      
      <div className="loader_box">
  <span className="blink">Loading...</span>
  <div className="cl1"></div>
  <div className="cl1 cl2"></div>
  <div className="cl1 cl3"></div>
  <div className="cl1 cl4"></div>
</div>
     
    }
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
