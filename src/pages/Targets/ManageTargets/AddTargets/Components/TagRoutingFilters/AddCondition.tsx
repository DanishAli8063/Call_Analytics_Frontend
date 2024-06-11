import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputAdornment,
  ListItemText,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormState } from "./TagRoutingFilters";
import "./Scrollbar.scss";
import CrossIcon from "../../../../../../components/icons/cross";
import DeleteIcon from "../../../../../../components/icons/delete";
import FileIcon from "../../../../../../components/icons/file";
import SearchIcon from "../../../../../../components/icons/search";
import UploadIcon from "../../../../../../components/icons/upload";

const AddCondition = ({
  handleFormChange = (field: keyof FormState) => {},
  incrementFilters = () => {},
  onDelete = () => {},
}) => {
  const [selectedFilter, setSelectedFilter] = useState<String | undefined>();

  const CustomButton = ({ onClick, text, active = false }) => {
    return (
      <Button
        variant="outlined"
        className="headline-small"
        disabled={selectedFilter && selectedFilter != text}
        sx={{
          padding: "8.5px 16px",
          textTransform: "none",
          border: "1px solid var(--blackColor)",
          backgroundColor: active ? "var(--redColor) !important" : "unset",
          borderColor: active ? "var(--redColor) !important" : "unset",
          color: active ? "#fff" : "var(--blackColor)",
          borderRadius: "5px",
          minWidth: "172px",

          // "&:hover": {
          //   color: "#fff",
          //   backgroundColor: "var(--redColor)",
          //   "& svg": {
          //     fill: "#fff",
          //   },
          // },
        }}
        onClick={onClick}
      >
        {text}
      </Button>
    );
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          columnGap: "0.5rem",
        }}
      >
        <CustomButton
          text="States"
          onClick={() => setSelectedFilter("States")}
          active={selectedFilter == "States"}
        />
        <CustomButton
          text="Zip Codes"
          onClick={() => setSelectedFilter("Zip Codes")}
          active={selectedFilter == "Zip Codes"}
        />
        {/* <CustomButton
          text="Publishers"
          onClick={() => setSelectedFilter("Publishers")}
          active={selectedFilter == "Publishers"}
        /> */}
        <Box width="40px" />
        <Button
          variant="outlined"
          startIcon={<DeleteIcon color="var(--redColor)" />}
          className="headline-small"
          sx={{
            padding: "8.5px 16px",
            textTransform: "none",
            border: "0px !important",
            backgroundColor: "transparent !important",
            color: "var(--redColor)",
            borderRadius: "5px",
            minWidth: "172px",
          }}
          onClick={onDelete}
        >
          Remove Filter
        </Button>
      </Box>
      {selectedFilter == "States" && <StatesFilter />}
      {/* {selectedFilter == "Publishers" && <PublishersFilter />} */}
      {selectedFilter == "Zip Codes" && <ZipcodeFilter />}
    </Box>
  );
};

export default AddCondition;

