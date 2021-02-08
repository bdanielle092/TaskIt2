
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const BoardForm = () => {
    const [board, setBoard] = useState({ name: "" })
    const { getToken } = useContext(UserProfileContext);
    const history = useHistory();

    //this is updating the board and setting it as the new board 
    const handleSubmit = (evt) => {
        const newBoard = { ...board };
        newBoard[evt.target.name] = evt.target.value;
        setBoard(newBoard);
    };

    //this is creating the new board in the database then taking us back to home 
    const createNewBoard = (newBoard) => {
        getToken()
            .then((token) =>
                fetch("/api/board", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/JSON",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newBoard),
                })
            )
            .then(() => history.push(`/`));
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
                                placeholder="Enter new board name"
                                onChange={(evt) => handleSubmit(evt)}
                            />
                        </FormGroup>
                    </Form>
                    <Button

                        color="warning "
                        onClick={(evt) => {
                            evt.preventDefault();
                            createNewBoard(board);
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
};
export default BoardForm; 
