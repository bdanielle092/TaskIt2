import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import {
    Card,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

const BoardEditForm = (props) => {
    const { getToken } = useContext(UserProfileContext)
    //useParams is the pathname that makes up the url of the browser
    //returns an object of key/value pairs of URL parameters. Use it to access match. params of the current <Route>
    const { boardId } = useParams()
    const history = useHistory()
    const [boardToEdit, setBoardToEdit] = useState({
        name: ""
    })
    //getting a single board
    useEffect(() => {
        getToken()
            .then((token) =>
                fetch(`/api/board/${boardId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                })
            )
            //.then take that response and turn it into a json response 
            .then((res) => res.json())
            //first board is a taco and its a param of the function 
            //setting the state for a single board
            .then((board) => setBoardToEdit(board))
    }, [])


    const handleSubmit = (evt) => {
        const newBoard = { ...boardToEdit }
        newBoard[evt.target.name] = evt.target.value
        setBoardToEdit(newBoard)
    }


    const updateBoard = (board) => {
        getToken()
            .then((token) =>
                fetch(`/api/board/${boardId}`, {
                    method: "PUT",
                    headers: {
                        //what we are returning the data to the json database
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    // javascript object is being turned to into a string. The Board is the javascript object
                    //this allows json database to read the data 
                    body: JSON.stringify(board),
                })
            )
            .then((evt) => history.push("/"));
    };
    //return 1. inputs for name
    //2. Submit Button 
    //3. cancel Button warped in a Link to take the user back to the home page
    return (
        <div>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Board Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={boardToEdit.name}
                                onChange={(evt) => handleSubmit(evt)} />
                        </FormGroup>
                        <Button
                            color="warning"
                            onClick={(evt) => {
                                evt.preventDefault()
                                updateBoard(boardToEdit)
                            }}>Submit</Button>
                        <Link to={`/`}><Button type="button" color="warning">Cancel</Button></Link>
                    </Form>
                </CardBody>

            </Card>
        </div>
    )

}
export default BoardEditForm