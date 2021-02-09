import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SubTaskContext = createContext();

export function SubTaskProvider(props) {

    const { getToken } = useContext(UserProfileContext);
    const [subTasks, setSubTasks] = useState([]);
    const [subTask, setSubTask] = useState({});



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



    const editSubTask = (subTaskId) => {
        getToken().then((token) => {
            fetch(`/api/subTask/${subTaskId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(setSubTask)
            })
        })
    }






    return (
        <SubTaskContext.Provider value={{ subTasks, getSubTasks, editSubTask }}>
            {props.children}
        </SubTaskContext.Provider>
    );
}