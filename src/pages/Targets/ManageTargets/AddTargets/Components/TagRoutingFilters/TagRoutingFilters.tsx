// import {
//   Box,
//   Button,
//   Divider,
//   Input,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { Suspense, useEffect, useMemo, useState } from "react";
// import PlusIcon from "../../../../../../components/icons/plus";
// import AddCondition from "./AddCondition";
// import theme from "../../../../../../styles/theme";

// export interface FormState {
//   enableFilter: boolean;
//   formState: {
//     filter: {
//       zipcode: boolean;
//       country: boolean;
//     };
//   };
// }

// interface FilterState {
//   [filterKey: number]: {
//     conditions: number[];
//     relations?: String[];
//   };
// }

// function TagRoutingFilters(): JSX.Element {
//   const [filterState, setFilterState] = useState<FilterState>({
//     "1689598227610": { conditions: [1689598227612], relations: [] },
//   });

//   const incrementCondition = (startIndex: number, relation: String) => {
//     const newState = {
//       ...filterState,
//       [startIndex]: {
//         ...filterState![startIndex],
//         conditions: [...filterState![startIndex].conditions, Date.now()],
//         relations: [...filterState![startIndex].relations!, relation],
//       },
//     };

//     setFilterState(newState);
//   };

//   const incrementFilter = () => {
//     setFilterState((prev) => {
//       let newState = {
//         [Date.now()]: {
//           conditions: [Date.now() + 1],
//           relations: [],
//         },
//       };
//       return { ...prev, ...newState };
//     });
//   };

//   return (
//     <>
//       <Typography
//         className="headline-medium"
//         marginBottom="56px"
//         color={theme.palette.primary.main}
//       >
//         Tag Routing Filters
//       </Typography>
//       <Box
//         sx={{
//           display: "flex",
//         }}
//       >
//         {filterState && Object.entries(filterState!).length == 0 ? (
//           <Button
//             variant="outlined"
//             startIcon={<PlusIcon color="var(--blackColor)" />}
//             className="headline-small"
//             sx={{
//               padding: "8.5px 16px",
//               textTransform: "none",
//               border: "1px solid var(--blackColor)",
//               color: "var(--blackColor)",
//               borderRadius: "5px",
//               minWidth: "172px",
//             }}
//             onClick={() => {
//               incrementFilter();
//             }}
//           >
//             Add Filter
//           </Button>
//         ) : (
//           <Box>
//             {filterState &&
//               Object.entries(filterState).map(([filterKey, filter], i) => {
//                 return (
//                   <Box key={filterKey}>
//                     <Typography className="headline-medium text-[var(--redColor)]">
//                       {i + 1}.
//                     </Typography>
//                     <Box
//                       sx={{
//                         borderBottom: "1px solid var(--greyColor)",
//                         marginY: "20px",
//                       }}
//                     >
//                       {filter.conditions &&
//                         filter.conditions.map(
//                           (
//                             conditionKey: React.Key | null | undefined,
//                             i: any
//                           ) => {
//                             return (
//                               <>
//                                 {i > 0 && (
//                                   <Divider
//                                     sx={{
//                                       marginY: "32px",
//                                       "&.MuiDivider-root": {
//                                         "&::before, &::after": {
//                                           borderTop: `thin solid var(--blackColor)}`,
//                                         },
//                                       },
//                                     }}
//                                   >
//                                     {filter.relations[i - 1]}
//                                   </Divider>
//                                 )}
//                                 <AddCondition
//                                   key={conditionKey}
//                                   onDelete={() => {
//                                     const newState = {
//                                       ...filterState,
//                                     };
//                                     let index;
//                                     Object.keys(newState).forEach((key) => {
//                                       if (key == filterKey) {
//                                         newState[key].conditions = newState[
//                                           key
//                                         ].conditions.filter(
//                                           (condition, cIndex) => {
//                                             index = cIndex;
//                                             return condition !== conditionKey;
//                                           }
//                                         );

