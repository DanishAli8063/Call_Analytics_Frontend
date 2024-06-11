import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import ChevronDown from "../icons/chevronDown";
import "./NumberInput.scss";

const NumberInput = () => {
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    if (value > 1) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  return (
    <div className="number-input">
      <TextField
        variant="standard"
        type="number"
        className="no-spinners"
        sx={{
          borderWidth: "0px !important",
        }}
        InputProps={{
          disableUnderline: true,
          inputProps: {
            style: { textAlign: "center", borderWidth: "0px" },
            step: 1,
            min: 1,
            max: 10,
          },
        }}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div className="icons">
        <IconButton className="icon-button" onClick={handleIncrement}>
          <ChevronDown small />
        </IconButton>
        <IconButton className="icon-button" onClick={handleDecrement}>
          <ChevronDown
            style={{
              rotate: "180deg",
            }}
            small
          />
        </IconButton>
      </div>
    </div>
  );
};

export default NumberInput;
