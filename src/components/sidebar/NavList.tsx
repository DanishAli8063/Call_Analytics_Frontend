import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChevronDown from "../icons/chevronDown";
import ReportingIcon from "@mui/icons-material/Dvr";
import { useLocation, useNavigate, useParams, NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import './Sidebar.scss';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const { server_address } = require('../../ConfigAddress');
let clientCampaignStatesTwo = []

function NavItemWithoutChildren({ text, link, isActive, setActive, Icon }) {
  return (
    <ListItemButton
      onClick={() => setActive(link)}
      className={isActive ? "active" : ""}
    >
      <ListItemIcon className="justify-center">
        {Icon && <Icon color={isActive ? "white" : undefined} />}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}

function NavItemWithCollapse({
  text,
  link,
  isActive,
  setActive,
  isOpen,
  Icon,
  onToggle,
}) {
  return (
    <ListItemButton
      sx={{ paddingRight: "10%" }}
      onClick={() => {
        setActive(link);
        onToggle && onToggle(); // Toggle only if onToggle is provided
      }}
      className={isActive ? "active" : ""}
    >
      <ListItemIcon className="justify-center">
        {Icon && <Icon color={isActive ? "white" : undefined} />}
      </ListItemIcon>
      <ListItemText primary={text} />
      <ChevronDown
        style={{
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 500ms",
        }}
        color={isActive ? "white" : undefined}
      />
    </ListItemButton>
  );
}

function SubMenu({ links, activeLink }) {
  const { param1,param2 } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
    const [openIndex, setOpenIndex] = useState(false);


    
  useEffect(() => {

    // location.pathname.toString().includes("Brilli")
    let index_status = location.pathname.toString().includes(param1)
    // let index = links.indexOf("Brilli");
  if(index_status){
    let index = links.findIndex(item => item.text === param1);
    setOpenIndex(index)
  }
    console.log("openindex",links)
  }, [location.pathname])


  const handleClick = (index) => {
    if (openIndex === index) {
      setOpenIndex(true); // If the clicked item is already open, close it.
    } else {
      setOpenIndex(index); // Open the clicked item and close others.
    }
  };

  const toggleOpenIndex = () => {
    const newOpenIndex = !openIndex;
    setOpenIndex(newOpenIndex);
    localStorage.setItem("openIndex", newOpenIndex.toString());
  };

  return (
    <Collapse in={true} timeout="auto" unmountOnExit>
       <List component="div" disablePadding>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <ListItemButton
            onClick={() => {
              navigate(link.link);
              handleClick(index);
            }}
            sx={{
              pl: 6,
              bgcolor: location.pathname.startsWith(link.link)
                ? "rgba(0, 0, 0, 0.08)"  // Active color
                : "inherit",  // Default state color
              '&:hover': {
                bgcolor: "rgba(0, 0, 0, 0.1)"  // Hover color
              }
            }}
          >
            <ListItemIcon sx={{ marginRight: "-28px" }}>
              <FiberManualRecordIcon sx={{ fontSize: 12 }} />
            </ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItemButton>
          <Collapse in={openIndex === index} timeout="auto" unmountOnExit >
        
            <ol style={{fontSize:"10pt"}}>
              {clientCampaignStatesTwo?.map(name =>   
                  <a href={`dispana/${link.text}/${name}`}>
                      <li key={name} id={name}  style={{ paddingLeft:"36%",backgroundColor: name === param2 ? 'rgba(0, 0, 0, 0.08)' : 'transparent' }}>{name}</li> 
                  </a>)}
            </ol>
        
          </Collapse>
        </React.Fragment>
      ))}
    </List>
    </Collapse>
  );
}

function NavList() {
  const { param1,param2 } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.split('/')[1]; // Dynamically determine base path
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [dispositionChildren, setDispositionChildren] = useState([]);
  const [isDispositionOpen, setIsDispositionOpen] = useState(
    localStorage.getItem("isDispositionOpen") === "true"
  );




  useEffect(() => {

    // location.pathname.toString().includes("Brilli")
    setIsDispositionOpen(location.pathname.toString().includes(param1))

  }, [param1])



  useEffect(() => {
    const fetchDispositionChildren = async () => {
      try {
        const response = await fetch(`${server_address}/get_client?base=${basePath}`);
        const result = await response.json();
        if (result?.data?.status && Array.isArray(result.data.data)) {
          let tempData = result.data.data.slice(1).map(item => ({
            link: `/${basePath}/${item}`,
            text: item
          }));
          setDispositionChildren(tempData);
        } else {
          console.error("Invalid API response structure for disposition children");
        }
      } catch (error) {
        console.error("Error fetching disposition children:", error);
      }
    };

    fetchDispositionChildren();
  }, [basePath]);


  const handleItemClick = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  const toggleDispositionOpen = () => {
    const newOpenState = !isDispositionOpen;
    setIsDispositionOpen(newOpenState);
    localStorage.setItem("isDispositionOpen", newOpenState.toString());
  };


  // get client campaign 
  const [clientCampaignStates, setClientCampaignStates] = useState([]);


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
          clientCampaignStatesTwo = data?.data?.data
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

  const items = [
    {
      text: "Disposition Analysis",
      link: `/${basePath}`,
      hasChildren: dispositionChildren.length > 0,
      icon: ReportingIcon,
      childrenLinks: dispositionChildren,
    },
  ];

  return (
    <>
      <List
        sx={{ width: "100%", bgcolor: "background.paper", marginTop: "15px" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className="nav-list"
      >
        {items.map((item) =>
          item.hasChildren ? (
            <React.Fragment key={item.link}>
              <NavItemWithCollapse
                text={item.text}
                link={item.link}
                isActive={location.pathname.startsWith(item.link)}
                setActive={handleItemClick}
                isOpen={isDispositionOpen}
                onToggle={toggleDispositionOpen}
                Icon={item.icon}
              />
              {isDispositionOpen && (
                <SubMenu links={item.childrenLinks} activeLink={activeLink} />
              )}
            </React.Fragment>
          ) : (
            <NavItemWithoutChildren
              key={item.text}
              text={item.text}
              link={item.link}
              isActive={location.pathname.startsWith(item.link)}
              setActive={handleItemClick}
              Icon={item.icon}
            />
          )
        )}
      </List>
   
    </>
  );
}

export default NavList;