import React, { useState, useContext, useEffect } from 'react';
import { BoardContext } from '../providers/BoardProvider';
import { UserProfileContext } from "../providers/UserProfileProvider";
import BoardList from "./Board/BoardList";
import { Col } from "reactstrap"
import "./Home.css";

const Home = () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    // const { userProfile } = useContext(UserProfileContext);
    const { getAllBoards, boards } = useContext(BoardContext);


    //useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders.You can include dependencies in the array to cause the useEffect to run additional times.
    useEffect(() => {

        getAllBoards();

    }, [])



    return (

        <div>
            <div>

                <h1 className="home">Welcome {user.name.split(" ")[0]}!</h1>
                <p className="home2">Click on a  <strong className="tag">Board</strong> to view tasks</p>
                <Col className="listOfBoards">
                    <BoardList boards={boards} />
                </Col>
            </div>
        </div>

    );
}
export default Home

