import React, { useEffect, useContext } from "react";
import { BoardContext } from "../../providers/BoardProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button } from "reactstrap"


//defining and exporting the DeleteBoardForm
export default function DeleteBoard() {
    //bringing in the methods from BoardContext using useContext
    const { board, deleteBoard, getBoardById } = useContext(BoardContext);
    //useParams allow us to get the boardId from ApplicationView
    const { boardId } = useParams();
    //useHistory will allow us to undo/redo and change or navigate to other pages
    //ex. I use history to take the user back home after deleting a board
    const history = useHistory();

    //useEffect will render then come back and get the boardId
    useEffect(() => {
        getBoardById((boardId))
    }, [])

    //deleteThisBoard function. We delete the board and push it back home.
    const deleteThisBoard = () => {
        console.log(board)
        deleteBoard(boardId)
        history.push("/")
    }

    //return 1. Ask the user if they are user they want to delete
    //2. letting them know this can not be undone
    //3. button to delete the board. onClick that calls the deleteThisBoard function.
    //4. cancel button that takes the user back home. I used the Link to go back home
    //export the DeleteBoard so we can use it in other components
    return (
        <>
            <div className="delete-confirm-container">
                <h3> Are you sure you want to delete {board.name} board ?</h3>
                <h5>This can not be undone and all Tasks on this board will be delete too</h5>

                <div className="row">
                    <Button
                        color="warning "
                        onClick={deleteThisBoard}>
                        Delete
                        </Button>
                    <Link to={`/`}><Button type="button" color="warning">Cancel</Button></Link>
                </div>
            </div>


        </>
    )
}
