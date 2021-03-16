import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

//context stores data to use in the application therefore you need to create a context
//the context is empty and waiting to be filled
export const BoardContext = createContext();

//defining the data provider components which will allow other components to use the data in context
export const BoardProvider = (props) => {
    //bringing in the method getToken from the userProfileProvider with useContext
    const { getToken } = useContext(UserProfileContext);

    //holds the state of the component board, and a function that updates it
    //board and boards define the variable which will hold the data
    //setBoard and setBoards define the function to be use to modify/update that state
    //{} is an object and [] is an array 
    const [board, setBoard] = useState({});
    const [boards, setBoards] = useState([]);




    //fetch calls

    //this gets all the board for the user sign in 
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

    };

    //this gets the boards by id
    const getBoardById = (boardId) => {
        getToken().then((token) =>
            fetch(`/api/board/${boardId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())
            .then((board) => { setBoard(board) });

    };

    //adds a board
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
            })).then(getAllBoards())
    };

    //updates a board
    const updateBoard = (board) => {
        getToken().then((token) =>
            fetch(`/api/board/${board.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-Type": "application/json"
                },
                body: JSON.stringify(board)
            })).then(getAllBoards)
    };

    //deletes a board
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