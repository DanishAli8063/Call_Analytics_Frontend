import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import { classNames } from "../../utils";

import { FlagIcon } from "../icons/flagIcon";
const { server_address } = require('../../ConfigAddress');
// Reusable table component with pagination
export default function OneTable({
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
  const [rowsPerPage, setRowsPerPage] = useState(2); // Set the number of rows per page here

//   table data


  const [fullData, setFullData] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch(server_address + '/get_full_log')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        setFullData(data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation: ', error);
      });
  }, []);


  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>

{fullData ? (
<div>
{fullData.data.map((item,key)=>{
    return(
        <>
        
      
<h2>{item.file_id}</h2>
<div>
  <h6> Total Calls: <span> {item.total_calls}</span></h6>
</div>

<div>
  <h6> Valid Calls: <span>  {item.valid_calls} </span></h6>
</div>

<div>
  <h6> Totle States: <span>  {item.total_states} </span></h6>
</div>

<div>
  <h6> Call Drop: <span>  {item.call_drop} </span></h6>
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
               hello
              </TableCell>
              
              <TableCell>
               HELLO
              </TableCell>
            
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Render rows based on the current page and rowsPerPage */}
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
               hello
              </TableCell>
              
              <TableCell>
               HELLO
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add TablePagination */}
      <TablePagination
        rowsPerPageOptions={[2,5, 10, 25]} // Set the available rows per page options
        component="div"
        count={rows.length} // Total number of rows
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    
    </>
    )
})

    </div>

      ) : (

        <tr>
          <td>
            Loading
          </td>
        </tr>

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
