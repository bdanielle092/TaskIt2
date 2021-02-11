import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";



//context stores data to use in the application therefore you need to create a context
export const TaskContext = createContext();

//defining the data provider components which will allow other components to use the data in context
export function TaskProvider(props) {

    const { getToken } = useContext(UserProfileContext);
    //holds the state of the component task, and a function that updates it
    const [tasks, setTasks] = useState([]);
    const [updatedTask, setUpdatedTask] = useState(false);
    const [task, setTask] = useState({})



    //fetch calls
    const getTasks = (boardId) => {
        getToken().then((token) =>
            fetch(`/api/board/${boardId}/task`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((tasks) => {
                    setTasks(tasks);
                })
        );
    };

    const Toggle = (boardId, taskId, IsComplete) => {
        return getToken().then((token) =>
            fetch(`/api/task/toggle/${taskId}?IsComplete=${IsComplete}`, {
                Method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "Application/json"

                },

            }))
            .then(getTasks(boardId))

    }

    const getTaskById = (taskId) => {
        getToken().then((token) =>
            fetch(`/api/task/${taskId}`, {
                Method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    setTasks(task);
                })
        );
    };




    //in the return these lines define what component will be expose to other components. These are the variables in the value attribute
    return (
        <TaskContext.Provider value={{ tasks, getTasks, getTaskById, Toggle, updatedTask, setUpdatedTask }}>
            {props.children}
        </TaskContext.Provider>
    );
}