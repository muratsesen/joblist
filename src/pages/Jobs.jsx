import React, { useEffect, useState } from "react";
import { Container, Grid } from '@mui/material';
import CreateNewJob from '../components/CreateNewJob';
import Header from '../components/Header';
import Joblist from '../components/Joblist'

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const onCreateJob = (newJob) => {
    let t = [];
    if(jobs)
     t = [...jobs];
    t.push(newJob);
    saveToStorage(t)
    getJobs();
  };
  const saveToStorage =(list)=>{
    localStorage.setItem("jobs",JSON.stringify(list))
  }
  const onUpdateJob = (jobToUpdate) => {
    let temp = jobs.map(job =>job.id === jobToUpdate.id?jobToUpdate:job);
    setJobs(temp);
    saveToStorage(temp);
  };

  const onDelete = (id) => {
    let temp = jobs.filter((item)=>item.id !== id);
    setJobs(temp);
    saveToStorage(temp);
  };

 

  const getJobs = ()=>{
    let t = localStorage.getItem("jobs");
    setJobs(JSON.parse(t));
  }

  useEffect(()=>getJobs(),[])
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
          <CreateNewJob createJob={onCreateJob}></CreateNewJob>
          </Grid>
       
          <Grid item md={12}>
            <Joblist jobs={jobs } updateJob={onUpdateJob} onDelete={onDelete} />
          </Grid>
        </Grid>
      </Container>
  );
}

export default Jobs;
