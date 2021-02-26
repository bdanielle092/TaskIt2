import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import { BoardProvider } from './providers/BoardProvider';


function App() {
  return (
    <div className="App">
      <UserProfileProvider>
        <BoardProvider>
          <Router>
            <Header />
            <ApplicationViews />

          </Router>
        </BoardProvider>
      </UserProfileProvider>
    </div>
  );
}

export default App;
