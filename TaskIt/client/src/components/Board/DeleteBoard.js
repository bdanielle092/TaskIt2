import React, { useEffect, useContext } from "react";
import { BoardContext } from "../../providers/BoardProvider";
import { useHistory, useParams, Link } from "react-router-dom";


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
                <section className="delete-board">
                    <h1 className="delete-board-h1">{board.name}</h1>
                    <hr />
                    <div className="row">
                        <div className="actionBtns">
                            <div className="form-group">
                                <input type="submit" onClick={deleteThisBoard} value="Confirm" className="btn-red" />&nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link to={`/`}>
                                    Cancel
                        </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
