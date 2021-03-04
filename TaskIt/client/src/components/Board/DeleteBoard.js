import React, { useEffect, useContext } from "react";
import { BoardContext } from "../../providers/BoardProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button } from "reactstrap"



export default function DeleteBoard() {
    const { board, deleteBoard, getBoardById } = useContext(BoardContext);
    const { boardId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getBoardById((boardId))
    }, [])

    const deleteThisBoard = () => {
        deleteBoard(boardId)
        history.push("/")
    }


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
