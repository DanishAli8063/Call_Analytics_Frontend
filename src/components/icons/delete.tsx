import React from "react";

const DeleteIcon = ({
  color = "var(--blackColor)",
  width = "18",
  height = "18",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
     <path d="M15.1875 3.375H2.8125C2.66332 3.375 2.52024 3.43426 2.41475 3.53975C2.30926 3.64524 2.25 3.78832 2.25 3.9375C2.25 4.08668 2.30926 4.22976 2.41475 4.33525C2.52024 4.44074 2.66332 4.5 2.8125 4.5H3.375V14.625C3.375 14.9234 3.49353 15.2095 3.7045 15.4205C3.91548 15.6315 4.20163 15.75 4.5 15.75H13.5C13.7984 15.75 14.0845 15.6315 14.2955 15.4205C14.5065 15.2095 14.625 14.9234 14.625 14.625V4.5H15.1875C15.3367 4.5 15.4798 4.44074 15.5852 4.33525C15.6907 4.22976 15.75 4.08668 15.75 3.9375C15.75 3.78832 15.6907 3.64524 15.5852 3.53975C15.4798 3.43426 15.3367 3.375 15.1875 3.375ZM13.5 14.625H4.5V4.5H13.5V14.625ZM5.625 1.6875C5.625 1.53832 5.68426 1.39524 5.78975 1.28975C5.89524 1.18426 6.03832 1.125 6.1875 1.125H11.8125C11.9617 1.125 12.1048 1.18426 12.2102 1.28975C12.3157 1.39524 12.375 1.53832 12.375 1.6875C12.375 1.83668 12.3157 1.97976 12.2102 2.08525C12.1048 2.19074 11.9617 2.25 11.8125 2.25H6.1875C6.03832 2.25 5.89524 2.19074 5.78975 2.08525C5.68426 1.97976 5.625 1.83668 5.625 1.6875Z" />
    </svg>
  );
};

export default DeleteIcon;