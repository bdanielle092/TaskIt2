import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

//context stores data to use in the application therefore you need to create a context
//the context is empty and waiting to be filled
export const TaskContext = createContext();

//defining the data provider components which will allow other components to use the data in context
export const TaskProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);

    //holds the state of the component board, and a function that updates it
    //board and boards define the variable which will hold the data
    //setBoard and setBoards define the function to be use to modify/update that state
    const [task, setTask] = useState({});
    const [tasks, setTasks] = useState([]);




    //fetch calls
    const getTasks = (boardId) => {
        getToken().then((token) =>
            fetch(`/api/board/${boardId}/task`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
                //have a response and translate to json
            }).then(res => res.json())

                .then(setTasks));

    };


    const getTaskById = (taskId) => {
        getToken().then((token) =>
            fetch(`/api/task/${taskId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then((task) => { setTask(task) });

    };


    const addTask = (boardId, task) => {
        getToken().then((token) =>
            fetch(`/api/board/${boardId}/task`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    //what we are going to return 
                    "Content-Type": "application/json"
                },
                // js object is being turned to into a string. The board is the js object 
                body: JSON.stringify(task)
            })).then(getTasks)
    };

    const updateTask = (task) => {
        getToken().then((token) =>
            fetch(`/api/task/${task.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })).then(getTasks)
    };

    const deleteTask = (id) => {
        getToken().then((token) =>
            fetch(`/api/task/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })).then(getTasks)
    };

    const TaskToggle = (boardId, taskId, IsComplete) => {
        return getToken().then((token) =>
            fetch(`/api/task/toggle/${taskId}?IsComplete=${IsComplete}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "Application/json"

                },

            }))
            .then(getTasks(boardId))

    }



    //in the return these lines define what component will be expose to other components. These are the variables in the value attribute
    //You can access the array of objects being stored in the boards variable and invoke the functions
    return (
        <TaskContext.Provider value={{ task, tasks, getTasks, getTaskById, addTask, updateTask, deleteTask, TaskToggle }}>
            {props.children}
        </TaskContext.Provider>
    );
}