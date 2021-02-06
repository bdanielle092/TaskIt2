import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "./Home";
import BoardForm from "./Board/BoardForm";
import Board from "./Board/Board";
import BoardEditForm from "./Board/BoardEditForm";
import Task from "./Task/Task";




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

            <Route path="/BoardForm" exact>
                {isLoggedIn ? <BoardForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/BoardEditForm/:id" exact>
                {isLoggedIn ? <BoardEditForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/Board/boardId/Task:id" exact>
                {isLoggedIn ? <Task /> : <Redirect to="/login" />}
            </Route>





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