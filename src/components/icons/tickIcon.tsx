import React from "react";

const TickIcon = ({ color = "black", width = "19", height = "14" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 14"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.531 1.28104L6.53104 13.281C6.46139 13.3508 6.37867 13.4061 6.28762 13.4438C6.19657 13.4816 6.09898 13.501 6.00042 13.501C5.90186 13.501 5.80426 13.4816 5.71321 13.4438C5.62216 13.4061 5.53945 13.3508 5.46979 13.281L0.219792 8.03104C0.0790615 7.89031 0 7.69944 0 7.50042C0 7.30139 0.0790615 7.11052 0.219792 6.96979C0.360523 6.82906 0.551394 6.75 0.750417 6.75C0.94944 6.75 1.14031 6.82906 1.28104 6.96979L6.00042 11.6901L17.4698 0.219792C17.6105 0.0790612 17.8014 -1.48284e-09 18.0004 0C18.1994 1.48284e-09 18.3903 0.0790612 18.531 0.219792C18.6718 0.360522 18.7508 0.551394 18.7508 0.750417C18.7508 0.94944 18.6718 1.14031 18.531 1.28104Z" />
    </svg>
  );
};

export default TickIcon;