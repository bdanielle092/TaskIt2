import React, { useContext, useEffect } from 'react';
import { BoardContext } from '../providers/BoardProvider';
import BoardList from "./Board/BoardList";
import { Col } from "reactstrap"
import "./Home.css";
import { useHistory } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";



const Home = () => {
    //getting the user
    const user = JSON.parse(localStorage.getItem("userProfile"));
    //getting the method and board object from boardContext using useContext
    const { getAllBoards, boards } = useContext(BoardContext);
    //useHistory allows us to undo/redo and change or navigate to different pages
    const history = useHistory();


    //useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders.You can include dependencies in the array to cause the useEffect to run additional times.
    useEffect(() => {

        getAllBoards();

    }, [])


    //taking the user to the board form 
    const goToBoardForm = () => {
        history.push("/BoardForm");
    }

    // return 1. Welcome to the user
    //2. tells the user to click on a board
    //3. add a board
    //4.back arrow
    //5. list of Boards
    //export the home page so it can be use on other components
    return (

        <div>


            <h1 className="home">Welcome {user.name.split(" ")[0]}!</h1>
            <p className="home2">Click on a Board to view tasks</p>
            <div className='homeIconContainer'>
                <p className="AddBoardName">Add Board</p>
                <AiOutlinePlusCircle
                    size="2em"
                    color="#2A9d8F"
                    onClick={goToBoardForm}
                    className='home-plus-icon' />
            </div>
            <Col className="listOfBoards">

                <BoardList boards={boards} />
            </Col>
        </div>

    );
}
export default Home

