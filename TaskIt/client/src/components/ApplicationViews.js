import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "./Home";
// import BoardForm from "./Board/BoardForm";
import BoardList from "./Board/BoardList";
import Board from "./Board/Board";



const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <Home /> : <Redirect to="/login" />}
            </Route>

            <Route path="/Board/:id" exact>
                {isLoggedIn ? <Board /> : <Redirect to="/login" />}
            </Route>
            <Route path="/board" exact>
                {isLoggedIn ? <BoardList /> : <Redirect to="/login" />}
            </Route>
            {/* <Route path="/" exact>
                {isLoggedIn ? <BoardForm /> : <Redirect to="/login" />}
            </Route> */}
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>

        </Switch>
    );
};

export default ApplicationViews;