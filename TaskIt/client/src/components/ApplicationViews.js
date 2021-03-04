import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "./Home";
import BoardList from "./Board/BoardList";
import BoardForm from "./Board/BoardForm";
import Board from "./Board/Board";
import BoardEditForm from "./Board/BoardEditForm";
import DeleteBoard from "./Board/DeleteBoard";
import Task from "./Task/Task";
import TaskList from "./Task/TaskList";





const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <Home /> : <Redirect to="/login" />}
            </Route>

            <Route path="/board/:boardId" exact>
                {isLoggedIn ? <Board /> : <Redirect to="/login" />}
            </Route>

            <Route path="/board" exact>
                {isLoggedIn ? <BoardList /> : <Redirect to="/login" />}
            </Route>

            <Route path="/BoardForm" exact>

                {isLoggedIn ? <BoardForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/BoardEditForm/:boardId" >
                {isLoggedIn ? <BoardEditForm /> : <Redirect to="/login" />}
            </Route>


            <Route path="/DeleteBoard/:boardId">
                {isLoggedIn ? <DeleteBoard /> : <Redirect to="/login" />}
            </Route>



            <Route path="/Board/:boardId/task/:taskId" exact>
                {isLoggedIn ? <Task /> : <Redirect to="/login" />}
            </Route>

            <Route path="/Board/:boardId/task" exact>
                {isLoggedIn ? <TaskList /> : <Redirect to="/login" />}
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