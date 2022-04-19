import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import JobConsumer from "../context/context";

const CreateNewJob = ({ createJob }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [priority, setPriority] = useState(0);
  const [priorityError, setPriorityError] = useState(false);

  const onCreateJob = (dispatch) => {
    const newJob = { id: Date.now(), name: name, priority: priority };
    if (!validateJob(newJob)) return;
    createJob(newJob);
    dispatch({type:"ADD_JOB",payload:newJob});
  };

  const onNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  const validateJob = (newJob) => {
    let hasError = false;
    if (!newJob.name) {
      setNameError(true);
      hasError = true;
    }
    if (newJob.priority === 0) {
      setPriorityError(true);
      hasError = true;
    }

    if (hasError) return false;

    return true;
    // const re = new RegExp('"^[a-zA-Z0-9!@#$&()-`.+,/\"]*$".');
    // if(re.test(newJob.name))
  };

  return <JobConsumer>
     {
       value=>{
         const {dispatch} = value;
         return (
          <div>
            <Grid container sx={{ marginTop: "10px" }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "left",
                }}
              >
                <h3>Create New Job</h3>
              </Grid>
              <Grid item md={6}>
                <Grid
                  style={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                  }}
                >
                  <Typography variant="span">Job Name</Typography>
                </Grid>
                <Grid>
                  <TextField
                    error={nameError}
                    value={name}
                    onChange={(e) => onNameChange(e)}
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid item md={4} style={{ paddingLeft: "5px" }}>
                <Grid
                  style={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                  }}
                >
                  <Typography variant="span">Priority</Typography>
                </Grid>
                <Grid>
                  <Select
                    error={priorityError}
                    fullWidth
                    size="small"
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select"
                    value={priority}
                    onChange={(event) => {
                      setPriority(event.target.value);
                      setPriorityError(false);
                    }}
                  >
                    <MenuItem value={0}>Choose</MenuItem>
                    <MenuItem value={1}>Urgent</MenuItem>
                    <MenuItem value={2}>Regualar</MenuItem>
                    <MenuItem value={3}>Trivial</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid item md={2} style={{ paddingLeft: "5px" }}>
                <br></br>
                <Button
                  fullWidth
                  style={{ textTransform: "none" }}
                  startIcon={<AddIcon />}
                  variant="contained"
                  onClick={() => onCreateJob(dispatch)}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </div>
        );
       }
     }
  </JobConsumer>
};

export default CreateNewJob;
