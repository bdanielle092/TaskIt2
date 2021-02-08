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
import TaskForm from "./Task/TaskForm";
import SubTask from "./SubTask/SubTask";
import SubTaskForm from "./SubTask/SubTaskForm";




const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <Home /> : <Redirect to="/login" />}
            </Route>

            <Route path="/Board/:boardId" exact>
                {isLoggedIn ? <Board /> : <Redirect to="/login" />}
            </Route>

            <Route path="/BoardForm" exact>
                {isLoggedIn ? <BoardForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/BoardEditForm/:boardId" exact>
                {isLoggedIn ? <BoardEditForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/Board/:boardId/Task/:taskId" exact>
                {isLoggedIn ? <Task /> : <Redirect to="/login" />}
            </Route>

            <Route path="/board/:boardId/TaskForm" exact>
                {isLoggedIn ? <TaskForm /> : <Redirect to="/login" />}
            </Route>

            <Route path="/subTask/:subTaskId" exact>
                {isLoggedIn ? <SubTask /> : <Redirect to="/login" />}
            </Route>


            <Route path="task/:taskId /SubTaskForm" exact>
                {isLoggedIn ? <SubTaskForm /> : <Redirect to="/login" />}
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