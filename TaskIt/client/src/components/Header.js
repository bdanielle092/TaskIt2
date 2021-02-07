import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Navbar,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import logo from "../images/logo2.png";
import "./Header.css"



const Header = () => {
    const { logout } = useContext(UserProfileContext);
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const history = useHistory();
    const [newButton, setNewButton] = useState("")




    //allow the user to logout
    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };

    //taking the user to the board form 
    const goToBoardForm = () => {
        history.push("/BoardForm");
    }

    const showNewButton = () => {
        const pathName = window.location.pathname
        const taskPage = pathName.includes("board/")

        if (taskPage) {
            setNewButton("task")
        } else {
            setNewButton("board")
        }

    }

    useEffect(() => {
        showNewButton()
    }, [])




    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <a href="/"><img
                    src={logo}
                    alt="logo"
                    width="30"
                    height="30"
                    className="mr-1"
                />
                </a>



                <Nav className="mr-auto logout" navbar>
                    {user ? (
                        <>


                            <NavItem >
                                <Button color="warning" onClick={goToBoardForm} >New {newButton == "task" ? "Task" : "Board"}</Button>{' '}
                            </NavItem>

                            <NavItem className="logoutButton">
                                <Button color="warning" onClick={logoutAndReturn}>Logout</Button>{' '}
                            </NavItem>
                        </>
                    ) : null}
                </Nav>

            </Navbar>
        </div>
    );
};

export default Header;