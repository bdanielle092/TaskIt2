
import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

//context stores data to use in the application therefore you need to create a context
export const BoardContext = createContext();

//defining the data provider components which will allow other components to use the data in context
export function BoardProvider(props) {
    const apiUrl = "/api/board";
    const { getToken } = useContext(UserProfileContext);

    //holds the state of the component board, and a function that updates it
    const [board, setBoard] = useState([]);



    //fetch calls
    const getBoard = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())

                .then(setBoard));


    const addBoard = (board) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(board)
            })).then(getBoard)

    //in the return these lines define what component will be expose to other components. These are the variables in the value attribute
    return (
        <BoardContext.Provider value={{ board, getBoard, addBoard }}>
            {props.children}
        </BoardContext.Provider>
    );
}