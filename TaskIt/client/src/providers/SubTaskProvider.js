import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SubTaskContext = createContext();

export function SubTaskProvider(props) {

    const { getToken } = useContext(UserProfileContext);
    const [subTasks, setSubTasks] = useState([]);
    const [subTask, setSubTask] = useState({});
    const [updatedSubTask, setUpdatedSubTask] = useState(false);



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

    const Toggle = (taskId, subTaskId, IsComplete) => {
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
        <SubTaskContext.Provider value={{ subTasks, getSubTasks, editSubTask, Toggle, updatedSubTask, setUpdatedSubTask }}>
            {props.children}
        </SubTaskContext.Provider>
    );
}