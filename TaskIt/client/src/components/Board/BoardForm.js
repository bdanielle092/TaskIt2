
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
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


const BoardForm = () => {
    const { addBoard } = useContext(BoardContext);
    const history = useHistory();
    const [board, setBoard] = useState({ name: "" });
    const [isLoading] = useState(false);


  

    //this is updating the board and setting it as the new board 
    const handleSubmit = (evt) => {
        /* When changing a state object or array,
   always create a copy, make changes, and then set state.*/
        const newBoard = { ...board };
        /* Board is an object with properties.
     Set the property to the new value
     using object bracket notation. */
        newBoard[evt.target.id] = evt.target.value;
        //update state
        setBoard(newBoard);
    };



    //this is creating the new board in the database then taking us back to home 
    const createNewBoard = (evt) => {
        evt.preventDefault();
        //if else statement to make sure they enter a name
        if (board.name === "") {
            alert("Please enter a Board Name")
        } else {
            //invoke addBoard passing board as an argument.
            //once complete, go back to the home page
            addBoard(board)
            history.push("/");
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
                        className="postSubmitBnt"
                        type="submit"
                        disabled={isLoading}
                        onClick={createNewBoard}

                    >
                        SUBMIT
                    </Button>
                    <Link to={`/`}><Button type="button" color="warning">Cancel</Button></Link>
                </CardBody>
            </Card>
        </div>
    );
};
export default BoardForm