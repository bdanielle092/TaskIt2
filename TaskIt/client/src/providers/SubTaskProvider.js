import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SubTaskContext = createContext();

export function SubTaskProvider(props) {

    const { getToken } = useContext(UserProfileContext);
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





    return (
        <SubTaskContext.Provider value={{ subTasks, getSubTasks }}>
            {props.children}
        </SubTaskContext.Provider>
    );
}