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
import { BoardContext } from "../../providers/BoardProvider";



const BoardEditForm = () => {
    // const { getToken } = useContext(UserProfileContext)
    const { getBoardById, updateBoard, board } = useContext(BoardContext)
    //for edit, hold on to state of board in this view
    const [editBoard, setEditBoard] = useState({});
    //UseParams pulls in the id information from applications view 
    const { id } = useParams();
    const history = useHistory();


    useEffect(() => {
        getBoardById(id)
    }, [])

    // useEffect(() => {
    //     setEditBoard(board)
    // }, [board]);


    //updating boardToEdit value. Updates boardToEdit value on every key stroke for the input field
    const handleSubmit = (evt) => {
        const newBoard = { ...editBoard };
        newBoard[evt.target.id] = evt.target.value;
        setEditBoard(newBoard);
    };

    // update function to update the database with the new state of the board name
    const editABoard = (event) => {
        updateBoard({
            id: editBoard.id,
            name: editBoard.name,
            userProfileId: editBoard.userProfileId,
            active: editBoard.active

        })
        history.push("/");
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Input
                                id={editBoard.id}
                                onChange={handleSubmit}
                                type="hidden"
                                value={board.id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Board Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={board.name}
                                onChange={(evt) => {
                                    evt.preventDefault()
                                    handleSubmit(evt)
                                }}
                            />
                        </FormGroup>
                        <Input
                            id={editBoard.userProfileId}
                            onChange={handleSubmit}
                            type="hidden"
                            value={board.userProfileId}
                        />
                        <Input
                            id={editBoard.active}
                            onChange={handleSubmit}
                            type="hidden"
                            value={board.active}
                        />
                        <FormGroup>

                        </FormGroup>


                    </Form>
                    <Button

                        color="warning "
                        onClick={(evt) => {
                            evt.preventDefault();
                            updateBoard(editABoard);
                        }}
                    >
                        SUBMIT
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
export default BoardEditForm;