function StatesFilter() {
  const checkboxNames = [
    "California",
    "Texas",
    "Florida",
    "New York",
    "Arizona",
    "Georgia",
    "Kentucky",
    "Maryland",
  ];
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any[]>([]);
  const [unselectedCheckboxes, setUnselectedCheckboxes] =
    useState<any[]>(checkboxNames);

  const handleChange = (name, select) => {
    const checkboxName = name;
    if (select) {
      setSelectedCheckboxes((prevSelectedCheckboxes) => [
        ...prevSelectedCheckboxes,
        checkboxName,
      ]);
      setUnselectedCheckboxes((prevUnselectedCheckboxes) =>
        prevUnselectedCheckboxes.filter((name) => name !== checkboxName)
      );
    } else {
      setSelectedCheckboxes((prevSelectedCheckboxes) =>
        prevSelectedCheckboxes.filter((name) => name !== checkboxName)
      );
      setUnselectedCheckboxes((prevUnselectedCheckboxes) => [
        ...prevUnselectedCheckboxes,
        checkboxName,
      ]);
    }
  };
  const all = (select) => {
    if (select) {
      setSelectedCheckboxes([...checkboxNames]);
      setUnselectedCheckboxes([]);
    } else {
      setSelectedCheckboxes([]);
      setUnselectedCheckboxes([...checkboxNames]);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const checkboxList = checkboxNames.map((name) => ({
    name: name,
    label: name,
  }));

  const SearchField = ({ placeholder }) => {
    return (
      <TextField
        sx={{
          backgroundColor: "#999",
          height: "40px",
          padding: "10px",
          minWidth: "315px",
          "input::placeholder": {
            opacity: "1 !important",
          },
          input: {
            color: "#fff",
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "120%",
          },
          "& .MuiInputBase-input": {
            padding: "0px !important",
            paddingLeft: "16px !important",
          },
          "& .MuiInput-root::before ,.MuiInput-root::after": {
            borderWidth: "0px !important",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
        variant="standard"
        fullWidth
      />
    );
  };

  return (
    <>
      <div className="flex justify-between mt-8 gap-x-6 state-form-tab">
        <Box>
          <FormControl component="fieldset" variant="standard">
            <SearchField placeholder="Search States" />
            <FormGroup
              sx={{
                boxShadow:
                  "0px 1px 3px 1px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.00)",
                padding: "8px 16px",
                height: "200px",
                flexWrap: "nowrap",
                overflow: "auto",
              }}
            >
              {
                <FormControlLabel
                  key={"all"}
                  labelPlacement="start"
                  onClick={() => all(true)}
                  sx={{
                    justifyContent: "space-between",
                    marginLeft: "0px",
                    "& .MuiTypography-root": {
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "120%",
                    },
                  }}
                  control={
                    <Checkbox
                      checked={selectedCheckboxes.length == checkboxList.length}
                      onChange={(e) => all(e.target.checked)}
                      name={"all"}
                    />
                  }
                  label={"Select All"}
                />
              }
              {checkboxList.map((checkbox) => {
                if (true) {
                  return (
                    <FormControlLabel
                      key={checkbox.name}
                      className="title-medium"
                      labelPlacement="start"
                      sx={{
                        justifyContent: "space-between",
                        marginLeft: "0px",
                        "& .MuiTypography-root": {
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "120%",
                        },
                      }}
                      control={
                        <Checkbox
                          checked={selectedCheckboxes.includes(checkbox.name)}
                          onChange={(e) =>
                            handleChange(checkbox.name, e.target.checked)
                          }
                          name={checkbox.name}
                        />
                        //   <div onClick={() => handleChange(checkbox.name, true)}>
                        //     {/* <Checkbox
                        //   checked={selectedCheckboxes.includes(checkbox.name)}
                        //   onChange={handleChange}
                        //   name={checkbox.name}
                        // /> */}
                        //     <ArrowIcon />
                        //   </div>
                      }
                      label={checkbox.label}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </FormGroup>
          </FormControl>
        </Box>
        <FormControl component="fieldset" variant="standard">
          <SearchField placeholder="Search Selected States" />
          <FormGroup
            sx={{
              boxShadow:
                "0px 1px 3px 1px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.00)",
              padding: "8px 16px",
              height: "200px",
              flexWrap: "nowrap",
              overflow: "auto",
            }}
          >
            {
              <FormControlLabel
                key={"all"}
                labelPlacement="start"
                sx={{
                  justifyContent: "space-between",
                  marginLeft: "0px",
                  padding: "10px 8px",
                  "& .MuiTypography-root": {
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "120%",
                  },
                }}
                control={
                  <div onClick={() => all(false)}>
                    <DeleteIcon />
                  </div>
                }
                label={"Remove All"}
              />
            }
            {checkboxList.map((checkbox) => {
              if (selectedCheckboxes.includes(checkbox.name)) {
                return (
                  <FormControlLabel
                    key={checkbox.name}
                    className="title-medium"
                    labelPlacement="start"
                    sx={{
                      justifyContent: "space-between",
                      marginLeft: "0px",
                      padding: "10px 8px",
                      "& .MuiTypography-root": {
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "120%",
                      },
                    }}
                    control={
                      // <Checkbox
                      //   checked={selectedCheckboxes.includes(checkbox.name)}
                      //   // onChange={handleChange}
                      //   name={checkbox.name}
                      // />
                      <div onClick={() => handleChange(checkbox.name, false)}>
                        <DeleteIcon />
                      </div>
                    }
                    label={checkbox.label}
                  />
                );
              } else {
                return null;
              }
            })}
          </FormGroup>
        </FormControl>
      </div>
    </>
  );
}

// function PublishersFilter() {
//   const checkboxNames = [
//     "Publisher1",
//     "Publisher2",
//     "Publisher3",
//     "Publisher4",
//     "Publisher5",
//     "Publisher6",
//     "Publisher7",
//     "Publisher8",
//   ];
//   const [selectedCheckboxes, setSelectedCheckboxes] = useState<any[]>([]);
//   const [unselectedCheckboxes, setUnselectedCheckboxes] =
//     useState<any[]>(checkboxNames);

//   const handleChange = (name, select) => {
//     const checkboxName = name;
//     if (select) {
//       setSelectedCheckboxes((prevSelectedCheckboxes) => [
//         ...prevSelectedCheckboxes,
//         checkboxName,
//       ]);
//       setUnselectedCheckboxes((prevUnselectedCheckboxes) =>
//         prevUnselectedCheckboxes.filter((name) => name !== checkboxName)
//       );
//     } else {
//       setSelectedCheckboxes((prevSelectedCheckboxes) =>
//         prevSelectedCheckboxes.filter((name) => name !== checkboxName)
//       );
//       setUnselectedCheckboxes((prevUnselectedCheckboxes) => [
//         ...prevUnselectedCheckboxes,
//         checkboxName,
//       ]);
//     }
//   };
//   const all = (select) => {
//     if (select) {
//       setSelectedCheckboxes([...checkboxNames]);
//       setUnselectedCheckboxes([]);
//     } else {
//       setSelectedCheckboxes([]);
//       setUnselectedCheckboxes([...checkboxNames]);
//     }
//   };

//   const checkboxList = checkboxNames.map((name) => ({
//     name: name,
//     label: `Publisher ${name.substring(name.length - 1)}`,
//   }));

//   const SearchField = ({ placeholder }) => {
//     return (
//       <TextField
//         sx={{
//           backgroundColor: "#999",
//           height: "40px",
//           padding: "10px",
//           minWidth: "315px",
//           "input::placeholder": {
//             opacity: "1 !important",
//           },
//           input: {
//             color: "#fff",
//             fontFamily: "Roboto",
//             fontSize: "16px",
//             fontWeight: 400,
//             lineHeight: "120%",
//           },
//           "& .MuiInputBase-input": {
//             padding: "0px !important",
//             paddingLeft: "16px !important",
//           },
//           "& .MuiInput-root::before ,.MuiInput-root::after": {
//             borderWidth: "0px !important",
//           },
//         }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}
//         placeholder={placeholder}
//         variant="standard"
//         fullWidth
//       />
//     );
//   };

//   return (
//     <>
//       <div className="flex justify-between mt-8 state-form-tab">
//         <Box>
//           <FormControl component="fieldset" variant="standard">
//             <SearchField placeholder="Search Publishers" />
//             <FormGroup
//               sx={{
//                 boxShadow:
//                   "0px 1px 3px 1px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.00)",
//                 padding: "8px 16px",
//                 height: "200px",
//                 flexWrap: "nowrap",
//                 overflow: "auto",
//               }}
//             >
//               {
//                 <FormControlLabel
//                   key={"all"}
//                   labelPlacement="start"
//                   onClick={() => all(true)}
//                   sx={{
//                     justifyContent: "space-between",
//                     marginLeft: "0px",
//                     "& .MuiTypography-root": {
//                       fontFamily: "Roboto",
//                       fontSize: "16px",
//                       fontWeight: 500,
//                       lineHeight: "120%",
//                     },
//                   }}
//                   control={
//                     <Checkbox
//                       checked={selectedCheckboxes.length == checkboxList.length}
//                       onChange={(e) => all(e.target.checked)}
//                       name={"all"}
//                     />
//                   }
//                   label={"Select All"}
//                 />
//               }
//               {checkboxList.map((checkbox) => {
//                 if (true) {
//                   return (
//                     <FormControlLabel
//                       key={checkbox.name}
//                       className="title-medium"
//                       labelPlacement="start"
//                       sx={{
//                         justifyContent: "space-between",
//                         marginLeft: "0px",
//                         "& .MuiTypography-root": {
//                           fontFamily: "Roboto",
//                           fontSize: "16px",
//                           fontWeight: 500,
//                           lineHeight: "120%",
//                         },
//                       }}
//                       control={
//                         <Checkbox
//                           checked={selectedCheckboxes.includes(checkbox.name)}
//                           onChange={(e) =>
//                             handleChange(checkbox.name, e.target.checked)
//                           }
//                           name={checkbox.name}
//                         />
//                         //   <div onClick={() => handleChange(checkbox.name, true)}>
//                         //     {/* <Checkbox
//                         //   checked={selectedCheckboxes.includes(checkbox.name)}
//                         //   onChange={handleChange}
//                         //   name={checkbox.name}
//                         // /> */}
//                         //     <ArrowIcon />
//                         //   </div>
//                       }
//                       label={checkbox.label}
//                     />
//                   );
//                 } else {
//                   return null;
//                 }
//               })}
//             </FormGroup>
//           </FormControl>
//         </Box>
//         <FormControl component="fieldset" variant="standard">
//           <SearchField placeholder="Search Selected Publishers" />
//           <FormGroup
//             sx={{
//               boxShadow:
//                 "0px 1px 3px 1px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.00)",
//               padding: "8px 16px",
//               height: "200px",
//               flexWrap: "nowrap",
//               overflow: "auto",
//             }}
//           >
//             {
//               <FormControlLabel
//                 key={"all"}
//                 labelPlacement="start"
//                 sx={{
//                   justifyContent: "space-between",
//                   marginLeft: "0px",
//                   padding: "10px 8px",
//                   "& .MuiTypography-root": {
//                     fontFamily: "Roboto",
//                     fontSize: "16px",
//                     fontWeight: 500,
//                     lineHeight: "120%",
//                   },
//                 }}
//                 control={
//                   <Box width="14px" onClick={() => all(false)}>
//                     <CrossIcon style={{ width: "inherit" }} />
//                   </Box>
//                 }
//                 label={"Remove All"}
//               />
//             }
//             {checkboxList.map((checkbox) => {
//               if (selectedCheckboxes.includes(checkbox.name)) {
//                 return (
//                   <FormControlLabel
//                     key={checkbox.name}
//                     className="title-medium"
//                     labelPlacement="start"
//                     sx={{
//                       justifyContent: "space-between",
//                       marginLeft: "0px",
//                       padding: "10px 8px",
//                       "& .MuiTypography-root": {
//                         fontFamily: "Roboto",
//                         fontSize: "16px",
//                         fontWeight: 500,
//                         lineHeight: "120%",
//                       },
//                     }}
//                     control={
//                       // <Checkbox
//                       //   checked={selectedCheckboxes.includes(checkbox.name)}
//                       //   // onChange={handleChange}
//                       //   name={checkbox.name}
//                       // />
//                       <Box
//                         width="14px"
//                         onClick={() => handleChange(checkbox.name, false)}
//                       >
//                         <CrossIcon
//                           style={{ width: "inherit", height: "inherit" }}
//                         />
//                       </Box>
//                     }
//                     label={checkbox.label}
//                   />
//                 );
//               } else {
//                 return null;
//               }
//             })}
//           </FormGroup>
//         </FormControl>
//       </div>
//     </>
//   );
// }

function ZipcodeFilter() {
  const [fileUrl, setFileUrl] = useState<any>(null);

  function formatBytes(bytes) {
    if (bytes === 0) return "0 B";

    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      setFileUrl({
        file: reader.result,
        size: formatBytes(file.size),
        name: file.name,
      });
    };

    reader.readAsDataURL(file);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        columnGap: "48px",
        marginTop: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          columnGap: "24px",
        }}
      >
        <Typography className="headline-small">Zip codes to include</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "8px",
            maxWidth: "150px",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            {!fileUrl ? (
              <label htmlFor="upload-image">
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "18px",
                    alignItems: "end",
                    cursor: "pointer",
                  }}
                >
                  <UploadIcon />
                  <Typography className="title-large">Choose file</Typography>
                </Box>
                <input
                  id="upload-image"
                  hidden
                  type="file"
                  onChange={handleFileUpload}
                />
              </label>
            ) : (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    columnGap: "18px",
                  }}
                >
                  <Box width="30px">
                    <FileIcon style={{ width: "inherit", height: "inherit" }} />
                  </Box>
                  <Typography
                    sx={{
                      maxWidth: "85px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flexGrow: 4,
                    }}
                    className="title-large"
                  >
                    {fileUrl.name}
                  </Typography>
                  <Box
                    width="14px"
                    sx={{
                      alignSelf: "center",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFileUrl(null);
                    }}
                  >
                    <CrossIcon
                      style={{
                        width: "inherit",
                        height: "inherit",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Stack>
          {!fileUrl ? (
            <Typography className="body-medium text-[#999]">
              Maximum size is 1 MB , csv, .txt files only.
            </Typography>
          ) : (
            <Typography className="body-medium text-[#999] my-2">
              Size: {fileUrl.size}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          columnGap: "24px",
        }}
      >
        <Typography className="headline-small">Zip codes to exclude</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "8px",
            maxWidth: "150px",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            {!fileUrl ? (
              <label htmlFor="upload-image">
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "18px",
                    alignItems: "end",
                    cursor: "pointer",
                  }}
                >
                  <UploadIcon />
                  <Typography className="title-large">Choose file</Typography>
                </Box>
                <input
                  id="upload-image"
                  hidden
                  type="file"
                  onChange={handleFileUpload}
                />
              </label>
            ) : (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    columnGap: "18px",
                  }}
                >
                  <Box width="30px">
                    <FileIcon style={{ width: "inherit", height: "inherit" }} />
                  </Box>
                  <Typography
                    sx={{
                      maxWidth: "85px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flexGrow: 4,
                    }}
                    className="title-large"
                  >
                    {fileUrl.name}
                  </Typography>
                  <Box
                    width="14px"
                    sx={{
                      alignSelf: "center",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFileUrl(null);
                    }}
                  >
                    <CrossIcon
                      style={{
                        width: "inherit",
                        height: "inherit",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Stack>
          {!fileUrl ? (
            <Typography className="body-medium text-[#999]">
              Maximum size is 1 MB , csv, .txt files only.
            </Typography>
          ) : (
            <Typography className="body-medium text-[#999] my-2">
              Size: {fileUrl.size}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
