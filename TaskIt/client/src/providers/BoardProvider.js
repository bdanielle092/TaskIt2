import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

//context stores data to use in the application therefore you need to create a context
//the context is empty and waiting to be filled
export const BoardContext = createContext();

//defining the data provider components which will allow other components to use the data in context
export const BoardProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);

    //holds the state of the component board, and a function that updates it
    //board and boards define the variable which will hold the data
    //setBoard and setBoards define the function to be use to modify/update that state
    const [board, setBoard] = useState({});
    const [boards, setBoards] = useState([]);
    // const [userProfile, setUserProfile] = useState({});



    //fetch calls
    const getAllBoards = () => {
        getToken().then((token) =>
            fetch("/api/board", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
                //have a response and translate to json
            }).then(res => res.json())

                .then(setBoards));
        // .then((boards) => {

        //     console.log(userProfile)
        //     console.log(userProfile.id)
        //     setBoards(boards)
        // }))
    };


    const getBoardById = (boardId) => {
        getToken().then((token) =>
            fetch(`/api/board/${boardId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer 4{token}`
                }
            })).then((resp) => resp.json())
            .then(setBoard)
    };


    const addBoard = (board) => {
        getToken().then((token) =>
            fetch("/api/board", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    //what we are going to return 
                    "Content-Type": "application/json"
                },
                // js object is being turned to into a string. The board is the js object 
                body: JSON.stringify(board)
            })).then(getAllBoards)
    };

    const updateBoard = (id, board) => {
        getToken().then((token) =>
            fetch(`/api/board/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-Type": "application/json"
                },
                body: JSON.stringify(board)
            })).then(getAllBoards)
    };

    const deleteBoard = (id) => {
        getToken().then((token) =>
            fetch(`/api/board/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })).then(getAllBoards)
    };



    //in the return these lines define what component will be expose to other components. These are the variables in the value attribute
    //You can access the array of objects being stored in the boards variable and invoke the functions
    return (
        <BoardContext.Provider value={{ board, boards, getAllBoards, getBoardById, addBoard, updateBoard, deleteBoard }}>
            {props.children}
        </BoardContext.Provider>
    );
}