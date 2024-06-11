import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ChevronDown from "../icons/chevronDown";
import { Autocomplete, Checkbox, Chip, ListItemText, TextField, Typography } from "@mui/material";
import { classNames } from "../../utils";

// type Props = {
//   label?: String;
//   options: any;
//   className: String;
//   handleChange?: any;
//   multiple?: boolean;
//   selectAll?: boolean;
//   defaultValue?: any;
//   defaultStyle?: boolean;
//   maxWidth?: string;
//   defaultField?: boolean;
//   value?: any[] | any;
// };

// export default function DynamicDropdownMenu({
//   label,
//   options,
//   className = "",
//   multiple = false,
//   handleChange = () => {},
//   selectAll = false,
//   defaultStyle = false,
//   defaultField = false,
//   maxWidth,
//   defaultValue,
//   value,
// }: Props) {
//   return (
//     <Box
//       className={classNames(
//         `flex items-center w-full ${className}`,
//         defaultField ? "" : `bg-[var(--greyColor)]`
//       )}
//       height="40px"
//       maxWidth={maxWidth ? maxWidth : "263px"}
//       width="100%"
//     >
//       <FormControl
//         fullWidth
//         variant="standard"
//         sx={{
//           minWidth: 120,
//           "& .MuiInputBase-input:focus": {
//             backgroundColor: "transparent !important",
//           },
//           "& .MuiInputBase-input": {
//             padding: defaultField ? "10px 0px" : "10px 16px !important",
//             color: defaultField ? "#000" : "white !important",
//             fontSize: "15px",
//             fontFamily: "Roboto",
//             fontWeight: "500",
//           },
//           "& .MuiInput-underline::before , .MuiInput-underline::after": {
//             borderBottomWidth: defaultField ? "1px" : "0px !important",
//             borderBottomColor: "#000",
//           },
//           "& .MuiList-root": {
//             backgroundColor: "#000 !important",
//           },
//         }}
//       >
//         <Select
//           displayEmpty
//           multiple={multiple}
//           onChange={handleChange}
//           value={value}
//           defaultValue={defaultValue ? defaultValue : ""}
//           renderValue={
//             multiple
//               ? (selected) => {
//                   if (selected.length == 0) {
//                     return <p>{label}</p>;
//                   }
//                   return selected.join(", ");
//                 }
//               : (selected: any) => {
//                   if (selected == "") {
//                     return <p>{label}</p>;
//                   }

//                   return selected;
//                 }
//           }
//           sx={{
//             "& .MuiSelect-icon": { top: 15, right: 10 },
//           }}
//           IconComponent={(props) => {
//             return (
//               <ChevronDown
//                 props={props}
//                 color={defaultField ? "#000" : "#fff"}
//               />
//             );
//           }}
//           inputProps={{ "aria-label": "Without label" }}
//           MenuProps={{
//             PaperProps: {
//               sx: {
//                 bgcolor: "#fff",
//                 boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "0px",
//                 "& .MuiMenu-list": {
//                   padding: 0,
//                 },
//                 "& .MuiMenuItem-root": {
//                   padding: 2,
//                   "&:hover": {
//                     background: multiple
//                       ? "transparent"
//                       : "var(--gradientColor)",
//                     backgroundColor: multiple
//                       ? "transparent !important"
//                       : "var(--gradientColor)",
//                     ".MuiTypography-root": {
//                       color: multiple
//                         ? "var(--blackColor)"
//                         : "#ffffff !important",
//                     },
//                   },
//                 },
//                 "& .Mui-selected": {
//                   background: multiple ? "transparent" : "var(--gradientColor)",
//                   backgroundColor: multiple
//                     ? "transparent !important"
//                     : "var(--gradientColor)",
//                   ".MuiTypography-root": {
//                     color: multiple
//                       ? "var(--blackColor)"
//                       : "#ffffff !important",
//                   },
//                 },
//               },
//             },
//           }}
//         >
//           {selectAll && (
//             <MenuItem key={"all"} className="w-full bg-black" value={ value.length >= options.length ? 'removeAll' :"all"}>
//               <Checkbox checked={value.length >= options.length} />
//               <ListItemText primary={"Select All"} />
//             </MenuItem>
//           )}
//           {defaultStyle
//             ? options.map((option, i) => (
//                 <MenuItem
//                   key={option.value + i}
//                   className="w-full bg-black"
//                   value={option.value}
//                 >
//                   <Box display="flex" justifyContent="start" width="100%">
//                     <Typography
//                       className="title-medium"
//                       color="var(--blackColor)"
//                     >
//                       {option.label ? option.label : option.value}
//                     </Typography>
//                   </Box>
//                 </MenuItem>
//               ))
//             : options.map((option, i) => (
//                 <MenuItem
//                   key={option.value + i}
//                   className="w-full bg-black"
//                   value={option.value}
//                 >
//                   {option.component}
//                 </MenuItem>
//               ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }


