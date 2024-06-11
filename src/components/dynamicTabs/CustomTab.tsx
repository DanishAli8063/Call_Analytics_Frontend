import React, { useEffect, useState } from "react";
import "./CustomTabs.scss";

const CustomTab = ({ selectedTabs, setSelectedTabs, tabLabels }) => {
  const handleTabChange = (event) => {
    setSelectedTabs({
      ...selectedTabs,
      [event.target.id]: event.target.checked,
    });
  };

  useEffect(()=>{
    console.log(selectedTabs)
  })

  return (
    <div className="tab">
      {tabLabels.map((label, index) => {
        const tabKey = tabLabels[index];
        return (
          <React.Fragment key={tabKey}>
            <input
              type="checkbox"
              id={tabKey}
              checked={selectedTabs[tabKey]}
              onChange={handleTabChange}
            />
            <label htmlFor={tabKey}>{label}</label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CustomTab;
