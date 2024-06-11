import React, { useState, useEffect } from 'react';
import { Card,Box, CardContent, Typography, Grid } from '@material-ui/core';
import { Button, TextField } from "@mui/material";
import theme from "../../styles/theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams,NavLink } from 'react-router-dom';
import Papa from 'papaparse';
import "./BasicTable.scss";
const { server_address } = require('../../ConfigAddress');

const ClientsPanel = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { links } = useParams();


  const openPopup = () => {
    setIsPopupOpen(true);
};

const closePopup = () => {
    setIsPopupOpen(false);
    setClientName("");
    // setClientInfo("");
};


const handleAddClient = () => {
  if (clientName.trim() === "") {
      // toast.error("Please enter a client name.");
      return;
  }
  setIsAdding(true);  // Disable the button and change the text

  const apiUrl = server_address + '/insert_client'; // Replace with your actual API URL

  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_name: clientName }), // Send the client name in the request body
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data && Array.isArray(data.data)) {
          console.log(data.data[1]); // Logs only the second element of the array which is the message
      }

      if (data.data[0] === true) {
          // toast.success("Client added successfully!");
      } else {
          toast.info(data.data[1]); // Displays the message from the response
      }
      if (data.data[0] === false) {
        // toast.success("Client added successfully!");
    } else {
        toast.info(data.data[1]); // Displays the message from the response
    }

      closePopup(); // Close the popup after successful addition
      setClientName(""); // Reset client name

      // Use a timeout to ensure the user sees the success message before the page reloads
      setTimeout(() => {
          window.location.reload();
      }, 1000); // Adjust the delay as needed
  })
  .catch(error => {
      console.error("API Error:", error); // Logs any error to the console
      
  })
  .finally(() => {
    setIsAdding(false);  // Re-enable the button once the process is complete
  });
};




const fetchClients = async () => {
  try {
    const response = await fetch(server_address + '/get_client');
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("response....",data)
    if (data?.data?.status) {
      // Exclude the first element from the array before setting it
      const clientsArray = data.data.data.slice(1);
      setClients(clientsArray);
      setLastUpdate(data.data.lastUpdate); // Update with a timestamp or unique identifier from the response
    } else {
      setError('No data found');
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

console.log("clients.....",clients)
useEffect(() => {
  fetchClients();
}, []);


useEffect(() => {
  const intervalId = setInterval(async () => {
    try {
      const response = await fetch(server_address +'/get_client');
      const updateData = await response.json();
      if (updateData.lastUpdate !== lastUpdate) {
        fetchClients();
      }
    } catch (error) {
      
    }
  }, 1000); // Adjust the interval as needed

  return () => clearInterval(intervalId);
}, [lastUpdate]);




  return (
    <Box className="px-6 py-8">
    
     <div className='heading_out' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,marginBottom:"6px" }}>
  <Typography  color={theme.palette.primary.main} className="headline-medium heading_log" marginBottom="6px">
    Clients
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
    onClick={openPopup}
  >
    Add Client
  </Button>
</div>

      
      {isPopupOpen && <div className="overlay"></div>}
      
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <Typography variant="h6">Add Client</Typography>
            <TextField
              sx={{ marginBottom: "10px", marginTop: "12px" }}
              label="Client Name"
              variant="outlined"
              fullWidth
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <Button variant="outlined" fullWidth onClick={handleAddClient}>
            {isAdding ? 'Adding...' : 'Add'}
            </Button>
            <Button variant="outlined" fullWidth onClick={closePopup}>
              Cancel
            </Button>
          </div>
        </div>
        
      )}

      
<ToastContainer />
      <div>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={2}>
            {clients.map((client, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                <Card variant="outlined" style={{ border: '1px solid #E01E26', padding: 0 }}>
              <CardContent style={{ textAlign: "center", padding: 0 }}> {/* Remove padding here */}
                <NavLink to={`http://${window.location.hostname}:${window.location.port}/dispana/${client}`}>
                  <Typography variant="h6" component="h2" >
                    {client}
                  </Typography>
                </NavLink>
              </CardContent>
            </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    
    </Box>
  );
};

export default ClientsPanel;