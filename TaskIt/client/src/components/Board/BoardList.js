import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

//defining the method BoardList and passing in the board object
const BoardList = ({ boards }) => {


    // in the return 1.mapping through the list of boards.
    //2. we made a link so the user can click a board and see the board card. we user board.name to display the name of the board
    //3.we have the edit icon that take the user to the edit form. I used a Link to redirect to the edit page
    //4. we have the delete icon that take teh user to the delete from. I used a Link to redirect to the delete page
    //then we export the BoardList so it can be used in other components
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
                                className='edit-icon' />
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