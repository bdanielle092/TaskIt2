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

//defining the BoardForm method and not passing anything in 
const BoardForm = () => {
    //bringing in the add method from BoardContext by using useContext
    const { addBoard } = useContext(BoardContext);
    //useHistory allows us to redo or undo things and change or navigate. History equals useHistory
    //ex I am using history to go back to the home page after adding a board.
    const history = useHistory();
    //board is the state of the object and setBoard allow us to update the Board
    //useState I am saying the state of the board is an empty string
    const [board, setBoard] = useState({ name: "" });
    //isLoading is the object and we are setting the state to false
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
        //this makes where they can't push the button multiple times
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
    };


    //return 1. input field for board name
    //2. submit button which has an onclick that runs through the method createNewBoard and then submits the new board
    //3. I have a cancel button that take me back to the home page. I used the Link to go back home
    //exporting BoardForm so I can use it in other components
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