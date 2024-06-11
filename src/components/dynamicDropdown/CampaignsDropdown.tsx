import { Checkbox, ListItemText, SelectChangeEvent } from "@mui/material";
import React, { useEffect } from "react";
import { MultipleSelect } from "./DynamicDropdown";

export default function CampaignsDropdown({ className = "" }) {
  const [selectedNumbers, setSelectedNumbers] = React.useState<string[]>([]);

  const numbers = ["Campaign-1", "Campaign-2", "Campaign-3"];
  useEffect(() => {
    console.log(selectedNumbers);

  })

  const handleChange = (event: SelectChangeEvent<typeof selectedNumbers>, v) => {
    const {
      target: { value },
    } = event;
    if (v.includes('Select All'))
      setSelectedNumbers(numbers)
    else {
      setSelectedNumbers(v);
    }
    console.log("seemee", v)
    // if (value.includes("all")) {
    //   setSelectedNumbers(numberOptions.map((e) => e.value));
    // } else if (value.includes("removeAll")) {
    //   setSelectedNumbers([]);
    // } else {
    //   setSelectedNumbers(typeof value === "string" ? value.split(",") : value);
    // }
  };

  const numberOptions = [
    {
      value: "Select All",
      component: NumberOptionComponent({ number: numbers[0] }),
    },
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
      label="Choose Campaigns"
      handleChange={handleChange}
      selectAll
      options={numberOptions}
      value={selectedNumbers}
      className={className}
    />
  );
}
