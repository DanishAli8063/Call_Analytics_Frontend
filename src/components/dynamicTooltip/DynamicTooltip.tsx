import React from "react";
import Tooltip from "@mui/material/Tooltip";

const DynamicTooltip = ({ children, helperText, onClick = () => {} }) => {
  return (
    <Tooltip
      onClick={onClick}
      className="body-small"
      PopperProps={{
        sx: {
          borderRadius: "0px",
          "& .MuiTooltip-tooltip": {
            padding: "14px",
            borderRadius: "0px",
            maxWidth: "295px",
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit",
            backgroundColor: "var(--greyColor)",
          },
          "& .MuiTooltip-arrow ": {
            color: "var(--greyColor)",
          },
        },
      }}
      title={helperText}
      placement="right"
      arrow
    >
      <div className="pointer">{children}</div>
    </Tooltip>
  );
};

export default DynamicTooltip;
