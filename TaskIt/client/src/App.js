import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import { BoardProvider } from './providers/BoardProvider';
import { TaskProvider } from './providers/TaskProvider';
import { SubTaskProvider } from './providers/SubTaskProvider';


function App() {
  return (
    <div className="App">
      <UserProfileProvider>
        <BoardProvider>
          <TaskProvider>
            <SubTaskProvider>
              <Router>
                <Header />
                <ApplicationViews />

              </Router>
            </SubTaskProvider>
          </TaskProvider>
        </BoardProvider>
      </UserProfileProvider>
    </div>
  );
}

export default App;
