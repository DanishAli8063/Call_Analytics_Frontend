import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

export default function HourlyCapTable() {
const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const timeSlots = [
  "12 am",
  "1 am",
  "2 am",
  "3 am",
  "4 am",
  "5 am",
  "6 am",
  "7 am",
  "8 am",
  "9 am",
  "10 am",
  "11 am",
  "12 pm",
  "1 pm",
  "2 pm",
  "3 pm",
  "4 pm",
  "5 pm",
  "6 pm",
  "7 pm",
  "8 pm",
  "9 pm",
  "10 pm",
  "11 pm",
];

  const [data, setData] = useState<any>([]);

  const MemoizedTextField = React.memo(({ rowIndex, columnIndex }: any) => (
    <TextField
      variant="standard"
      type="number"
      sx={{
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
          {
            display: "none",
          },
      }}
      value={data[rowIndex]?.[columnIndex] || ""}
      onChange={(e) => handleChange(rowIndex, columnIndex, e.target.value)}
    />
  ));

  useEffect(() => {
    handleInitData();
  }, []);

  const handleChange = (rowIndex, columnIndex, value) => {
    setData((prevData) => {
      const newData: any = [...prevData];
      newData[rowIndex][columnIndex] = value;
      return newData;
    });
  };

  const handleInitData = () => {
    const initialData = daysOfWeek.map(() => new Array(25).fill("0"));
    setData(initialData);
  };

  return (
    <div>
      <TableContainer
        sx={{
          boxShadow: "unset",
          border: "1px solid",
          borderBottomWidth: "0px",
          borderRadius: "0px",
        }}
        component={Paper}
      >
        <Table
          sx={{
            minWidth: 650,
            "& input, td, th": {
              textAlign: "right",
              paddingX: "0px",
              marginY: "2px",
              borderWidth: "0px",
            },
            "& .MuiInput-root::before ,.MuiInput-root::after": {
              borderWidth: "0px !important",
            },
            "& .MuiTableRow-root": {
              borderBottom: "1px solid",
            },
          }}
          size="small"
          aria-label="custom table"
        >
          <TableHead
            sx={{
              "& th": {
                fontFamily: "Roboto",
                fontSize: "11px",
                fontWeight: 500,
                lineHeight: "16px",
                color: "var(--redColor)",
                paddingX: "2px",
              },
            }}
          >
            <TableRow>
              <TableCell></TableCell>
              {timeSlots.map((timeSlot) => (
                <TableCell key={timeSlot} align="center">
                  {timeSlot}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& td:first-of-type": {
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--redColor)",
              },
              "& td:first-of-type, td:last-of-type": {
                paddingX: "10px",
              },
            }}
          >
            {daysOfWeek.map((dayOfWeek, rowIndex) => (
              <TableRow key={dayOfWeek + rowIndex}>
                <TableCell>{dayOfWeek}</TableCell>
                {timeSlots.map((_, columnIndex) => (
                  <TableCell key={`${rowIndex}-${columnIndex}`} align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      sx={{
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                          {
                            display: "none",
                          },
                      }}
                      value={data[rowIndex]?.[columnIndex] || ""}
                      onChange={(e) =>
                        handleChange(rowIndex, columnIndex, e.target.value)
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