//                                         newState[key].relations.splice(
//                                           index - 2,
//                                           1
//                                         );
//                                       }
//                                       if (
//                                         newState[key].conditions.length === 0
//                                       ) {
//                                         delete newState[key];
//                                       } else {
//                                       }
//                                     });
//                                     setFilterState(newState);
//                                   }}
//                                 />
//                               </>
//                             );
//                           }
//                         )}
//                       {filter.conditions && filter.conditions.length < 3 ? (
//                         <div className="flex gap-x-4 mt-8 justify-end">
//                           <Button
//                             variant="outlined"
//                             className="headline-small"
//                             sx={{
//                               padding: "8.5px 16px",
//                               textTransform: "none",
//                               border: "1px solid var(--blackColor) !important",
//                               backgroundColor: "transparent !important",
//                               color: "var(--blackColor)",
//                               borderRadius: "5px",
//                               marginBottom: "20px",
//                             }}
//                             onClick={() =>
//                               incrementCondition(Number(filterKey), "OR")
//                             }
//                           >
//                             OR
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             className="headline-small"
//                             sx={{
//                               padding: "8.5px 16px",
//                               textTransform: "none",
//                               border: "1px solid var(--blackColor) !important",
//                               backgroundColor: "transparent !important",
//                               color: "var(--blackColor)",
//                               borderRadius: "5px",
//                               marginBottom: "20px",
//                             }}
//                             onClick={() =>
//                               incrementCondition(Number(filterKey), "AND")
//                             }
//                           >
//                             AND
//                           </Button>
//                         </div>
//                       ) : (
//                         <Box height="32px" />
//                       )}
//                     </Box>
//                   </Box>
//                 );
//               })}
//             <Button
//               variant="outlined"
//               startIcon={<PlusIcon color="var(--blackColor)" />}
//               className="headline-small"
//               sx={{
//                 padding: "8.5px 16px",
//                 textTransform: "none",
//                 // border: "0px !important",
//                 backgroundColor: "transparent !important",
//                 color: "var(--blackColor)",
//                 borderRadius: "5px",
//                 minWidth: "172px",
//               }}
//               onClick={() => {
//                 incrementFilter();
//               }}
//             >
//               Add Filter
//             </Button>
//           </Box>
//         )}
//       </Box>
//       {/* <button onClick={}></button> */}
//       <Divider
//         sx={{
//           borderColor: "var(--greyColor)",
//           marginY: "72px",
//         }}
//       />
//     </>
//   );
// }

// export default TagRoutingFilters;

