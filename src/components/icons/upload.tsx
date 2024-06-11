import React from "react";
const UploadIcon = ({
  color = "#E01E26",
  width = "33",
  height = "33",
  style = {},
  ...props
}) => {
  return (
    <svg
      {...props.props}
      width={width}
      height={height}
      style={style}
      viewBox={`0 0 ${width} ${height}`}
      fill={color}
    >
      <path d="M28 19.4998V26.4998C28 27.0302 27.7893 27.5389 27.4142 27.914C27.0391 28.2891 26.5304 28.4998 26 28.4998H6C5.46957 28.4998 4.96086 28.2891 4.58579 27.914C4.21071 27.5389 4 27.0302 4 26.4998V19.4998C4 19.2346 4.10536 18.9802 4.29289 18.7927C4.48043 18.6052 4.73478 18.4998 5 18.4998C5.26522 18.4998 5.51957 18.6052 5.70711 18.7927C5.89464 18.9802 6 19.2346 6 19.4998V26.4998H26V19.4998C26 19.2346 26.1054 18.9802 26.2929 18.7927C26.4804 18.6052 26.7348 18.4998 27 18.4998C27.2652 18.4998 27.5196 18.6052 27.7071 18.7927C27.8946 18.9802 28 19.2346 28 19.4998ZM11.7075 11.2073L15 7.91356V19.4998C15 19.765 15.1054 20.0194 15.2929 20.2069C15.4804 20.3945 15.7348 20.4998 16 20.4998C16.2652 20.4998 16.5196 20.3945 16.7071 20.2069C16.8946 20.0194 17 19.765 17 19.4998V7.91356L20.2925 11.2073C20.4801 11.395 20.7346 11.5004 21 11.5004C21.2654 11.5004 21.5199 11.395 21.7075 11.2073C21.8951 11.0197 22.0006 10.7652 22.0006 10.4998C22.0006 10.2344 21.8951 9.97995 21.7075 9.79231L16.7075 4.79231C16.6146 4.69933 16.5043 4.62557 16.3829 4.57525C16.2615 4.52493 16.1314 4.49902 16 4.49902C15.8686 4.49902 15.7385 4.52493 15.6171 4.57525C15.4957 4.62557 15.3854 4.69933 15.2925 4.79231L10.2925 9.79231C10.1049 9.97995 9.99944 10.2344 9.99944 10.4998C9.99944 10.7652 10.1049 11.0197 10.2925 11.2073C10.4801 11.395 10.7346 11.5004 11 11.5004C11.2654 11.5004 11.5199 11.395 11.7075 11.2073Z" />{" "}
    </svg>
  );
};

export default UploadIcon;