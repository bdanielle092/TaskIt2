import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import { TaskProvider } from './providers/TaskProvider';


function App() {
  return (
    <div className="App">
      <UserProfileProvider>
        <TaskProvider>
          <Router>
            <Header />
            <ApplicationViews />

          </Router>
        </TaskProvider>
      </UserProfileProvider>
    </div>
  );
}

export default App;