type CommonProps = {
  label?: String;
  options: any;
  className: String;
  handleChange?: any;
  selectAll?: boolean;
  defaultStyle?: boolean;
  maxWidth?: string;
  defaultField?: boolean;
  value?: any[] | any;
};

type SingleSelectProps = CommonProps & {
  defaultValue?: any;
};

type MultipleSelectProps = CommonProps & {
  defaultValue?: any[];
};

export function SingleSelect({
  label,
  options,
  className = "",
  handleChange = () => { },
  selectAll = false,
  defaultStyle = false,
  defaultField = false,
  maxWidth,
  defaultValue,
  value,
}: SingleSelectProps) {

  return (
    <Box
      className={classNames(
        `flex items-center w-full ${className}`,
        defaultField ? "" : `bg-[var(--greyColor)]`
      )}
      height="40px"
      maxWidth={maxWidth ? maxWidth : "263px"}
      width="100%"
    >
      <FormControl
        fullWidth
        variant="standard"
        sx={{
          minWidth: 120,
          "& .MuiInputBase-input:focus": {
            backgroundColor: "transparent !important",
          },
          "& .MuiInputBase-input": {
            padding: defaultField ? "10px 0px" : "10px 16px !important",
            color: defaultField ? "#000" : "white !important",
            fontSize: "15px",
            fontFamily: "Roboto",
            fontWeight: "500",
          },
          "& .MuiInput-underline::before , .MuiInput-underline::after": {
            borderBottomWidth: defaultField ? "1px" : "0px !important",
            borderBottomColor: "#000",
          },
          "& .MuiList-root": {
            backgroundColor: "#000 !important",
          },
        }}
      >
        <Select
          displayEmpty
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue ? defaultValue : ""}
          renderValue={
            (selected: any) => {
              if (selected == "") {
                return <p>{label}</p>;
              }
              return selected;
            }
          }
          sx={{
            "& .MuiSelect-icon": { top: 15, right: 10 },
          }}
          IconComponent={(props) => {
            return (
              <ChevronDown
                props={props}
                color={defaultField ? "#000" : "#fff"}
              />
            );
          }}
          inputProps={{ "aria-label": "Without label" }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#fff",
                boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.1)",
                borderRadius: "0px",
                "& .MuiMenu-list": {
                  padding: 0,
                },
                "& .MuiMenuItem-root": {
                  padding: 2,
                  "&:hover": {
                    background:
                      "var(--gradientColor)",
                    backgroundColor:
                      "var(--gradientColor)",
                    ".MuiTypography-root": {
                      color: "#ffffff !important",
                    },
                  },
                },
                "& .Mui-selected": {
                  background: "var(--gradientColor)",
                  backgroundColor: "var(--gradientColor)",
                  ".MuiTypography-root": {
                    color: "#ffffff !important",
                  },
                },
              },
            },
          }}
        >
          {selectAll && (
            <MenuItem key={"all"} className="w-full bg-black" value={value.length >= options.length ? 'removeAll' : "all"}>
              <Checkbox checked={value.length >= options.length} />
              <ListItemText primary={"Select All"} />
            </MenuItem>
          )}
          {defaultStyle
            ? options.map((option, i) => (
              <MenuItem
                key={option.value + i}
                className="w-full bg-black"
                value={option.value}
              >
                <Box display="flex" justifyContent="start" width="100%">
                  <Typography
                    className="title-medium"
                    color="var(--blackColor)"
                  >
                    {option.label ? option.label : option.value}
                  </Typography>
                </Box>
              </MenuItem>
            ))
            : options.map((option, i) => (
              <MenuItem
                key={option.value + i}
                className="w-full bg-black"
                value={option.value}
              >
                {option.component}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export function MultipleSelect({
  label,
  options,
  className = "",
  handleChange = () => { },
  selectAll = false,
  defaultStyle = false,
  defaultField = false,
  maxWidth,
  defaultValue,
  value,
}: MultipleSelectProps) {
  const handleAutoCompleteChange = (event, values) => {

  }
  return (
    // <Box
    //   className={classNames(
    //     `flex items-center w-full ${className}`,
    //     defaultField ? "" : `bg-[var(--greyColor)]`
    //   )}
    //   height="40px"
    //   maxWidth={maxWidth ? maxWidth : "263px"}
    //   width="100%"
    // >
    //   <FormControl
    //     fullWidth
    //     variant="standard"
    //     sx={{
    //       minWidth: 120,
    //       "& .MuiInputBase-input:focus": {
    //         backgroundColor: "transparent !important",
    //       },
    //       "& .MuiInputBase-input": {
    //         padding: defaultField ? "10px 0px" : "10px 16px !important",
    //         color: defaultField ? "#000" : "white !important",
    //         fontSize: "15px",
    //         fontFamily: "Roboto",
    //         fontWeight: "500",
    //       },
    //       "& .MuiInput-underline::before , .MuiInput-underline::after": {
    //         borderBottomWidth: defaultField ? "1px" : "0px !important",
    //         borderBottomColor: "#000",
    //       },
    //       "& .MuiList-root": {
    //         backgroundColor: "#000 !important",
    //       },
    //     }}
    //   >
    //     <Select
    //       displayEmpty
    //       multiple
    //       onChange={handleChange}
    //       value={value}
    //       defaultValue={defaultValue ? defaultValue : ""}
    //       renderValue={(selected) => {
    //         if (selected.length == 0) {
    //           return <p>{label}</p>;
    //         }
    //         return selected.join(", ");
    //       }

    //       }
    //       sx={{
    //         "& .MuiSelect-icon": { top: 15, right: 10 },
    //       }}
    //       IconComponent={(props) => {
    //         return (
    //           <ChevronDown
    //             props={props}
    //             color={defaultField ? "#000" : "#fff"}
    //           />
    //         );
    //       }}
    //       inputProps={{ "aria-label": "Without label" }}
    //       MenuProps={{
    //         PaperProps: {
    //           sx: {
    //             bgcolor: "#fff",
    //             boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.1)",
    //             borderRadius: "0px",
    //             "& .MuiMenu-list": {
    //               padding: 0,
    //             },
    //             "& .MuiMenuItem-root": {
    //               padding: 2,
    //               "&:hover": {
    //                 background: "transparent"
    //                 ,
    //                 backgroundColor: "transparent !important",
    //                 ".MuiTypography-root": {
    //                   color: "var(--blackColor)",
    //                 },
    //               },
    //             },
    //             "& .Mui-selected": {
    //               background: "transparent",
    //               backgroundColor: "transparent !important"
    //               ,
    //               ".MuiTypography-root": {
    //                 color: "var(--blackColor)",
    //               },
    //             },
    //           },
    //         },
    //       }}
    //     >
    //       {selectAll && (
    //         <MenuItem key={"all"} className="w-full bg-black" value={value.length >= options.length ? 'removeAll' : "all"}>
    //           <Checkbox checked={value.length >= options.length} />
    //           <ListItemText primary={"Select All"} />
    //         </MenuItem>
    //       )}
    //       {defaultStyle
    //         ? options.map((option, i) => (
    //           <MenuItem
    //             key={option.value + i}
    //             className="w-full bg-black"
    //             value={option.value}
    //           >
    //             <Box display="flex" justifyContent="start" width="100%">
    //               <Typography
    //                 className="title-medium"
    //                 color="var(--blackColor)"
    //               >
    //                 {option.label ? option.label : option.value}
    //               </Typography>
    //             </Box>
    //           </MenuItem>
    //         ))
    //         : options.map((option, i) => (
    //           <MenuItem
    //             key={option.value + i}
    //             className="w-full bg-black"
    //             value={option.value}
    //           >
    //             {option.component}
    //           </MenuItem>
    //         ))}
    //     </Select>
    //   </FormControl>
    // </Box>

    <Box className='col-span-6' sx={{
      maxWidth: "280px"
    }}>
      <CheckboxesTags options={options} handleChange={handleChange} label={label} selectedOptions={value} />

    </Box>);
}



export default function CheckboxesTags({ options, handleChange, label, selectedOptions }) {
  const op = options.map(e => e.value)
  function onchange(e, v) {
    console.log('helloo',v)
    handleChange(e, v);
  }
  return (
    <Autocomplete
      multiple
      id="controllable-states-demo"
      value={selectedOptions}
      options={op}
      popupIcon={<ChevronDown />}
      disableCloseOnSelect
      getOptionLabel={(option) => (option as any)}
      onChange={onchange}
      renderOption={(props, option, { selected }) => (
        option == 'Select All' ? <li {...props}>
          <Checkbox
            style={{ marginRight: 8 }}
            checked={selectedOptions && selectedOptions.length == options.length - 1}
          />
          {(option as any)}</li> : <li {...props}>
          <Checkbox
            style={{ marginRight: 8 }}
            checked={selectedOptions && selectedOptions.length > 0 && selectedOptions.includes(option)}
          />
          {(option as any)}</li>
      )}
      style={{ width: '100%' }}
      renderTags={(value, getTagProps) => {
        console.log("slkdlskdl", value)
        return value.filter(option => option !== "Select All").map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      }
      renderInput={(params) => (
        <TextField {...params} placeholder={label} />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];