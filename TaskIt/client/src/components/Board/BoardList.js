import React from "react";
import { Link } from "react-router-dom";

const BoardList = ({ boards }) => {
    return (
        <div>
            {boards.map((board) => (
                <div key={board.id} >
                    <Link to={`/board/${board.id}`}>
                        <strong>{board.name}</strong>
                    </Link>
                </div>
            ))}
        </div>
    )
}
export default BoardList