import React, { useContext } from 'react';
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
    //bringing in logout function from UserProfileContext using useContext
    const { logout } = useContext(UserProfileContext);
    //getting the user
    const user = JSON.parse(localStorage.getItem("userProfile"));
    //useHistory allows us to undo/redo and change or navigate to different pages
    const history = useHistory();




    //allow the user to logout and takes the user to the login page
    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };


    //return 1.icon for the site
    //2. logout button with onClick with the logout function 
    //export the header page so it can be used on other components
    return (
        <div >
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