import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const BoardList = ({ boards }) => {

    const history = useHistory();




    //taking user to the delete form   
    const goToBoardDeleteForm = (id) => {
        history.push(`/DeleteBoard/${id}`);
    }

    //mapping through the list of boards
    return (
        <div>
            {boards.map((board) => (
                <div key={board.id} >
                    <Link to={`/board/${board.id}`}>
                        <strong>{board.name}</strong>
                    </Link>
                    <div className='icons'>
                        <Link to={`/BoardEditForm/${board.id}`}>
                            <FiEdit
                                size="2em"
                                color="#2A9d8F"
                                boardId={board}
                                className='plus-icon' />
                        </Link>
                    </div>
                    <div className='icons'>
                        <Link to={`/DeleteBoard/${board.id}`}>
                            <RiDeleteBin5Line
                                size="2em"
                                color="#2A9d8F"
                                className='delete-icon' />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default BoardList