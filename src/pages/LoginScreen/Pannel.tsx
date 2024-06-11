import React, { useState ,useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Card, Box, CardContent, Typography, Grid } from '@material-ui/core';
import theme from "../../styles/theme";
import { classNames } from "../../utils";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CircularProgress from "@mui/material/CircularProgress";
const { server_address } = require('../../ConfigAddress');
export default function Panel(
  className = "",
  hideHeader = true,
) {
  // Define the rows state using useState
  const [users, setUsers] = useState([]);


  const [openNewPopup, setOpenNewPopup] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [deleteRowData, setDeleteRowData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAdminDialog, setOpenAdminDialog] = useState(false);


  const handleDeleteClick = (rowData) => {
    setDeleteRowData(rowData);
    setOpenDeleteDialog(true);
  };
  
  const handleAdminClick = (user) => {
    setOpenAdminDialog(true);
    setDeleteRowData(user); // Store user data to pass it to handleSureButtonClick
  };




  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };
  const handleAdminDialogClose = () => {
    setOpenAdminDialog(false);
  };


  const handleDeleteRow = () => {
    // Make a DELETE request to your API to delete the user
    fetch(server_address+`/delete_user/${deleteRowData.user_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the API if needed
        console.log('User deleted successfully:', data);
        // Remove the deleted user from the state
        const updatedRows = users.filter(row => row !== deleteRowData);
        // Update rows state
        setUsers(updatedRows);
        // Close the delete confirmation dialog
        setOpenDeleteDialog(false);
      })
      .catch(error => {
        // Handle errors if the API request fails
        console.error('Error deleting user:', error);
      });
  };
  



// Add User Api 

  const handleAddUser = () => {
    // Check if username and password are filled
    if (newUsername.trim() === '' || newPassword.trim() === '') {
      // You may want to display an error message here
      return;
    }

    // Prepare data for the API request
    const userData = {
      username: newUsername,
      password: newPassword,
    };

    // Make a POST request to your API to save the new user
    fetch(server_address+'/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the API if needed
        console.log('User added successfully:', data);
        // Close the dialog
        setOpenNewPopup(false);
        // You may want to perform additional actions after adding the user

          // Refresh the page
      window.location.reload();
      })
      .catch(error => {
        // Handle errors if the API request fails
        console.error('Error adding user:', error);
      });
  };



 // Fetch data from the API
 useEffect(() => {
  fetch(server_address+'/get_users')
    .then(response => response.json())
    .then(data => setUsers(data.users))
    .catch(error => console.error('Error fetching data:', error));
}, []);


// Admin Api

const handleSureButtonClick = (user_id) => {
  fetch(server_address+`/user_admin/${user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log('API response:', response);
    // Handle success response if needed
    window.location.reload();
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle error if the API call fails
  });
};

  return (
    <Box className="px-4 py-8">
      <div className='heading_out mb-3' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "6px" }}>
        <Typography color={theme.palette.primary.main} className="headline-medium heading_log" marginBottom="6px">
          Users
        </Typography>

        <Button
          type="button"
          variant="outlined"
          className="title-medium"
          sx={{
            width: "160px",
            padding: "8.5px 16px",
            textTransform: "none",
            border: "1px solid #E01E26",
            color: "#E01E26",
            borderRadius: "5px",
            "&:hover": {
              color: "#fff",
              backgroundColor: "var(--redColor)",
              "& svg": {
                fill: "#fff",
              },
            },
          }}
          onClick={() => setOpenNewPopup(true)}
        >
          Add User
        </Button>
      </div>

      <TableContainer
      
        className={classNames(
          `basic-table`,
          className,
        )}
        component={Paper}
      >
        <Table
          aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '100px' }}  style={{textAlign:"center"}}>Sr. No</TableCell>
              <TableCell  style={{textAlign:"center"}}>Username</TableCell>
              <TableCell  style={{textAlign:"center"}}>Role</TableCell>
              <TableCell  style={{textAlign:"center"}} sx={{ width: '20px' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <TableRow
            key={user.user_id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell  style={{textAlign:"center"}} sx={{ width: '100px' }} component="th" scope="row">
              {users.indexOf(user) + 1}
            </TableCell>
            <TableCell  style={{textAlign:"center"}}>{user.username}</TableCell>
            <TableCell  style={{textAlign:"center"}}>
              {user.role === 'Admin' ? (
                 <Button
                 type="button"
                 variant="outlined"
                 sx={{
                   width: "130px",
                   fontSize:"8pt",
                   textTransform: "none",
                   border: "1px solid #E01E26",
                   color: "#E01E26",
                   borderRadius: "5px",
                  
                 }}
        
                 >
                  Admin
                 </Button>
              ) : (
                <Button
                type="button"
                variant="outlined"
                sx={{
                  width: "130px",
                  fontSize:"8pt",
                  textTransform: "none",
                  border: "1px solid #E01E26",
                  color: "#E01E26",
                  borderRadius: "5px",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "var(--redColor)",
                    "& svg": {
                      fill: "#fff",
                    },
                  },
                }}
                  onClick={() => handleAdminClick(user)}
                >
                   Promote to Admin
                </Button>
              )}
            </TableCell>
            <TableCell sx={{ width: '20px' }}>
              <IconButton
                style={{
                  color: 'grey',
                  borderRadius: '50%', // Circular border
                  padding: '5px',
                }}
                onClick={() => handleDeleteClick(user)} // Open delete confirmation dialog on delete icon click
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          
          ))
        ) : (
          // Render a message or loading indicator if users is not an array or is empty
          <TableRow>
          <TableCell colSpan={4} align="center">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CircularProgress />
              </div>
          </TableCell>
      </TableRow>
        )}
      </TableBody>
        </Table>
      </TableContainer>


 {/* Popup Dialog for adding a new user */}
 <Dialog open={openNewPopup} onClose={() => setOpenNewPopup(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            variant="outlined"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
        <DialogActions>
          <Button onClick={() => setOpenNewPopup(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add User
          </Button>
        </DialogActions>
        </DialogActions>
      </Dialog>

 {/* Admin Confirmation Dialog */}
 <Dialog open={openAdminDialog} onClose={handleAdminDialogClose}>
        <DialogTitle>User to Admin</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to promote this user to an Admin role?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdminDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSureButtonClick(deleteRowData.user_id)}  color="primary">
           Sure
          </Button>
        </DialogActions>
      </Dialog>


      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteRow} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
