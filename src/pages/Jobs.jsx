import React, { useEffect, useState } from "react";
import { Container, Grid } from '@mui/material';
import CreateNewJob from '../components/CreateNewJob';
import Header from '../components/Header';
import Joblist from '../components/Joblist'

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [name, setName] = useState(null);
  const [priority, setPriority] = useState(null);

  const onCreateJob = (newJob) => {
    let t = [];
    if(jobs)
     t = [...jobs];
    t.push(newJob);
    setFilteredJobs([]);
    saveToStorage(t)
    getJobs();
  };
  const saveToStorage =(list)=>{
    localStorage.setItem("jobs",JSON.stringify(list))
  }
  const onUpdateJob = (jobToUpdate) => {
    setFilteredJobs([]);
    let temp = jobs.map(job =>job.id === jobToUpdate.id?jobToUpdate:job);
    setJobs(temp);
    saveToStorage(temp);
  };

  const onDelete = (id) => {
    setFilteredJobs([])
    let temp = jobs.filter((item)=>item.id !== id);
    setJobs(temp);
    saveToStorage(temp);
  };

  const onSearch=(item)=>{
    if(item === null) item= {name,priority}

    let temp = [...jobs];
    if(item.name){
      temp = temp.filter((job)=>job.name.includes(item.name))
      setName(item.name)
    }
    else setName(null)

    if(item.priority > 0){
    temp = temp.filter((job)=>job.priority === item.priority)
    setPriority(item.priority)  
    }
    else setPriority(null)
    
    setFilteredJobs([...temp])
  }

  const getJobs = ()=>{
    let t = localStorage.getItem("jobs");
    console.log({t});
    setJobs(JSON.parse(t));
  }

  useEffect(()=>getJobs(),[])
  var jobss = name || priority ? filteredJobs: jobs;
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
            <Joblist jobs={jobss } updateJob={onUpdateJob} onDelete={onDelete} onSearch={onSearch}/>
          </Grid>
        </Grid>
      </Container>
  );
}

export default Jobs;
