import React, { useState, useEffect } from 'react';
import { Card,Box, CardContent, Typography, Grid } from '@material-ui/core';
import { Button, TextField } from "@mui/material";
import theme from "../../styles/theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,useParams, NavLink } from 'react-router-dom';
import Papa from 'papaparse';
import "./BasicTable.scss";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const { server_address } = require('../../ConfigAddress');

const CampaignPanel = () => {

  const [campaignData, setCampaignData] = useState({});
  const [fileStates, setFileStates] = useState([]);
const [ clientCampaignStates,setClientCampaignStates]=useState([]);
const [selectedClientCampaign, setSelectedClientCampaign] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { links } = useParams();
  const [clientCampaignName, setClientCampaignName] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
      navigate("/dispana");
  };

  const { param1 } = useParams();
  const openPopup = () => {
    setIsPopupOpen(true);
};

const closePopup = () => {
    setIsPopupOpen(false);
    setClientName("");
    // setClientInfo("");
};

const handleAddClientCampaign = () => {
  if (clientCampaignName.trim() === "") {
      toast.error("Please enter a campaign name.");
      return;
  }

  const apiUrl = (server_address  + '/insert_campaign_client'); // Replace with your actual API URL

  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_campaign_name: clientCampaignName }), // Send the client name in the request body
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
          // toast.success("Client Campaign added successfully!");

          closePopup(); // Close the popup after successful addition
          setClientCampaignName(""); // Reset client name

          // Reload the page after a short delay to ensure the success message is shown
          setTimeout(() => {
              window.location.reload();
          }, 1000); // Delay of 1000 milliseconds (1 second)
      })
      .catch(error => {
          console.error('Error adding client Campaign:', error);
          toast.error("Error adding client Campaign. Please try again.");
      });
};



    // Fetch area and disposition states
  
    useEffect(() => {
      const url = `${server_address}/get_file_client`;
  
      // Using POST method
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_name: links,
          campaign_client: ['med','fe'] // Corrected to an array
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched:', data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
      console.log("campaign...",clientCampaignStates)
    }, []);
  

const fetchClients = async () => {
  try {
    const response = await fetch(server_address + '/get_client');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
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


useEffect(() => {
  fetch(server_address + '/get_client_campaign')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          if (data.data.data && data.data.data.length > 0) {
              setClientCampaignStates(data.data.data);
          } else {
              console.log("No data available");
              setClientCampaignStates([]);
          }
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          setClientCampaignStates([]);
      });
}, []); // Dependencies array is empty to ensure this runs only once on mount







  return (
    <Box className="px-6 py-8">
    
     <div className='heading_out' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,marginBottom:"6px" }}>
     <Typography  color={theme.palette.primary.main} className=" heading_log" marginBottom="6px">
     <div onClick={handleClick}>
            <KeyboardBackspaceIcon />
        </div><span>{param1}'s </span>
Campaigns
  </Typography>
  <Typography  color={theme.palette.primary.main} className="headline-medium heading_log" marginBottom="6px">
  <span>{param1}</span>
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
                            Add Campaign
                        </Button>
</div>

      
     
                {/* Overlay */}
                {isPopupOpen && <div className="overlay"></div>}

                {/* Popup */}
                {isPopupOpen && (
                    <div className="popup">
                        <div className="popup-content">
                            <Typography variant="h6">Add Client Campaign</Typography>
                            <TextField
                                sx={{ marginBottom: "10px", marginTop: "12px" }}
                                label="Client Campaign Name"
                                variant="outlined"
                                fullWidth
                                value={clientCampaignName}
                                onChange={(e) => setClientCampaignName(e.target.value)}
                            />

                            <Button variant="outlined" fullWidth onClick={handleAddClientCampaign}>
                                Campaign Add
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
          {clientCampaignStates.map((campaigns, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
              <Card variant="outlined" style={{ border: '1px solid #E01E26', padding: 0 }}>
                <CardContent style={{ textAlign: "center", padding: 0 }}>
                  <NavLink to={`${window.location.href}/${campaigns}`}>
                  <Typography variant="h6" component="h2" >
                  {campaigns}
                 
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

export default CampaignPanel;