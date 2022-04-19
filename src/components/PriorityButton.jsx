import { Button } from "@mui/material";
import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#E49F19",
      contrastText: "#fff",
    },
    error: {
        main: "#E41956",
        contrastText: "#fff",
      },
  },
});

const PriorityButton = ({ priority }) => {
  let button = "";
  if (priority === 1)button = <Button color="error"  style={{width:"100px", textTransform: "none" }} variant="contained">Urgent</Button>;
  if (priority === 2)button = <Button color="neutral"style={{width:"100px", textTransform: "none" }} variant="contained">Regular</Button>;
  if (priority === 3)button = <Button color="primary"style={{width:"100px", textTransform: "none" }} variant="contained">Trivial</Button>;
  return (
    <div>
      <ThemeProvider theme={theme}>{button}</ThemeProvider>
    </div>
  );
};

export default PriorityButton;
