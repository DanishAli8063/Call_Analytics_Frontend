import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent ,DialogActions} from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import logo from "../../assets/img/logo.png";
import "./AuthenticatedRoot.scss";
const { server_address } = require('../../ConfigAddress');

export default function AuthenticatedRoot() {
  const navigate = useNavigate();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openProfilePopup, setOpenProfilePopup] = useState(false); // State for profile popup visibility
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/login');
    window.location.reload();
    setOpenLogoutDialog(false);
  };

  const toggleLogoutDialog = () => {
    setOpenLogoutDialog(!openLogoutDialog);
  };

  const toggleProfilePopup = () => {
    setOpenProfilePopup(!openProfilePopup); // Toggle profile popup visibility
  };

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ username: '', role: '' });

  useEffect(() => {
    fetch(server_address+'/get_users')
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
        const userId = localStorage.getItem("userId");
        const user = data.users.find(user => user.user_id === userId);
        if (user) {
          setCurrentUser({ username: user.username, role: user.role });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);




  return (
    <>

<Box

      
        className="AuthenticatedRoot"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <header>
          <div className="column flex flex-col justify-center">
            <img width="165px" src={logo} alt="Logo" />
          </div>
          <div className="" style={{color:"red", alignItems:"center", display:"flex"}} >
      
        
   {currentUser.role === 'Admin' && (
        <NavLink to="/dispana/setting" style={{marginRight:"10px"}}>
          <SettingsOutlinedIcon style={{fontSize:"20pt"}} />
        </NavLink>
      )}


<Box onClick={toggleProfilePopup} style={{ marginRight:"10px", color: 'inherit', textTransform: 'none' , cursor: 'pointer'}}>
  <AccountCircleIcon style={{ fontSize: "20pt" }} />
</Box>

        
        <Box onClick={toggleLogoutDialog} style={{color: 'inherit', textTransform: 'none', cursor: 'pointer'}}>
              <ExitToAppIcon style={{fontSize:"20pt"}} /> 
            </Box>
          </div>
        </header>
        <div className="main-layout">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main-content">
            <Outlet />
          </div>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingY: "18px",
          }}
        >
          <Typography className="title-medium text-[var(--greyColor)]">
            Call Analytics Tool By ML Team
          </Typography>
        </Box>
      </Box>
      
       {/* Profile Popup Dialog */}
       <Dialog 
  open={openProfilePopup} 
  onClose={toggleProfilePopup}
  sx={{
    '& .MuiDialog-paper': { maxWidth: 'none' }, // This sets the dialog width to 40% and removes the max-width restriction
  }}
>
<DialogContent>
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box flexShrink={0}>
        <AccountCircleIcon style={{ fontSize: "52pt" }} />
      </Box>
      <Box marginLeft={2}> {/* Adjust spacing as needed */}
  <Typography>Username: <span  style={{ color: 'red' }}>{currentUser.username}</span></Typography>
  <Typography>Role: <span  style={{ color: 'red' }}>{currentUser.role}</span></Typography>
</Box>

    </Box>
  </DialogContent>
  <Button onClick={toggleProfilePopup} color="primary">
    Close
  </Button>
</Dialog>


      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={toggleLogoutDialog}>
        <DialogTitle>{"Logout"}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleLogoutDialog} color="primary">
            No
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
