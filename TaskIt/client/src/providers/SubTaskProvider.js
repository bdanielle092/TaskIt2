import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";


//context stores data to use in the application therefore you need to create a context
//the context is empty and waiting to be filled
export const SubTaskContext = createContext();

//defining the data provider components which will allow other components to use the data in context
export const SubTaskProvider = (props) => {
    //bringing in the method getToken from the userProfileProvider with useContext
    const { getToken } = useContext(UserProfileContext);
    //holds the state of the component subtask and the function that updates it
    //subTask and subtasks define the variable which will hold the data
    //setSubTask and setSubTasks define the function to be use to modify/update that state
    const [subTask, setSubTask] = useState({});
    const [subTasks, setSubTasks] = useState([]);


    //fetch calls

    //gets the subTasks on a Task 
    const getSubTasks = (taskId) => {
        getToken().then((token) =>
            fetch(`/api/subTask/task/${taskId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application.json"
                },
                //have a response and translate to json
            }).then(res => res.json())

                .then(setSubTasks))

    };

    //gets the subTask by Id
    const getSubTaskById = (subTaskId) => {
        getToken().then((token) =>
            fetch(`/api/subTask/${subTaskId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then((subTask) => { setSubTask(subTask) });

    };

    //adds a SubTask
    const addSubTask = (subTask, taskId) => {
        getToken().then((token) =>
            fetch(`/api/subTask/task/${taskId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    //what we are going to return 
                    "Content-Type": "application/json"
                },
                // js object is being turned to into a string. The board is the js object 
                body: JSON.stringify(subTask)
            }))
    };

    //updates a subTask
    const updateSubTask = (subTask) => {
        getToken().then((token) =>
            fetch(`/api/subtask/${subTask.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-Type": "application/json"
                },
                body: JSON.stringify(subTask)
            }))
    };

    //deletes a subTask 
    const deleteSubTask = (id) => {
        getToken().then((token) =>
            fetch(`/api/subTask/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }))
    };

    const SubTaskToggle = (taskId, subTaskId, IsComplete) => {
        return getToken().then((token) =>
            fetch(`/api/task/toggle/${subTaskId}?IsComplete=${IsComplete}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "Application/json"

                },

            }))
            .then(getSubTasks(taskId))

    }

    return (
        <SubTaskContext.Provider value={{ subTask, subTasks, getSubTasks, getSubTaskById, addSubTask, updateSubTask, deleteSubTask, SubTaskToggle }}>
            {props.children}
        </SubTaskContext.Provider>
    );
}

