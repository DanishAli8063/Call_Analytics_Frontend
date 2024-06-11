import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography, Button, TextField } from "@mui/material";
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./BasicTable.scss";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import theme from "../../styles/theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import { Select, MenuItem, InputLabel, FormControl, Chip, OutlinedInput } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { red } from '@mui/material/colors';
const { server_address } = require('../../ConfigAddress');
export default function DispAna({
    className = "",
    blackBorder = false,
    alignLeft = false,
    outlineHeader = false,
    hideHeader = false,
}) {
    const { param1, param2, param3 } = useParams();
    const navigate = useNavigate();

  const handleClick = () => {
      navigate("/dispana/"+param1+"/"+param2);
  };

  const handleClientClick = () => {
    navigate("/dispana/"+param1);
};

    useEffect(() => {
        // Check if the parameters exist
        if (!param3 && !param2) {
          // Redirect to another page if either param1 or param2 are missing
          navigate('/dispana');
        }
      }, [param1, param2, navigate]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const formatDateStart = (date) => {
        if (!date) return null;

        const year = date.getUTCFullYear();
        const month = (`0${date.getUTCMonth() + 1}`).slice(-2); // Months are zero-based
        const day = (`0${date.getUTCDate() + 1}`).slice(-2);

        return `${year}-${month}-${day}`;
    };
    const formattedDateStart = formatDateStart(startDate);



    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    const formatDateEnd = (date) => {
        if (!date) return null;

        const year = date.getUTCFullYear();
        const month = (`0${date.getUTCMonth() + 1}`).slice(-2); // Months are zero-based
        const day = (`0${date.getUTCDate() + 1}`).slice(-2);

        return `${year}-${month}-${day}`;
    };
    const formattedDateEnd = formatDateEnd(endDate);



   

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [clientCampaignName, setClientCampaignName] = useState("");

    const [fileStates, setFileStates] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isFileActive, setIsFileActive] = useState(true);

    const [campaignStates, setCampaignStates] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState([]);

    const [clientCampaignStates, setClientCampaignStates] = useState([]);
    const [selectedClientCampaign, setSelectedClientCampaign] = useState([]);

    const [areaStates, setAreaStates] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [isAreaStateActive, setIsAreaStateActive] = useState(false);

    const [dispositionStates, setDispositionStates] = useState([]);
    const [selectedDisp, setSelectedDisp] = useState([]);
    const [isDispositionActive, setIsDispositionActive] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);
    const [isDownloadOpenCustom, setIsDownloadOpenCustom] = useState(false);
    const [isFileDownloadingCustom, setIsFileDownloadingCustom] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isFileDownloading, setIsFileDownloading] = useState(false);

    
    const [menuOpen, setMenuOpen] = useState(false);
    const [areaMenuOpen, setAreaMenuOpen] = useState(false);
    const [numberOfIds, setNumberOfIds] = useState(0);
    const [numberOfChunks, setNumberOfChunks] = useState(0);

    const [tableData, setTableData] = useState([]); // State for currently displayed table data
    const [counterData, setCounterData] = useState(); // State for currently displayed table data
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(20); // Rows per page
    const isDataAvailable = tableData.length > 0;

    const [totalCount, setTotalCount] = useState(0); // Total count of rows
    const [open, setOpen] = useState(false);
    const [allData, setAllData] = useState([]); // State for all fetched data
    const [uploadedCSV, setUploadedCSV] = useState(null);


    

    const handleChange = (event) => {
        setSelectedDisp(event.target.value);
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    };

    const openDownloadPopCustom = () => {
        setIsDownloadOpenCustom(true);
    };

    const closeDownloadPopCustom = () => {
        setIsDownloadOpenCustom(false);
        setClientCampaignName("");
        // setNumberOfChunks(0)
        setNumberOfIds(0)
    };


    const openDownloadPop = () => {
        setIsDownloadOpen(true);
    };

    const closeDownloadPop = () => {
        setIsDownloadOpen(false);
        setClientCampaignName("");
        // setNumberOfChunks(0)
        setNumberOfIds(0)
    };
    // console.log('Type',typeof(med))
    const fetchClientCampaignData = () => {
        // Assuming you fetch campaign data and set it in state
        fetch(`${server_address}/get_client_campaign`)
            .then(response => response.json())
            .then(data => {
                setClientCampaignStates(data.data.data);
                // Optionally set a default selected campaign here or based on param2
            })
            .catch(error => console.error('Error:', error));
    };

    
    useEffect(() => {
        // Fetch campaign data or other initial setups
        fetchClientCampaignData();
    }, []);

    useEffect(()=> {

        if(typeof param3 !== "undefined")
            {
                setIsFileActive(false);
                //  handleFetchData();
                
                 
                
            }
            else{
                setIsFileActive(true);
            }
    },[param3]);

    useEffect(() => {
        if (param2 && clientCampaignStates.length > 0) {
            // Check if param2 exists in campaignStates before setting it
            const matchingCampaign = clientCampaignStates.find(campaign => campaign === param2);
            if (matchingCampaign) {
                setSelectedClientCampaign([matchingCampaign]); // Set the campaign based on param2, ensure it matches a real campaign
            } else {
                console.log('No matching campaign found for param2');
            }
        }
    }, [param2, clientCampaignStates]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                   
                    const areasFromCSV = result.data
                        .map(entry => entry[0]) // Assuming the area data is in the first column
                        .filter(area => typeof area === 'string' && area.trim() !== '');



                    // Update both areaStates and selectedStates
                    setAreaStates(areasFromCSV.length > 0 ? areasFromCSV : []);
                    setSelectedStates(areasFromCSV); // Update selected states with areas from CSV

                    toast.success("CSV file uploaded successfully!", {
                        // ... (toast options)
                    });
                },
                header: false,
                skipEmptyLines: true,
            });
        } else {
            toast.error("Please upload a file.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    // Fetch area and disposition states

    const fetchFileData = () => {
        if(typeof param3 !== "undefined")
            {
                setFileStates([param3]);
                setSelectedFiles([param3]);
            } 
        else{

        
        let url = server_address  + '/get_file_client';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                client_name: param1,
                campaign_client: selectedClientCampaign
            }),
        })
            .then(response => response.json())
            .then(data => {
                setFileStates(data.data.data);
                setSelectedFiles(data.data.data);
            })
            .catch(error => {
                console.error('Error fetching table data:', error)
            });
        }
    };

    useEffect(() => {
        fetchFileData();
    }, [param1, selectedClientCampaign]);




    useEffect(() => {
        fetch(server_address  + '/get_area_states')
        .then(response => response.json())
        .then(data => {
            // Filter the data to exclude items with less than 3 characters
            const filteredData = data.data.data.filter(item => item.length >= 3);
            setAreaStates(filteredData);
        })
        .catch(error => console.error('Error:', error));

        fetch(server_address  + '/get_campaign')
            .then(response => response.json())
            .then(data => setCampaignStates(data.data.data))
            .catch(error => console.error('Error:', error));

        fetch(server_address  + '/get_client_campaign')
            .then(response => response.json())
            .then(data => {
          

                // Check if data.data.data exists and has at least one element
                if (data.data.data && data.data.data.length > 0) {
                    setClientCampaignStates(data.data.data);

                    // Accessing the first element safely
                    setSelectedClientCampaign([data.data.data[0]]);
                } else {
                    // Handle the case where data.data.data is empty or undefined
                    console.log("No data available");
                    // You might want to set defaults or handle this scenario appropriately
                }

            })
            .catch(error => {
                // Error handling for the fetch request
                console.error('Error fetching data:', error);
            });

            fetch(server_address  + '/get_disposition_states')
            .then(response => response.json())
            .then(data => 
                { const filteredData = data.data.data.filter(item => item.length <= 8);
                    setDispositionStates(filteredData);
                }
            )
            .catch(error => console.error('Error:', error));
    }, []);
    





    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log("page.....",page)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));   
         console.log("rows per page.....",rowsPerPage)
        
        setPage(0); // Reset to the first page whenever rows per page changes
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setClientCampaignName("");
        // setClientInfo("");
    };
    // console.log('Type',typeof(med))
    const handleAddClientCampaign = () => {
        if (clientCampaignName.trim() === "") {
            toast.error("Please enter a client name.");
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
                toast.success("Client Campaign added successfully!");

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



    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    }

    // Function to handle the API call for downloading dispositions


    const handleDownloadCustomData = () => {
        setIsFileDownloadingCustom(true); // Start the download process

        fetch(server_address  + '/get_download_dispositions_custom_1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                area_states: selectedStates,
                dispositions: selectedDisp,
                area_exclude: isAreaStateActive,
                disp_exclude: isDispositionActive,
                med_name: selectedCampaign,
                client_name: param1,
                file_exclude: isFileActive,
                file_ids: selectedFiles,
                chunk: numberOfChunks,
                entity: numberOfIds,
                client_campaign: selectedClientCampaign,
                start_date: formattedDateStart,
                end_date: formattedDateEnd
            }),
        })
            .then(response => response.blob()) // Handle response as a blob
            .then(blob => {
                // Success path
                const url = window.URL.createObjectURL(blob);
                const dateTimeString = getCurrentDateTime(); // Ensure you have this function defined or adjust accordingly
                const fileName = `call_analytics_${dateTimeString}.zip`; // Use the date-time string in the file name
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName; // Set the file name for download
                document.body.appendChild(a);
                a.click();
                a.remove(); // Clean up
                window.URL.revokeObjectURL(url); // Release the URL
                toast.success("Download started!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                closeDownloadPopCustom();
            })
            .catch(error => {
                // Error path
                console.error('Error:', error);
                toast.error("Download failed!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .finally(() => {
                // This block executes regardless of success or failure
                setIsFileDownloadingCustom(false); // Reset the downloading state
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // Optionally reload the page, but consider if this is the best UX
            });
    };




    const handleDownload = () => {
        setIsFileDownloading(true); // Start the download process

        fetch(server_address  + '/get_download_dispositions_new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                area_states: selectedStates,
                dispositions: selectedDisp,
                area_exclude: isAreaStateActive,
                disp_exclude: isDispositionActive,
                med_name: selectedCampaign,
                client_name: param1,
                file_exclude: isFileActive,
                file_ids: selectedFiles,
                chunk: numberOfChunks,
                entity: numberOfIds,
                client_campaign: selectedClientCampaign,
                start_date: formattedDateStart,
                end_date: formattedDateEnd
            }),
        })
            .then(response => response.blob()) // Handle response as a blob
            .then(blob => {
                // Success path
                const url = window.URL.createObjectURL(blob);
                const dateTimeString = getCurrentDateTime(); // Ensure you have this function defined or adjust accordingly
                const fileName = `call_analytics_${dateTimeString}.zip`; // Use the date-time string in the file name
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName; // Set the file name for download
                document.body.appendChild(a);
                a.click();
                a.remove(); // Clean up
                window.URL.revokeObjectURL(url); // Release the URL
                toast.success("Download started!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                closeDownloadPop();
            })
            .catch(error => {
                // Error path
                console.error('Error:', error);
                toast.error("Download failed!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .finally(() => {
                // This block executes regardless of success or failure
                setIsFileDownloading(false); // Reset the downloading state
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // Optionally reload the page, but consider if this is the best UX
            });
    };


    const handleTagDownload = () => {
        setIsDownloading(true);
        fetch(server_address  + '/get_download_dispositions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                area_states: selectedStates,
                dispositions: selectedDisp,
                area_exclude: isAreaStateActive,
                disp_exclude: isDispositionActive,
                med_name: selectedCampaign,
                client_name: param1,
                file_exclude: isFileActive,
                file_ids: selectedFiles,
                client_campaign: selectedClientCampaign,
                start_date: formattedDateStart,
                end_date: formattedDateEnd
            }),
        })
            .then(response => response.blob()) // Handle response as a blob
            .then(blob => {
                toast.success("Tag Download started!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const now = new Date();
                const dateTimeString = now.toISOString().replace(/[\-\:\.]/g, '').slice(0, 15); // Format: 'YYYYMMDDTHHMMSS'
                const fileName = `${param1}__${dateTimeString}.csv`;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                setIsDownloading(false);

                // Reload the page after a short delay to ensure the download dialog has appeared
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // 1000 milliseconds delay for reloading
            })
            .catch(error => {
                console.error('Error:', error);
                setIsDownloading(false);
            });
    };



    const handleFetchData = () => {
        setIsLoading(true); // Indicate loading state

        // URL and body setup for fetching table data
        const fetchTableDataURL = `${server_address }/get_dispositions`;
        const tableDataBody = JSON.stringify({
            area_states: selectedStates,
            dispositions: selectedDisp,
            area_exclude: isAreaStateActive,
            disp_exclude: isDispositionActive,
            file_exclude: isFileActive,
            med_name: selectedCampaign,
            file_ids: selectedFiles,
            client_campaign: selectedClientCampaign,
            start_date: formattedDateStart,
            end_date: formattedDateEnd,
        });

        // URL and body setup for fetching counter data
        const fetchCounterDataURL = `${server_address }/get_dispositions_counter`;
        const counterDataBody = JSON.stringify({
            // Assuming the body structure is similar to fetchTableData
            // Adjust if necessary
            area_states: selectedStates,
            dispositions: selectedDisp,
            area_exclude: isAreaStateActive,
            disp_exclude: isDispositionActive,
            file_exclude: isFileActive,
            med_name: selectedCampaign,
            file_ids: selectedFiles,
            client_campaign: selectedClientCampaign,
            start_date: formattedDateStart,
            end_date: formattedDateEnd,
        });

        // Execute fetch for table data
        fetch(fetchTableDataURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: tableDataBody,
        })
            .then((response) => response.json())
            .then((data) => {
                setTableData(data.data.data); // Assuming the response structure, adjust as needed
                setTotalCount(data.totalCount); // Adjust according to your actual response
                // console.log("table data...",data.data.data)
           
                // Fetch counter data after successful table data fetch
                return fetch(fetchCounterDataURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: counterDataBody,
                });
            })
            .then((response) => response.json())
            .then((data) => {
                setCounterData(data.data.data); // Adjust according to your actual response structure
                // console.log("counterdata ......",data.data.data)
                setIsLoading(false); // Reset loading state
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false); // Ensure to reset loading state in case of error
            });

    };

