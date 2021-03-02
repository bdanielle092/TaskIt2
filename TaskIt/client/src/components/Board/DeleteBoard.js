import React, { useEffect, useContext } from "react";
import { BoardContext } from "../../providers/BoardProvider";
import { useHistory, useParams, Link } from "react-router-dom";


export default function DeleteBoard() {
    const { board, deleteBoard, getBoardById } = useContext(BoardContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getBoardById((id))
    }, [])

    const deleteThisBoard = () => {
        deleteBoard(id)
        history.push("/")
    }


    return (
        <>
            <div className="delete-confirm-container">
                <h3> Delete {board.name} Board ?</h3>
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
