import React,{Component} from "react";

const JobContext = React.createContext();
// Provider , Consumer
const reducer = (state,action) => {
  switch(action.type) {
    case "DELETE_JOB":
       
       return {
        ...state,
        jobs: state.jobs.filter(job => action.payload !== job.id)
       }
    case "ADD_JOB":
       return {
         ...state,
         jobs : [...state.jobs,action.payload]
       }
    case "UPDATE_JOB":
       return {
         ...state,
         jobs: state.jobs.map(job => job.id === action.payload.id ? action.payload : job)
       }
    default:
      return state

  }
}

export class JobsProvider extends Component {
    state = {
        jobs: [],
        dispatch : action => {
          this.setState(state => reducer(state,action))
        }
      }
  componentDidMount = async () => {
    const response = localStorage.getItem("jobs")
    this.setState({
      jobs: JSON.parse(response)
    })
  }
      
  render() {
    return (
      <JobContext.Provider value = {this.state}>
        {this.props.children}
      </JobContext.Provider>
    )
  }
}
const JobConsumer = JobContext.Consumer;

export default JobConsumer;
