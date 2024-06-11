import React, { useState, useEffect } from 'react';
import { Card,Box, CardContent, Typography, Grid } from '@material-ui/core';
import { Button, TextField } from "@mui/material";
import theme from "../../styles/theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams,NavLink } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Papa from 'papaparse';
import "./BasicTable.scss";
const { server_address } = require('../../ConfigAddress');

const FilePanel = () => {
    
    const [fileStates, setFileStates] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
    const { param1, param2 } = useParams();
   

  const handleClick = () => {
      navigate("/dispana/"+param1);
  };

    const handleAddFiles = () => {
        navigate(`/disp_analyzer/${param1}/${param2}/`);
    };

    const handleOpenFile = (file_id) => {
      navigate(`/disp_analyzer/${param1}/${param2}/${file_id}`);
   };
    
 
 

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


const fetchFileData = () => {
    const url = `${server_address}/get_file_client`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_name: param1,
        campaign_client: [param2]  // Ensure this matches the backend's expected structure
      }),
      
    })
    .then(response => response.json())
    .then(data => {
      if (data.data && data.data.status) {
        setFileStates(data.data.data);  // Assuming data.data.data is the array of file names
        setIsLoading(false);
        
      } else {
        throw new Error(data.data.msg || "Failed to fetch data");
      }
    })
    .catch(error => {
    });
   
  };

  useEffect(() => {
    fetchFileData();
    console.log(fileStates);
  }, [param1, param2]); // This will re-fetch data whenever these parameters change
  
  useEffect(() => {
    console.log('File States Updated:', fileStates);
  }, [fileStates]); // Logs whenever fileStates changes



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
     <Typography  color={theme.palette.primary.main} className=" heading_log" marginBottom="6px">
     <div onClick={handleClick}>
            <KeyboardBackspaceIcon />
        </div>
        <span>{param1} {param2}'s </span>
Files
  </Typography>
  <Typography  color={theme.palette.primary.main} className="headline-medium heading_log" marginBottom="6px">
  <span onClick={handleClick}>{param1}</span>
      <span style={{ color: 'black', fontSize: '22px', margin: '0 5px' }}>»</span>
      <span>{param2}</span>
  </Typography>

                <Button
                    type="button"
                    variant="outlined"
                    onClick={handleAddFiles}
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
                >
                    Generate Files
                </Button>
</div>

      
<ToastContainer />
{fileStates.length === 0 ? (
    <Typography  className="" style={{ width: '100%' }}>
      No Data Files Please click Generate Files
    </Typography>
  ) :(
      <div>
      {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
  
    <Grid container spacing={2}>
      {fileStates.map((file, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
          <Card variant="outlined" style={{ border: '1px solid #E01E26', padding: 0 }}>
            <CardContent style={{ textAlign: "center", padding: 0 }}>
            <NavLink to={`${window.location.origin}/disp_analyzer/${param1}/${param2}/${file}`}>
              <Typography style={{paddingBottom:'4px',paddingTop:'4px'}} component="h2">
                {file} {/* Assuming file is the name to be displayed */}
              </Typography>
              </NavLink>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )}
</div>

)}
    </Box>
  );
};

export default FilePanel;