//     useEffect(()=>{
// handleFetchData()
//     },[])



   
   
    return (
        <>
            <Box className="px-6 py-8">
                <div className='heading_out' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div onClick={handleClick}>
                <Typography className="headline-medium heading_log" marginBottom="6px" color={theme.palette.primary.main}>
            <KeyboardBackspaceIcon />
        </Typography>
        </div>
                    <Typography className="headline-medium heading_log" marginBottom="6px" color={theme.palette.primary.main}>
                    <span style={{ }} onClick={handleClientClick}>{param1}</span>
      <span style={{ color: 'black', fontSize: '22px', margin: '0 5px' }}>»</span>
      <span style={{  }}  onClick={handleClick}>{param2}</span>
{param3?( <span style={{ color: 'black', fontSize: '22px', margin: '0 5px' }}>»</span>):<div></div>}
     

      <span style={{  }}  onClick={handleClick}>{param3}</span>
                    </Typography>
                    <div></div>
                    {/* <div style={{ display: 'flex', alignItems: 'center' }}>
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
                    </div> */}
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

                <div className="form-container mt-3">
                    <div className='filters_divs'>

                        <div className='filters_div'>
                            {/* left side */}
                            <div className='selectout-div'>
                                <div className='leftside_div'>
                                    <div>
                                        <Typography className="heading_log" marginBottom="4px" fontSize="12pt" color={theme.palette.primary.main}>
                                            Files
                                        </Typography>
                                    </div>
                                    <ToastContainer />
                                    <Box sx={{ width: "100%", marginBottom: "14px" }}>
                                        <Autocomplete
                                            multiple
                                            freeSolo
                                            id="tags-outlined"
                                            options={fileStates}
                                            getOptionLabel={(option) => option}
                                            filterSelectedOptions
                                            value={selectedFiles}
                                            onChange={(event, newValue) => {
                                                setSelectedFiles(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Please Select File(s)" placeholder="Files" />
                                            )}
                                        />
                                        <FormControlLabel
                                            control={<Switch checked={isFileActive} onChange={(e) => setIsFileActive(e.target.checked)} />}
                                            label={isFileActive ? <p className='label'>Exclude Selected File(s)</p> : <p className='label'>Selected File(s) Data</p>}
                                        />
                                    </Box>

                                    <div>
                                        <Typography className="heading_log" marginBottom="4px" fontSize="12pt" color={theme.palette.primary.main}>
                                            Areas
                                        </Typography>
                                    </div>
                                    <ToastContainer />


                                    <Box sx={{ width: "100%", marginBottom: "14px" }}>
                                        <Autocomplete
                                            //   sx={{  marginBottom:"6px" }}
                                            multiple
                                            freeSolo // Allows free text input
                                            id="tags-outlined"
                                            options={areaStates}
                                            getOptionLabel={(option) => option}
                                            filterSelectedOptions
                                            value={selectedStates}
                                            onChange={(event, newValue) => {
                                                // Handle both existing options and new entries
                                                if (typeof newValue === 'string') {
                                                    setSelectedStates([...selectedStates, newValue]);
                                                } else if (Array.isArray(newValue)) {
                                                    setSelectedStates(newValue);
                                                } else if (newValue === null) {
                                                    // Clear the selected options when clicking the close button
                                                    setSelectedStates([]);
                                                    setAreaMenuOpen(false); 
                                                }
                                            }}
                                            open={areaMenuOpen}
                                            onBlur={() => setAreaMenuOpen(false)}
                                            onClose={() => setAreaMenuOpen(true)} // Close the dropdown
                                            onOpen={() => setAreaMenuOpen(true)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Please Select Area(s)" placeholder="Areas"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        setAreaMenuOpen(true);
                                                    }}
                                                />
                                            )}
                                            clearOnBlur={false} // Set this prop to false
                                            disableCloseOnSelect={false} // Set this prop to false
                                        />


                                        <div className='scv_button'>

                                            <FormControlLabel
                                                control={<Switch checked={isAreaStateActive} onChange={(e) => setIsAreaStateActive(e.target.checked)} />}
                                                label={isAreaStateActive ? <p className='label'>Exclude Selected Area(s)</p> : <p className='label'>Exclude Selected Area(s)</p>}
                                            />

                                            <div className="file-upload-container">
                                                <input
                                                    type="file"
                                                    accept=".csv"
                                                    onChange={handleFileUpload}
                                                    style={{ display: 'none' }}
                                                    id="file-input"
                                                />
                                                <label htmlFor="file-input">
                                                    <Button

                                                        variant="outlined"
                                                        className="title-medium"
                                                        sx={{
                                                            marginBottom: "6px",
                                                            width: "160px",
                                                            // padding: "8.5px 16px",
                                                            textTransform: "none",
                                                            border: "1px solid #E01E26",
                                                            color: "#E01E26",
                                                            // marginLeft: "80%",
                                                            borderRadius: "5px",
                                                            "&:hover": {
                                                                color: "#fff",
                                                                backgroundColor: "var(--redColor)",
                                                                "& svg": {
                                                                    fill: "#fff",
                                                                },
                                                            },
                                                        }}
                                                        component="span"
                                                    >
                                                        Upload CSV
                                                    </Button>
                                                </label>
                                            </div>


                                        </div>

                                    </Box>
                                </div>



                                <div className='select-and-button-out-div '>
                                    {/* right side */}
                                    <div className='rightside_div'>

                                        <div className='campaign-out'>
                                            <div className='campaign-box'>
                                                <Typography className="heading_log" marginBottom="4px" fontSize="12pt" color={theme.palette.primary.main}>
                                                    Data File Campaigns
                                                </Typography>

                                                <ToastContainer />
                                                <Box sx={{ width: "100%", }}>
                                                    <Autocomplete
                                                        multiple
                                                        freeSolo
                                                        id="tags-outlined"
                                                        options={campaignStates}
                                                        getOptionLabel={(option) => option}
                                                        filterSelectedOptions
                                                        value={selectedCampaign}
                                                        onChange={(event, newValue) => {
                                                            setSelectedCampaign(newValue);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Please Select File Campaign(s)" placeholder=" File Campaigns" />
                                                        )}
                                                    />
                                                </Box>
                                            </div>

                                            <div className='campaign-box'>
                                                <Typography className="heading_log" marginBottom="4px" fontSize="12pt" color={theme.palette.primary.main}>
                                                    {param1}'s Campaigns
                                                </Typography>

                                                <ToastContainer />
                                                <Box sx={{ width: "100%", }}>
                                                    <Autocomplete
                                                        // multiple
                                                        freeSolo
                                                        id="tags-outlined"
                                                        options={clientCampaignStates}
                                                        getOptionLabel={(option) => option}
                                                        filterSelectedOptions
                                                        value={selectedClientCampaign}
                                                        onChange={(event, newValue) => {
                                                            setSelectedClientCampaign([newValue]);
                                                        }}

                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Please Select Client Campaign(s)" placeholder="Client Campaigns" />
                                                        )}
                                                    />
                                                </Box>
                                            </div>

                                        </div>


                                        <div>
                                            <Typography className="heading_log" marginBottom="4px" fontSize="12pt" color={theme.palette.primary.main}>
                                                Dispositions
                                            </Typography>
                                        </div>

                                        <div className='f'>
                                            <Box sx={{ width: "100%", marginBottom: "14px" }}>
                                                <Autocomplete
                                                    //  sx={{  marginBottom:"6px" }}
                                                    multiple
                                                    freeSolo
                                                    id="tags-outlined"
                                                    options={dispositionStates}
                                                    getOptionLabel={(option) => option}
                                                    filterSelectedOptions
                                                    value={selectedDisp}
                                                    onChange={(event, newValue) => {
                                                        setSelectedDisp(newValue);
                                                    }}
                                                    open={menuOpen}
                                                    onBlur={() => setMenuOpen(false)}
                                                    onClose={() => setMenuOpen(true)} // Close the dropdown
                                                    onOpen={() => setMenuOpen(true)}  // Open the dropdown
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Please Select Disposition(s)"
                                                            placeholder="Disposition"
                                                            // Handle clicking outside the text field to keep the dropdown open
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                setMenuOpen(true);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <FormControlLabel
                                                    control={<Switch checked={isDispositionActive} onChange={(e) => setIsDispositionActive(e.target.checked)} />}
                                                    label={isDispositionActive ? <p className='label'>Exclude Selected Disposition(s)</p> : <p className='label'>Exclude Selected Disposition(s)</p>}
                                                />
                                            </Box>

                                            <div className='date-out'>
                                                <div style={{ width: "100%", display: "flex", gap: "20px" }}>
                                                    <div>
                                                        <Typography className="heading_log" marginBottom="4px" fontSize="12pt" color={theme.palette.primary.main}>
                                                            Start
                                                        </Typography>
                                                        <DatePicker
                                                            className='date-box'
                                                            selected={startDate}
                                                            onChange={handleStartDateChange}
                                                            selectsStart
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            placeholderText="MM/DD/YYYY"

                                                        />
                                                    </div>
                                                    <div >
                                                        <Typography className="heading_log" marginBottom="4px" fontSize="12pt" color={theme.palette.primary.main}>
                                                            End
                                                        </Typography>

                                                        <DatePicker
                                                            className='date-box red'
                                                            selected={endDate}
                                                            onChange={handleEndDateChange}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}
                                                            placeholderText="MM/DD/YYYY"

                                                        />

                                                    </div>
                                                </div>
                                                <div >
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='button_out_div'>

                                        <div className='count-div-out'>
                                            <div className='count-div'>
                                                {!isDataAvailable ? (
                                                    // Show placeholder text while loading or data is not yet available

                                                    <Typography className="heading_log" style={{ textAlign: 'center' }} fontSize="9pt" color={theme.palette.primary.main}>
                                                       No Data to Display! Please Click on Retrieve Data to retrieve.
                                                    </Typography>
                                                ) : (
                                                    <>

                                                        {isLoading ? (
                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "30px" }}>
                                                                <CircularProgress />
                                                            </div>

                                                        ) : (
                                                            <>
                                                                <span className='count-span-three'>Total calls : </span>
                                                                <span className='count-span-one'> {counterData !== 0 ? counterData : 0} </span>
                                                            </>

                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {!isDataAvailable ? (
                        // Show placeholder text while loading or data is not yet available

                       <></>
                    ) : (
                        <>

                                        {/* <Button
                                            type="button"
                                            variant="outlined"
                                            className="title-medium"
                                            sx={{
                                                marginBottom: "6px",
                                                width: "100%",
                                                padding: "8.5px 16px",
                                                textTransform: "none",
                                                border: "1px solid #E01E26",
                                                color: "#E01E26",
                                                marginTop: "2%",
                                                borderRadius: "5px",
                                                "&:hover": {
                                                    color: "#fff",
                                                    backgroundColor: "var(--redColor)",
                                                    "& svg": {
                                                        fill: "#fff",
                                                    },
                                                },
                                            }}
                                            onClick={handleTagDownload}
                                            disabled={isDownloading} // Disable button while downloading
                                        >
                                            {isDownloading ? 'Downloading...' : 'Download'}
                                        </Button> */}

                                        {typeof param3 !== "undefined" ? (
                                        
                                        <Button
                                        type="button"
                                        variant="outlined"
                                        className="title-medium"
                                        sx={{
                                            marginBottom: "6px",
                                            width: "100%",
                                            padding: "8.5px 16px",
                                            textTransform: "none",
                                            border: "1px solid #E01E26",
                                            color: "#E01E26",
                                            marginTop: "2%",
                                            borderRadius: "5px",
                                            "&:hover": {
                                                color: "#fff",
                                                backgroundColor: "var(--redColor)",
                                                "& svg": {
                                                    fill: "#fff",
                                                },
                                            },
                                        }}
                                     
                                        onClick={openDownloadPopCustom}
                                                        disabled={isLoading}
                                    >
                                        Download Chunks
                                    </Button>
                                    ):(
                                         <Button
                                         type="button"
                                         variant="outlined"
                                         className="title-medium"
                                         sx={{
                                             marginBottom: "6px",
                                             width: "100%",
                                             padding: "8.5px 16px",
                                             textTransform: "none",
                                             border: "1px solid #E01E26",
                                             color: "#E01E26",
                                             marginTop: "2%",
                                             borderRadius: "5px",
                                             "&:hover": {
                                                 color: "#fff",
                                                 backgroundColor: "var(--redColor)",
                                                 "& svg": {
                                                     fill: "#fff",
                                                 },
                                             },
                                         }}
                                    
                                        onClick={openDownloadPop}
                                        disabled={isLoading}
                                     >
                                         Download Chunks
                                     </Button>
                                        )}


                                       
                                     </>

)}



 {/* Overlay */}
 {isDownloadOpenCustom && <div className="overlay"></div>}

{/* Popup */}
{isDownloadOpenCustom && (
    <div className="popup">
        <div className="popup-content">
            <Typography sx={{ marginTop: "12px", marginBottom: "4px" }} variant="h6">No of IDs to Download</Typography>
            <TextField
                sx={{ marginBottom: "10px" }}
                label="No of ID's"
                variant="outlined"
                type="text"
                fullWidth
                value={numberOfIds}
                onChange={(e) => setNumberOfIds(e.target.value)}
            />

            <Typography sx={{ marginBottom: "4px" }} variant="h6">No of ID's in One File</Typography>
            <TextField
                sx={{ marginBottom: "14px" }}
                label="No of ID's in File"
                variant="outlined"
                type="text"
                fullWidth
                value={numberOfChunks}
                onChange={(e) => setNumberOfChunks(e.target.value)}
            />

            <Button variant="outlined" fullWidth onClick={handleDownloadCustomData} disabled={isFileDownloadingCustom}>
                {isFileDownloadingCustom ? 'Downloading...' : 'Add File & Download'}
            </Button>


            <Button variant="outlined" fullWidth onClick={closeDownloadPopCustom}>
                Cancel
            </Button>
        </div>
    </div>
)}




                                        {/* Overlay */}
                                        {isDownloadOpen && <div className="overlay"></div>}

                                        {/* Popup */}
                                        {isDownloadOpen && (
                                            <div className="popup">
                                                <div className="popup-content">
                                                    <Typography sx={{ marginTop: "12px", marginBottom: "4px" }} variant="h6">No of IDs to Download</Typography>
                                                    <TextField
                                                        sx={{ marginBottom: "10px" }}
                                                        label="No of ID's"
                                                        variant="outlined"
                                                        type="text"
                                                        fullWidth
                                                        value={numberOfIds}
                                                        onChange={(e) => setNumberOfIds(e.target.value)}
                                                    />

                                                    <Typography sx={{ marginBottom: "4px" }} variant="h6">No of ID's in One File</Typography>
                                                    <TextField
                                                        sx={{ marginBottom: "14px" }}
                                                        label="No of ID's in File"
                                                        variant="outlined"
                                                        type="text"
                                                        fullWidth
                                                        value={numberOfChunks}
                                                        onChange={(e) => setNumberOfChunks(e.target.value)}
                                                    />

                                                    <Button variant="outlined" fullWidth onClick={handleDownload} disabled={isFileDownloading}>
                                                        {isFileDownloading ? 'Downloading...' : 'Add File & Download'}
                                                    </Button>


                                                    <Button variant="outlined" fullWidth onClick={closeDownloadPop}>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        <Button
                                            type="button"
                                            variant="outlined"
                                            className="title-medium"
                                            sx={{

                                                width: "100%",
                                                padding: "8.5px 16px",
                                                textTransform: "none",
                                                border: "1px solid #E01E26",
                                                color: "#E01E26",
                                                marginTop: "2%",
                                                borderRadius: "5px",
                                                "&:hover": {
                                                    color: "#fff",
                                                    backgroundColor: "var(--redColor)",
                                                    "& svg": {
                                                        fill: "#fff",
                                                    },
                                                },
                                            }}
                                            onClick={handleFetchData}
                                            disabled={isLoading} // Disable the button while loading
                                        >
                                            {isLoading ? 'Processing...' : 'Retrieve Data'}
                                        </Button>


                                    </div>


                                </div>




                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    className={`${className} basic-table ${blackBorder ? "black-border" : ""} ${outlineHeader ? "outline-header" : ""}`}
                    component={Paper}
                >

                    {!isDataAvailable ? (
                        // Show placeholder text while loading or data is not yet available

                        <Typography className="heading_log" style={{ textAlign: 'center', margin: '20px' }} fontSize="9pt" color={theme.palette.primary.main}>
                        No Data to Display! Please Click on Retrieve Data to retrieve.
                        </Typography>
                    ) : (
                        // Render the table when data is available and not loading
                        <>
                            <Box sx={{ display: "flex", justifyContent: "start", marginBottom: "10px", marginTop: "15px" }}>
                                <Typography className="headline-medium heading_log" marginBottom="6px" color={theme.palette.primary.main}>
                                    Disposition
                                   
                                </Typography>
                            </Box>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Caller ID</TableCell>
                                        <TableCell>Disposition</TableCell>
                                        <TableCell>Area State</TableCell>
                                    </TableRow>
                                </TableHead>
                                {isLoading ? (
                                    // Display a loading indicator while data is being fetched
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <CircularProgress />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <>
                                        <TableBody>
                                            {tableData.map((row, index) => (
                                                <TableRow key={row._id.$oid}>
                                                    <TableCell>{row.caller_id}</TableCell>
                                                    <TableCell>{row.disposition}</TableCell>
                                                    <TableCell>{row.area_state}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </>
                                )}
                            </Table>

                            <TablePagination
                                rowsPerPageOptions={[20, 50, 100]}
                                component="div"
                                count={-1}  // Adjust based on actual total count
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    )}
                </TableContainer>


            </Box >
        </>
    );
}
