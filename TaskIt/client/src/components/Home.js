import React, { useContext, useEffect } from 'react';
import { BoardContext } from '../providers/BoardProvider';
import BoardList from "./Board/BoardList";
import { Col } from "reactstrap"
import "./Home.css";
import { useHistory } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";



const Home = () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const { getAllBoards, boards } = useContext(BoardContext);
    const history = useHistory();


    //useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders.You can include dependencies in the array to cause the useEffect to run additional times.
    useEffect(() => {

        getAllBoards();

    }, [])


    //taking the user to the board form 
    const goToBoardForm = () => {
        history.push("/BoardForm");
    }

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

