import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";


//context stores data to use in the application therefore you need to create a context
//the context is empty and waiting to be filled
export const TaskContext = createContext();


//defining the data provider components which will allow other components to use the data in context
export const TaskProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);

    //holds the state of the component task, and a function that updates it
    //task and tasks define the variable which will hold the data
    //setTask and setTasks define the function to be use to modify/update that state
    const [task, setTask] = useState({});
    const [tasks, setTasks] = useState([]);







    //fetch calls

    //gets the tasks on a board
    const getTasks = (boardId) => {
        getToken().then((token) =>
            fetch(`/api/board/${boardId}/task`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    //what we are returning the data to the json database
                    "Content-Type": "application/json"
                },
                //have a response and translate to json
            }).then(res => res.json())
                //.then setting to state to show what the data base shows. This shows what tasks I have 
                //if you add or delete it will reset the tasks so you see what is on the home page
                .then(setTasks));

    };

    //get the task by Id
    const getTaskById = (taskId) => {
        getToken().then((token) =>
            fetch(`/api/task/${taskId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
                //have a response and translate to json
                //.then take that response and turn it into a json response 
                // I am taking the response and formatting it so json can read it
            })).then((resp) => resp.json())
            .then(setTask)


    };



    //add a task
    const addTask = (boardId, task) => {
        getToken().then((token) =>
            fetch(`/api/board/${boardId}/task`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    //what we are returning the data to the json database
                    "Content-Type": "application/json"
                },
                // javascript object is being turned to into a string. The task is the javascript object
                //this allows json database to read the data 
                body: JSON.stringify(task)
            }))
    };

    //updates a task
    const updateTask = (task) => {
        getToken().then((token) =>
            fetch(`/api/task/${task.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-Type": "application/json"
                },
                body: JSON.stringify(task)
            }))
    };

    //delete a task
    const deleteTask = (id) => {
        getToken().then((token) =>
            fetch(`/api/task/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }))
    };

    //checkbox for task
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
    //You can access the array of objects being stored in the tasks variable and invoke the functions
    return (
        <TaskContext.Provider value={{ task, tasks, getTasks, getTaskById, addTask, updateTask, deleteTask, TaskToggle }}>
            {props.children}
        </TaskContext.Provider>
    );
}

