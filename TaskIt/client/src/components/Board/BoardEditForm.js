import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";



const BoardEditForm = () => {
    const { getToken } = useContext(UserProfileContext)
    const { boardId } = useParams();
    const history = useHistory();
    //this is a empty string but when the page initially gets loaded then the string will be updated with the current name of the board
    const [boardToEdit, setBoardToEdit] = useState("")
    //this the existing board object that is gets loads ar initial load too.
    const [existingBoard, setExistingBoard] = useState({})

    // you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.
    //this is getting the current state of the board base off the id passed in the uri and setting existingBoard and boardToEdit
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
            .then((res) => res.json())
            .then((board) => {
                setExistingBoard(board)
                setBoardToEdit(board["name"])
            });

    }, []);

    //updating boardToEdit value. Updates boardToEdit value on every key stroke for the input field
    const handleSubmit = (evt) => {
        const newBoard = evt.target.value;
        setBoardToEdit(newBoard);
    };

    // update function to update the database with the new state of the board name
    const updateBoard = (board) => {
        getToken()
            .then((token) =>
                fetch(`/api/board/${boardId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        //keeping all the existing keys the same except name
                        "active": existingBoard["active"],
                        "id": existingBoard["id"],
                        "name": boardToEdit,
                        "userProfile": existingBoard["userProfile"],
                        "userProfileId": existingBoard["userProfileId"]
                    }),
                })
            )
            .then((evt) => history.push("/"));
    };


    //taking the user back to the home page
    const goBackHome = () => {
        history.push(`/`);
    }

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
                                value={boardToEdit}
                                onChange={(evt) => {
                                    evt.preventDefault()
                                    handleSubmit(evt)
                                }}
                            />
                        </FormGroup>
                    </Form>
                    <Button

                        color="warning "
                        onClick={(evt) => {
                            evt.preventDefault();
                            updateBoard(boardToEdit);
                        }}
                    >
                        SUBMIT
                    </Button>
                    <Button outline color="info" onClick={goBackHome}>
                        Cancel
              </Button>
                </CardBody>
            </Card>
        </div>
    );
}
export default BoardEditForm;