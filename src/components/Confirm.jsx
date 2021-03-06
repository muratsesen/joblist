import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import JobConsumer from "../context/context";
import { ErrorOutline } from "@mui/icons-material";

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

const Confirm = ({ open, handleClose, selected }) => {
  const approve = (dispatch)=>{
    dispatch({type:"DELETE_JOB",payload:selected.id})
    handleClose();
  }
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
            <DialogTitle sx={{display:"flex",alignItems:"center",justifyContent:"center"}}><ErrorOutline color="error" /></DialogTitle>
            <DialogContent sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                Are you sure you want to delete it?
            </DialogContent>
            <DialogActions sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="primary" autoFocus onClick={handleClose}>Cancel</Button>
            </ThemeProvider>
              <Button color="error" variant="contained" onClick={()=>approve(dispatch)}>Approve</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }}
  </JobConsumer>
};

export default Confirm;
