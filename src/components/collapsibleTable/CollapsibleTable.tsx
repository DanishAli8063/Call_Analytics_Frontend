import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ChevronDown from "../icons/chevronDown";
import "./CollapsibleTable.scss";
import DeleteIcon from "../icons/delete";
import { ActionsCell } from "../basicTable/BasicTable";
import { Tooltip } from "@mui/material";
import AddNumber from "../../pages/CampaignsPage/Create/Components/AddNumber";
import {
  AddPayoutComponent,
  PayoutComponent,
} from "../../pages/CampaignsPage/Create/Components/CallPayout";
import EditIcon from "../icons/edit";
import DynamicTooltip from "../dynamicTooltip/DynamicTooltip";
import PlusIcon from "../icons/plus";
import { useImperativeHandle, useRef } from "react";

const Row = React.forwardRef((props: { row }, ref) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openOverridePayout, setOpenOverridePayout] = React.useState(false);
  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef<any>(null);
  const areaRef = React.useRef<any>(null);
  const [showTooltip, setShowTooltip] = React.useState(false);

  function handleOpenOverride() {
    if (openOverridePayout) {
      setOpenOverridePayout(false);
      setOpen(false);
    } else {
      setOpenOverridePayout(!openOverridePayout);
      setOpen(openOverridePayout);
    }
  }

  useImperativeHandle(ref, () => ({
    handleOpenOverride: handleOpenOverride,
  }));

  React.useEffect(() => {
    let timeoutId;

    if (showTooltip) {
      timeoutId = setTimeout(() => {
        setShowTooltip(false);
      }, 1000); // Adjust the duration as needed (in milliseconds)
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showTooltip]);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  const columns1 = ["Phone Number", "Enabled", "Actions"];

  return (
    <React.Fragment>
      {/* <Tooltip
        title="Click to open!"
        arrow
        open={showTooltip}
        placement="bottom"
        PopperProps={{
          popperRef,
          anchorEl: {
            getBoundingClientRect: () => {
              return new DOMRect(
                positionRef.current.x,
                areaRef.current?.getBoundingClientRect().y + 60,
                0,
                0
              );
            },
          },
        }}
      > */}
      <TableRow
        ref={areaRef}
        onClick={() => {
          if (open) {
            setOpenOverridePayout(false);
            setOpen(false);
          } else {
            setOpen(!open);
            setOpenOverridePayout(open);
          }
        }}
        sx={{ "& > *": { borderBottom: "unset" } }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {Object.entries(row).map(([key, value], index) => {
          return (
            key != "history" && (
              <TableCell
                key={key + index}
                className={`body-medium`}
                align="left"
                // align={index != 0 ? "right" : "left"}
              >
                {key === "actions" ? (
                  <ActionsCell actions={value} />
                ) : key === "phoneNumbersCount" ? (
                  <div className="flex justify-start items-center gap-x-1">
                    <Typography className="body-medium">
                      {value as any}
                    </Typography>

                    <Typography className="body-small pointer text-[var(--greyColor)]">
                      Show Number
                    </Typography>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => {
                        if (open) {
                          setOpenOverridePayout(false);
                          setOpen(false);
                        } else {
                          setOpen(!open);
                          setOpenOverridePayout(open);
                        }
                      }}
                    >
                      {open ? (
                        <ChevronDown
                          style={{
                            rotate: "180deg",
                            transition: "rotate 500ms",
                          }}
                          color="#000"
                        />
                      ) : (
                        <ChevronDown
                          style={{
                            rotate: "0deg",
                            transition: "rotate 500ms",
                          }}
                          color="#000"
                        />
                      )}
                    </IconButton>
                  </div>
                ) : (
                  // : key == "enabled" ? (
                  // <StatusIndicator status={value}></StatusIndicator>
                  // )
                  (value as any)
                )}
              </TableCell>
            )
          );
        })}
      </TableRow>
      {/* </Tooltip> */}
      <TableRow
        className="collapsible"
        sx={{
          borderBottom: open ? "1px solid" : "0px solid !important",
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open || openOverridePayout}
            timeout="auto"
            unmountOnExit
          >
            {open ? (
              <Box
                sx={{
                  display: "grid",
                  margin: 1,
                  gridTemplateColumns: "repeat(2, 1fr)",
                  marginY: "26px",
                }}
              >
                {/* <Typography variant="h6" gutterBottom component="div">
                Phone Numbers
              </Typography> */}
                <Table
                  sx={{
                    gridColumnStart: 1,
                  }}
                  size="small"
                  aria-label="purchases"
                >
                  <TableHead className="collapsible">
                    <TableRow className="collapsible">
                      {columns1.map((column, i) => (
                        <TableCell
                          key={column + i}
                          align={i != 0 ? "right" : "left"}
                        >
                          {column}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((num, i) => (
                      <TableRow className="collapsible" key={num + i}>
                        {Object.entries(num).map(([key, value], index) => (
                          <TableCell
                            key={key + index}
                            className={`body-medium`}
                            align={index != 0 ? "right" : "left"}
                          >
                            {key === "actions" ? (
                              <ActionsCell actions={value} />
                            ) : (
                              (value as any)
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    gridColumnStart: 2,
                  }}
                >
                  <AddNumber />
                </Box>
              </Box>
            ) : (
              <div className="p-4">
                <AddPayoutComponent />
                <PayoutComponent number="1" text="$22 on Connected Call" />
                <PayoutComponent
                  number="2"
                  text="$12 if call length exceeds 120 sec"
                />
              </div>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
});

export default function CollapsibleTable() {
  const rowRefs = useRef<any>([]);

  const handleClick = (index) => {
    rowRefs.current[index].current.handleOpenOverride();
  };

  const columns = [
    "Publisher",
    "Phone Numbers Count",
    "Enabled",
    "Configuration Overrides",
    "Actions",
  ];
  const rows = [
    {
      name: "Demo",
      phoneNumbersCount: "01",
      enabled: "Yes",
      configuration: (
        <PayoutComponent noBottomMargin table number="1" text="$8 on Connected Call" />
      ),
      actions: [
        {
          icon: (
            <DynamicTooltip helperText="Override Campaign Configuration Settings">
              <EditIcon />
            </DynamicTooltip>
          ),
          onClick: (e) => {
            e.stopPropagation();
            handleClick(0);
          },
        },
        {
          icon: (
            <DynamicTooltip helperText="Add Numbers">
              <PlusIcon />
            </DynamicTooltip>
          ),
          onClick: () => {},
        },
        {
          icon: <DeleteIcon />,
          onClick: () => {},
        },
      ],
      history: [
        {
          phoneNumber: "+93 398 309 9339",
          enabled: "yes",
          actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
        },
        {
          phoneNumber: "+93 398 309 9339",
          enabled: "yes",
          actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
        },
      ],
    },
    {
      name: "Demo",
      phoneNumbersCount: "01",
      enabled: "No",
      configuration: (
        <p>
          Using{" "}
          <span style={{ fontWeight: "500" }}>Default payout settings</span>
        </p>
      ),

      actions: [
        {
          icon: (
            <DynamicTooltip helperText="Override Campaign Configuration Settings">
              <EditIcon />
            </DynamicTooltip>
          ),
          onClick: (e) => {
            e.stopPropagation();
            handleClick(1);
          },
        },
        {
          icon: (
            <DynamicTooltip helperText="Add Numbers">
              <PlusIcon />
            </DynamicTooltip>
          ),
          onClick: () => {},
        },
        { icon: <DeleteIcon />, onClick: () => {} },
      ],
      history: [
        {
          phoneNumber: "+93 398 309 9339",
          enabled: "yes",
          actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
        },
        {
          phoneNumber: "+93 398 309 9339",
          enabled: "yes",
          actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
        },
      ],
    },
    {
      name: "Demo",
      phoneNumbersCount: "01",
      enabled: "Yes",
      configuration: (
        <PayoutComponent noBottomMargin table number="2" text="$19 if call length exceeds 220 sec" />
      ),
      actions: [
        {
          icon: (
            <DynamicTooltip helperText="Override Campaign Configuration Settings">
              <EditIcon />
            </DynamicTooltip>
          ),
          onClick: (e) => {
            e.stopPropagation();
            handleClick(2);
          },
        },
        {
          icon: (
            <DynamicTooltip helperText="Add Numbers">
              <PlusIcon />
            </DynamicTooltip>
          ),
          onClick: () => {},
        },
        { icon: <DeleteIcon />, onClick: () => {} },
      ],
      history: [
        {
          phoneNumber: "+93 398 309 9339",
          enabled: "yes",
          actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
        },
        {
          phoneNumber: "+93 398 309 9339",
          enabled: "yes",
          actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
        },
      ],
    },
    {
      name: "Demo",
      phoneNumbersCount: "01",
      enabled: "No",
      configuration: (
        <PayoutComponent noBottomMargin table number="1" text="$12 on Connected Call" />
      ),
      actions: [
        {
          icon: (
            <DynamicTooltip helperText="Override Campaign Configuration Settings">
              <EditIcon />
            </DynamicTooltip>
          ),
          onClick: (e) => {
            e.stopPropagation();
            handleClick(3);
          },
        },
        {
          icon: (
            <DynamicTooltip helperText="Add Numbers">
              <PlusIcon />
            </DynamicTooltip>
          ),
          onClick: () => {},
        },
        { icon: <DeleteIcon />, onClick: () => {} },
      ],
      history: [
        {
          phoneNumber: "+93 398 309 9339",
          enabled: "yes",
          actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
        },
        {
          phoneNumber: "+93 398 309 9339",
          enabled: "yes",
          actions: [{ icon: <DeleteIcon />, onClick: () => {} }],
        },
      ],
    },
  ];

  const renderRows = () => {
    return rows.map((row, i) => {
      const rowRef = useRef();
      rowRefs.current[i] = rowRef;
      return <Row ref={rowRef} key={row.name + i} row={row} />;
    });
  };

  return (
    <TableContainer className="collapsible-table" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            {columns.map((column, i) => (
              <TableCell
                key={column + i}
                align={i == columns.length - 1 ? "right" : "left"}
              >
                {/* align={i != 0 ? "right" : "left"}> */}
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderRows()}
          {/* {rows.map((row, i) => (
            <Row key={row.name + i} row={row} />
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function StatusIndicator({ status }) {
  let indicatorColor = "";
  if (status === "Yes") {
    indicatorColor = "var(--greenColor)";
  } else if (status === "No") {
    indicatorColor = "var(--redColor)";
  }

  return (
    <div className="flex justify-start">
      <div
        className="w-4	h-4 rounded-full"
        style={{ backgroundColor: indicatorColor }}
      />
    </div>
  );
}
