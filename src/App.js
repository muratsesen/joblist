import React from "react";
import './App.css';
import Jobs from "./pages/Jobs";
import { JobsProvider } from "./context/context";
function App() {
  
  return (
    <div className="App">
      <JobsProvider>
        <Jobs />
      </JobsProvider>
    </div>
  );
}

export default App;