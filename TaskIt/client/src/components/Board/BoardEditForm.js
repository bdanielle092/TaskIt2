import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
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
    const { getBoardById, updateBoard, board } = useContext(BoardContext)

    //for edit, hold on to state of board in this view
    const [editBoard, setEditBoard] = useState({
        id: board.id,
        name: "",
        userProfileId: board.userProfileId,
        active: board.active

    });
    //UseParams pulls in the id information from applications view 
    const { boardId } = useParams();
    const history = useHistory();
    // console.log(parseInt(id).toString())

    useEffect(() => {
        getBoardById(boardId)

    }, [])

    //sets the board at the start
    useEffect(() => {
        setEditBoard(board)
    }, [board]);


    //updating boardToEdit value. Updates boardToEdit value on every key stroke for the input field
    const handleFieldChange = (evt) => {
        const newBoard = { ...editBoard };
        newBoard[evt.target.id] = evt.target.value;
        setEditBoard(newBoard);
    };

    // update function to update the database with the new state of the board name
    const editABoard = (event) => {
        event.preventDefault()
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
                                onChange={handleFieldChange}
                                type="hidden"
                                value={editBoard.id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Board Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={editBoard.name}

                                onChange={(evt) => {
                                    evt.preventDefault()
                                    handleFieldChange(evt)
                                }}
                            />
                        </FormGroup>
                        <Input
                            id={editBoard.userProfileId}
                            onChange={handleFieldChange}
                            type="hidden"
                            value={editBoard.userProfileId}
                        />
                        <Input
                            id={editBoard.active}
                            onChange={handleFieldChange}
                            type="hidden"
                            value={editBoard.active}
                        />
                        <FormGroup>

                        </FormGroup>


                    </Form>
                    <Button

                        color="warning "
                        onClick={editABoard}

                    >
                        SUBMIT
                    </Button>
                    <Link to={`/`}><Button type="button" color="warning">Cancel</Button></Link>
                </CardBody>
            </Card>
        </div>
    );
}
export default BoardEditForm;