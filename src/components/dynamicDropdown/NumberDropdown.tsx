import { Checkbox, ListItemText, SelectChangeEvent } from "@mui/material";
import React from "react";
import { MultipleSelect } from "./DynamicDropdown";

export default function NumberDropdown({ className = "" }) {
  const [selectedNumbers, setSelectedNumbers] = React.useState<string[]>([]);

  const numbers = [
    "+1 (908) 927 1657",
    "+1 (908) 927 1357",
    "+1 (908) 927 1257",
    "+1 (908) 927 1557",
    "+1 (908) 927 1057",
  ];

  const handleChange = (event: SelectChangeEvent<typeof selectedNumbers>, v) => {
    const {
      target: { value },
    } = event;
    setSelectedNumbers(v)
    // setSelectedNumbers(typeof value === "string" ? value.split(",") : value);
  };
  const numberOptions = [
    {
      value: numbers[0],
      component: NumberOptionComponent({ number: numbers[0] }),
    },
    {
      value: numbers[1],
      component: NumberOptionComponent({ number: numbers[1] }),
    },
    {
      value: numbers[2],
      component: NumberOptionComponent({ number: numbers[2] }),
    },
  ];

  function NumberOptionComponent({ number }) {
    return (
      <>
        <Checkbox checked={selectedNumbers.includes(number)} />
        <ListItemText primary={number} />
      </>
    );
  }

  return (
    <MultipleSelect
      label="Choose Number"
      handleChange={handleChange}
      options={numberOptions}
      value={selectedNumbers}
      className={className}
    />
  );
}
