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


//defining the BoardEditFrom method and not passing anything
const BoardEditForm = () => {
    //bringing in these methods from BoardContext by using useContext
    const { getBoardById, updateBoard, board } = useContext(BoardContext)

    //editBoard hold on to state of board in this view. The only thing we are changing is the name which is why its an empty string
    //setEditBoard will allow us to update the board
    const [editBoard, setEditBoard] = useState({
        id: "",
        name: "",
        userProfileId: "",
        active: ""

    });
    //UseParams pulls in the id information from applications view 
    const { boardId } = useParams();
    const history = useHistory();

    //useEffects will come back to these methods after render

    useEffect(() => {
        getBoardById(boardId)

    }, [])

    //sets the board at the start
    useEffect(() => {
        setEditBoard(board)
    }, []);


    //updating board value. Updates board value on every key stroke for the input field
    const handleFieldChange = (evt) => {
        //making a copy of editBoard and calling newBoard
        const newBoard = { ...editBoard };
        //the newBoard id equal the value
        newBoard[evt.target.id] = evt.target.value;
        //update the newBoard
        setEditBoard(newBoard);
    };

    // update function to update the database with the new state of the board name
    const editABoard = (event) => {
        //this stops the user from pushing the button multiple times
        event.preventDefault()
        //update method key/value 
        updateBoard({
            id: editBoard.id,
            name: editBoard.name,
            userProfileId: editBoard.userProfileId,
            active: editBoard.active

        })
        //history.push takes the user back to the home page
        history.push("/");
    };

    //return 1.I have input fields for each property for board but I am only updating the board name. The other inputs are hidden
    //2. submit button with an onclick that passing the editABoard method then submit. 
    //3. cancel button that take the user back home. I use the Link to go back home
    //then we export the EditBoardForm so we can use it in other components
    return (
        <>
            <form>
                <fieldset>
                    <div>
                        <input
                            type="hidden"
                            onChange={handleFieldChange}
                            id={boardId}
                            value={board.id}
                        />
                        <label htmlFor="name">Board Name</label>
                        <Input
                            type="text"
                            onChange={(evt) => {
                                evt.preventDefault()
                                handleFieldChange(evt)
                            }}
                            id="name"
                            value={board.name}
                        />


                        <input
                            type="hidden"
                            onChange={handleFieldChange}
                            id={board.userProfileId}
                            value={board.userProfileId}
                        />

                        <input
                            type="hidden"
                            onChange={handleFieldChange}
                            id={board.active}
                            value={board.active}
                        />
                        <div>
                            <Button

                                color="warning "
                                onClick={editABoard}

                            >
                                SUBMIT
                           </Button>
                            <Link to={`/`}><Button type="button" color="warning">Cancel</Button></Link>
                        </div>

                    </div>
                </fieldset>
            </form>
        </>
    );
}
export default BoardEditForm;