import {
  Box,
  Button,
  Divider,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import PlusIcon from "../../../../../../components/icons/plus";
import AddCondition from "./AddCondition";
import theme from "../../../../../../styles/theme";

export interface FormState {
  enableFilter: boolean;
  formState: {
    filter: {
      zipcode: boolean;
      country: boolean;
    };
  };
}

interface FilterState {
  [filterKey: number]: {
    conditions: number[];
    relations?: String[];
  };
}

function TagRoutingFilters(): JSX.Element {
  const [filterState, setFilterState] = useState<FilterState>({
    "1689598227610": { conditions: [1689598227612], relations: [] },
  });

  const incrementCondition = (startIndex: number, relation: String) => {
    const newState = {
      ...filterState,
      [startIndex]: {
        ...filterState![startIndex],
        conditions: [...filterState![startIndex].conditions, Date.now()],
        relations: [...filterState![startIndex].relations!, relation],
      },
    };

    setFilterState(newState);
  };

  const incrementFilter = () => {
    setFilterState((prev) => {
      let newState = {
        [Date.now()]: {
          conditions: [Date.now() + 1],
          relations: [],
        },
      };
      return { ...prev, ...newState };
    });
  };

  return (
    <>
      <Typography
        className="headline-medium"
        marginBottom="56px"
        color={theme.palette.primary.main}
      >
        Tag Routing Filters
      </Typography>
      <Box
        sx={{
          display: "flex",
        }}
      >
        {filterState && Object.entries(filterState!).length == 0 ? (
          <Button
            variant="outlined"
            startIcon={<PlusIcon color="var(--blackColor)" />}
            className="headline-small"
            sx={{
              padding: "8.5px 16px",
              textTransform: "none",
              border: "1px solid var(--blackColor)",
              color: "var(--blackColor)",
              borderRadius: "5px",
              minWidth: "172px",
            }}
            onClick={() => {
              incrementFilter();
            }}
          >
            Add Filter
          </Button>
        ) : (
          <Box>
            {filterState &&
              Object.entries(filterState).map(([filterKey, filter], i) => {
                return (
                  <Box key={filterKey}>
                    <Typography className="headline-medium text-[var(--redColor)]">
                      {i + 1}.
                    </Typography>
                    <Box
                      sx={{
                        borderBottom: "1px solid var(--greyColor)",
                        marginY: "20px",
                      }}
                    >
                      {filter.conditions &&
                        filter.conditions.map(
                          (
                            conditionKey: React.Key | null | undefined,
                            i: any
                          ) => {
                            return (
                              <React.Fragment key={conditionKey}>
                                {i > 0 && (
                                  <Divider
                                    sx={{
                                      marginY: "32px",
                                      "&.MuiDivider-root": {
                                        "&::before, &::after": {
                                          borderTop: `thin solid var(--blackColor)}`,
                                        },
                                      },
                                    }}
                                  >
                                    {filter.relations[i - 1]}
                                  </Divider>
                                )}
                                <AddCondition
                                  key={conditionKey}
                                  onDelete={() => {
                                    const newState = {
                                      ...filterState,
                                    };
                                    let index;
                                    Object.keys(newState).forEach((key) => {
                                      if (key == filterKey) {
                                        newState[key].conditions = newState[
                                          key
                                        ].conditions.filter(
                                          (condition, cIndex) => {
                                            index = cIndex;
                                            return condition !== conditionKey;
                                          }
                                        );

                                        newState[key].relations.splice(
                                          index - 2,
                                          1
                                        );
                                      }
                                      if (
                                        newState[key].conditions.length === 0
                                      ) {
                                        delete newState[key];
                                      } else {
                                      }
                                    });
                                    setFilterState(newState);
                                  }}
                                />
                              </React.Fragment>
                            );
                          }
                        )}
                      {filter.conditions && filter.conditions.length < 2 ? (
                        <div className="flex gap-x-4 mt-8 justify-end">
                          <Button
                            variant="outlined"
                            className="headline-small"
                            sx={{
                              padding: "8.5px 16px",
                              textTransform: "none",
                              border: "1px solid var(--blackColor) !important",
                              backgroundColor: "transparent !important",
                              color: "var(--blackColor)",
                              borderRadius: "5px",
                              marginBottom: "20px",
                            }}
                            onClick={() =>
                              incrementCondition(Number(filterKey), "OR")
                            }
                          >
                            OR
                          </Button>
                          <Button
                            variant="outlined"
                            className="headline-small"
                            sx={{
                              padding: "8.5px 16px",
                              textTransform: "none",
                              border: "1px solid var(--blackColor) !important",
                              backgroundColor: "transparent !important",
                              color: "var(--blackColor)",
                              borderRadius: "5px",
                              marginBottom: "20px",
                            }}
                            onClick={() =>
                              incrementCondition(Number(filterKey), "AND")
                            }
                          >
                            AND
                          </Button>
                        </div>
                      ) : (
                        <Box height="32px" />
                      )}
                    </Box>
                  </Box>
                );
              })}
            <Button
              variant="outlined"
              startIcon={<PlusIcon color="var(--blackColor)" />}
              className="headline-small"
              sx={{
                padding: "8.5px 16px",
                textTransform: "none",
                // border: "0px !important",
                backgroundColor: "transparent !important",
                color: "var(--blackColor)",
                borderRadius: "5px",
                minWidth: "172px",
              }}
              onClick={() => {
                incrementFilter();
              }}
            >
              Add Filter
            </Button>
          </Box>
        )}
      </Box>
      {/* <button onClick={}></button> */}
      <Divider
        sx={{
          borderColor: "var(--greyColor)",
          marginY: "72px",
          marginX: "-24px",
        }}
      />
    </>
  );
}

export default TagRoutingFilters;
