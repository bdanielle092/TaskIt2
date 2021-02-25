import React, { useState, useContext, useEffect } from 'react';
import { BoardContext } from '../providers/BoardProvider';
import { UserProfileContext } from "../providers/UserProfileProvider";
import BoardList from "./Board/BoardList";
import { Col } from "reactstrap"
import "./Home.css";

const Home = () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const { userProfile } = useContext(UserProfileContext);
    const { getAllBoards } = useContext(BoardContext);
    const [boards, setBoards] = useState([])

    console.log(userProfile)
    console.log(userProfile.id)
    useEffect(() => {

        getAllBoards(JSON.parse(userProfile).id);

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

