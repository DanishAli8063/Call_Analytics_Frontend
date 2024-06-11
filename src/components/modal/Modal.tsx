import { Outlet } from "react-router-dom";
import React, { useState, useEffect, ReactNode } from "react";
import { Backdrop, Box, Button, Modal, SxProps, Theme, Typography } from "@mui/material";
import crossIcon from "../../assets/img/icons/cross.svg";

type Props = {
  openVerifyModal: boolean;
  setOpenVerifyModal: (value: React.SetStateAction<boolean>) => void;
  children: ReactNode;
  minWidth?: number;
  sx?: SxProps<Theme> | undefined;
};

export default function CustomModal(props: Props) {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.openVerifyModal}
        onClose={() => props.setOpenVerifyModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            padding: "10% 10%",
            transform: "translate(-50%, -50%)",
            minWidth: props.minWidth ? props.minWidth : 780,
            bgcolor: "background.paper",
            boxShadow: 24,
            // p: 4,
            borderRadius: "10px",
            ...props.sx
          }}
        >
          <Box
            component="img"
            onClick={() => props.setOpenVerifyModal(false)}
            sx={{
              position: "absolute",
              cursor: "pointer",
              top: 15,
              right: 15,
              height: 20,
              width: 20,
            }}
            src={crossIcon}
          />
          {props.children}
        </Box>
      </Modal>
    </>
  );
}
