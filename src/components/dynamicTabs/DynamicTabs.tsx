import React from "react";
import { Tabs, Tab } from "@mui/material";
import "./CustomTabs.scss";
import PropTypes from "prop-types";

const DynamicTabs = ({
  tabs,
  selectedTab,
  handleTabChange,
  height = "",
  maxWidth = "",
  className = "",
}) => {
  const width = 100 / tabs.length;

  return (
    <Tabs
      className={className}
      value={selectedTab}
      onChange={handleTabChange}
      sx={{
        minHeight: height ? height : "unset",
        height: height ? height : "unset",
        maxWidth: maxWidth ? maxWidth : "unset",
        "& .MuiTabs-indicator": {
          display: "none",
        },
        "& .MuiTabs-flexContainer": {
          justifyContent: "center",
        },
      }}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          value={tab.value}
          label={tab.label}
          className="title-medium"
          style={{
            minHeight: height ? "40px" : "unset",
            height: height ? "40px" : "unset",
            width: `${width}%`,
            backgroundColor:
              selectedTab === tab.value ? "var(--redColor)" : "transparent",
            color: selectedTab === tab.value ? "white" : "var(--redColor)",
            border: `1px solid var(--redColor)`,
            textTransform: "none",
          }}
        />
      ))}
    </Tabs>
  );
};

DynamicTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedTab: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};

export default DynamicTabs;
