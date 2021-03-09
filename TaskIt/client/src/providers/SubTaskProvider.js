import React, { useState, createContext, useContext, useEffect } from "react";
import { UserProfileContext } from "./UserProfileProvider";


//context stores data to use in the application therefore you need to create a context
//the context is empty and waiting to be filled
export const SubTaskContext = createContext();

//defining the data provider components which will allow other components to use the data in context
export const SubTaskProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);


    //holds the state of the component subTask, and a function that updates it
    //subTask and subTasks define the variable which will hold the data
    //setSubTask and setSubTasks define the function to be use to modify/update that state
    const [subTask, setSubTask] = useState({});
    const [subTasks, setSubTasks] = useState([]);




    //fetch calls
    const getSubTasks = (taskId) => {
        getToken().then((token) =>
            fetch(`/api/subTask/task/${taskId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((subTasks) => {
                    setSubTasks(subTasks);
                })
        );
    };


    const getSubTaskById = (id) => {
        getToken().then((token) =>
            fetch(`/api/subTask/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then((subTask) => { setSubTask(subTask) });

    };


    const addSubTask = (taskId, subTask) => {
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

    const updateSubTask = (subTask) => {
        getToken().then((token) =>
            fetch(`/api/subTask/${subTask.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-Type": "application/json"
                },
                body: JSON.stringify(subTask)
            }))
    };

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

    const subTaskToggle = (taskId, subTaskId, IsComplete) => {
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



    //in the return these lines define what component will be expose to other components. These are the variables in the value attribute
    //You can access the array of objects being stored in the subTasks variable and invoke the functions
    return (
        <SubTaskContext.Provider value={{ subTask, subTasks, getSubTasks, getSubTaskById, addSubTask, updateSubTask, deleteSubTask, subTaskToggle }}>
            {props.children}
        </SubTaskContext.Provider>
    );
}