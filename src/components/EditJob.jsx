import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React,{useEffect, useState} from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import JobConsumer from "../context/context";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C1C1C1",
      darker: "#737373",
    },
    error: {
      main: "#E41956",
      contrastText: "#A5103D",
    },
  },
});


const EditJob = ({ job,open, handleCancel,onClose }) => {
    const [values, setValues] = useState({
        id:0,
        name:"",
        priority:0
    });
    const [priorityError, setPriorityError] = useState(false);

    const onEdit = (dispatch) => {
        if (!validateJob(values)) return;
        dispatch({type:"UPDATE_JOB",payload:values})
        onClose();
      };
    
      const validateJob = (newJob) => {
        let hasError = false;

        if (newJob.priority === 0) {
          setPriorityError(true);
          hasError = true;
        }
    
        if (hasError) return false;
    
        return true;
      };

      useEffect(()=>setValues(job),[job])

      return <JobConsumer>
        {value=>{
          const {dispatch} = value;
          return (
            <div>
              <Dialog
                sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
                maxWidth="xs"
                open={open}
              >
                <DialogTitle
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="span">Job Edit</Typography>
                </DialogTitle>
                <DialogContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid container>
                    <Grid item >
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
                          disabled
                          value={values.name}
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
                          value={values.priority}
                          onChange={(e) => {
                            setValues({...values,"priority":e.target.value});
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
                  </Grid>
                </DialogContent>
                <DialogActions
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      autoFocus
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </ThemeProvider>
                  <Button color="error" variant="contained" onClick={()=>onEdit(dispatch)}>
                    Approve
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
        }}
      </JobConsumer>
};

export default EditJob;
