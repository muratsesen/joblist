import React, { useEffect, useState } from "react";
import { Container, Grid } from '@mui/material';
import CreateNewJob from '../components/CreateNewJob';
import Header from '../components/Header';
import Joblist from '../components/Joblist'

function Jobs() {

  return (
      <Container
        sx={{
          marginTop: "10px",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Header></Header>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CreateNewJob></CreateNewJob>
          </Grid>
       
          <Grid item md={12}>
            <Joblist />
          </Grid>
        </Grid>
      </Container>
  );
}

export default Jobs;
