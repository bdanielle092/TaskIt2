import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import { TaskProvider } from './providers/TaskProvider';
import { SubTaskProvider } from './providers/SubTaskProvider';


function App() {
  return (
    <div className="App">
      <UserProfileProvider>
        <TaskProvider>
          <SubTaskProvider>
            <Router>
              <Header />
              <ApplicationViews />

            </Router>
          </SubTaskProvider>
        </TaskProvider>
      </UserProfileProvider>
    </div>
  );
}

export default App;
