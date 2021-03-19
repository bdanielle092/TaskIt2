import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

//context stores data to use in the application therefore you need to create a context
//the context is empty and waiting to be filled
export const PriorityContext = createContext();

//defining the data provider components which will allow other components to use the data in context
export const PriorityProvider = (props) => {
    //bringing in the method getToken from the userProfileProvider with useContext
    const { getToken } = useContext(UserProfileContext);

    //holds the state of the component board, and a function that updates it
    //board and boards define the variable which will hold the data
    //setBoard and setBoards define the function to be use to modify/update that state
    //{} is an object and [] is an array 
    //setting the state of the single object and setting the state of the array of board object
    const [priority, setPriority] = useState({});
    const [priorities, setPriorities] = useState([]);




    //fetch calls

    //this gets all the board for the user sign in 
    const getAllPriority = () => {
        getToken().then((token) =>
            fetch("/api/priority", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
                //have a response and translate to json
                //.then take that response and turn it into a json response 
                // I am taking the response and formatting it so json can read it
            }).then(res => res.json())
                //.then setting to state to show what the data base shows. This shows what boards I have 
                //if you add or delete it will reset the boards so you see what is on the home page
                .then(setPriorities));

    };

    //this gets the boards by id
    const getPriorityById = (priorityId) => {
        getToken().then((token) =>
            fetch(`/api/priority/${priorityId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then((resp) => resp.json())

            //first board is a taco and its a param of the function 
            //setting the state for a single board
            .then(priority => setPriority(priority));

    };



    //in the return these lines define what component will be expose to other components. These are the variables in the value attribute
    //You can access the array of objects being stored in the boards variable and invoke the functions
    return (
        <PriorityContext.Provider value={{ priority, priorities, getAllPriority, getPriorityById }}>
            {props.children}
        </PriorityContext.Provider>
    );
}