import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

function createData(weekdays, cap) {
  return { weekdays, cap };
}

const initialRows = [
  createData("All", 10),
  createData("Monday", 10),
  createData("Tuesday", 15),
  createData("Wednesday", 12),
  createData("Thursday", 8),
  createData("Friday", 20),
  createData("Saturday", 10),
  createData("Sunday", 10),
];

export default function DailyCapTable() {
  const [rows, setRows] = useState(initialRows);

  const handleChangeCap = (index, cap) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index].cap = cap;
      return newRows;
    });
  };

  return (
    <div className="flex justify-center">
        <TableContainer
      sx={{
        border: "1px solid var(--blackColor)",
        borderBottomWidth: '0px',
        borderRadius: "0px",
        maxWidth: '380px',
        boxShadow: "unset",
        "& th, td": {
          height: "20px",
          borderColor: 'var(--blackColor)'
        },
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 350 }} size="small" aria-label="custom table">
        <TableHead>
          <TableRow>
            <TableCell className="label-large">Weekdays</TableCell>
            <TableCell className="label-large" align="right">Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" className="label-large" scope="row">
                {row.weekdays}
              </TableCell>
              <TableCell align="right">
                <TextField
                  variant="standard"
                  value={row.cap}
                  sx={{
                    "& input": {
                      padding: "5px",
                      borderWidth: "0px !important",
                      textAlign: "right",

                    },
                    "& .MuiInput-root::before ,.MuiInput-root::after": {
                      padding: "5px",
                      borderWidth: "0px !important",
                    },
                  }}
                  onChange={(e) => handleChangeCap(index, e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
