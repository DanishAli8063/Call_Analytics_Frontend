import React, { useState, useEffect, MouseEventHandler } from "react";
import hello from '../../../../assets/img/hello.png';
import hello1 from "../../../../assets/img/hello1.png";
import {
  Box,
  Button,
  FormControl,
  selectClasses,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./add.scss";
import { useParams } from "react-router-dom";
import theme from "../../../../styles/theme";
import CustomFormField from "../../../../components/customFormField/CustomFormField";
import ChevronDown from "../../../../components/icons/chevronDown";
import CustomLabel from "../../../../components/customLabel/CustomLabel";
import CustomSwitch from "../../../../components/switch/Switch";
import { SingleSelect } from "../../../../components/dynamicDropdown/DynamicDropdown";
import { useNavigate } from "react-router-dom";
const { server_address } = require('../../../../ConfigAddress');
function AddPublisher(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  const change = () => {
    navigate("/callanalytics");
  };
  const [fullData, setFullData] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch(server_address+"/get_full_data/" + id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        // console.log(data);
        setFullData(data);
        // let transcripts=fullData.data[0].spliited_trans.splitted_transcript[id];
        // let speakers=fullData.data[0].spliited_trans.speakers[id];
        // setSpeaker(speakers);
        // setTranscript(transcripts);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation: ",
          error
        );
      });
  }, []);
  // console.log(fullData.data[0].sequence_dict[id])

  if (fullData) {
    fullData.data.map((row, i) => {
      let file_id = row.file_id;
      let splitted_transcripts =
        row.spliited_trans.splitted_transcript[file_id];
      let speakers = row.spliited_trans.speakers[file_id];
      speakers.map((speaker, j) => {
        console.log(speakers[j]);
        // console.log(splitted_transcripts[j]);
      });
    });
    // console.log(fullData.data[0].spliited_trans.speakers[id])
  } else {
    console.log("acha");
  }

  return (
    <>
      <div className="m-8">
        <div className="i">
          <div>
            <Box>
              <Typography
                className="headline-medium heading_log"
                marginBottom="25px"
                color={theme.palette.primary.main}
              >
                Details
              </Typography>
            </Box>
          </div>

          <div>
            <Button
              onClick={change}
              variant="contained"
              className="title-medium"
              sx={{
                padding: "8.5px 16px",
                textTransform: "none",
                width: "100%",
                maxWidth: "150px",
                color: "#fff",
                borderRadius: "5px",
                boxShadow: "unset !important",
              }}
            >
              Go Back
            </Button>
          </div>
        </div>
        {/* <div className="sequence">
          
            <h1 className="head">
               Sequence :
            </h1>
            {fullData.data[0].sequence_dict[id]}
            <div>

            hello
            </div>
              </div> */}

        {fullData ? (
          <div className="pl-3 pt-3">
            <div>
              <h1 className="head1">Full Transcript</h1>
              {fullData.data[0].full_transcript[id]}
            </div>

            <div className="sequence">
              <h1 className="head">Sequence</h1>
              <div>{fullData.data[0].sequence_dict[id]}</div>
            </div>
          
            <section>
              <div className="mt-6">
                <h5 className="mb-0 head1">Bot Text Seprater</h5>
              </div>

              {fullData.data.map((row, i) => {
                let file_id = row.file_id;
                let splitted_transcripts =
                  row.spliited_trans.splitted_transcript[file_id];
                let speakers = row.spliited_trans.speakers[file_id];
               return  speakers.map((speaker, j) => {
                 return speaker == 'Agent' ? 
                  // console.log(+speaker+" : "+splitted_transcripts[j]) : console.log(+speaker+" : "+splitted_transcripts[j])
                
                      <div className="card-body">
                        <div className="st">
                          <div className="photost">
                            <img src={hello}></img>
                          </div>
                          <p className="pst">{splitted_transcripts[j]}</p>
                        </div> </div>
:

<div className="card-body">
                        <div className="st">
                          <p className="pnd">{splitted_transcripts[j]}</p>
                          <div className="photond">
                            <img src={hello1}></img>
                          </div>
                        </div>
                        </div>
                     
                  
                });
              })}

              {/* <div className="card-body">
               <div className="st">
                      <div className="photost">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"></img>
                      </div>
                      <p className="pst">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam libero amet ipsa nesciunt maxime sapiente, adipisci
                        aut dicta est minus error officiis! Natus consequatur
                        facilis vitae molestias perspiciatis, cum tenetur.
                      </p>
                    </div>


                <div className="st">
                  <p className="pnd">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam libero amet ipsa nesciunt maxime sapiente, adipisci
                    aut dicta est minus error officiis! Natus consequatur
                    facilis vitae molestias perspiciatis, cum tenetur.
                  </p>
                  <div className="photond">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"></img>
                  </div>
                </div>
              </div> */}
            </section>
          </div>
        ) : (
          <div className="loader_box">
          <span className="blink">Loading...</span>
          <div className="cl1"></div>
          <div className="cl1 cl2"></div>
          <div className="cl1 cl3"></div>
          <div className="cl1 cl4"></div>
        </div>
        )}
      </div>
    </>
  );
}

export default AddPublisher;
