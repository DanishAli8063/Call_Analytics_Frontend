import React from "react";
import { classNames } from "../../utils";

export function FlagIcon({ align, country }) {
    const flagImageUrl = `https://flagcdn.com/16x12/${country.toLowerCase()}.png`;
  
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
        <img src={flagImageUrl} width="16" height="12" alt={country} />
      </div>
    );
  }