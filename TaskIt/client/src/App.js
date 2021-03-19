import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import { BoardProvider } from './providers/BoardProvider';
import { TaskProvider } from './providers/TaskProvider';
import { SubTaskProvider } from './providers/SubTaskProvider';
import { PriorityProvider } from './providers/PriorityProvider';


function App() {
  return (
    <div className="App">
      <UserProfileProvider>
        <BoardProvider>
          <TaskProvider>
            <SubTaskProvider>
              <PriorityProvider>
                <Router>
                  <Header />
                  <ApplicationViews />

                </Router>
              </PriorityProvider>
            </SubTaskProvider>
          </TaskProvider>
        </BoardProvider>
      </UserProfileProvider>
    </div>
  );
}

export default App;
