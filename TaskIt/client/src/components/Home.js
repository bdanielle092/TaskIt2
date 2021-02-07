import React, { useState, useContext, useEffect } from 'react';
import { UserProfileContext } from "../providers/UserProfileProvider";
import BoardList from "./Board/BoardList";
import { Col } from "reactstrap"
import "./Home.css";



const Home = () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const { getToken } = useContext(UserProfileContext);
    const [boards, setBoards] = useState([])


    //getting the all the boards for this user
    useEffect(() => {
        getToken()
            .then((token) =>
                fetch(`/api/board`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then((boards) =>

                setBoards(boards));

    }, []);


    return (




        <div>

            < h1 className="home" > Welcome {user.name.split(" ")[0]} !</h1 >
            <p className="home2">Click on a {" "}<strong className="tag">Board</strong>{" "}to view tasks</p>
            <Col className="listOfBoards">
                <BoardList boards={boards} />
            </Col>
        </div >





    );
}
export default Home

