import React from "react";
import { Link } from "react-router-dom";
// import { FiEdit } from "react-icons/fi";
// import { RiDeleteBin5Line } from "react-icons/ri";

const TaskList = ({ tasks }) => {

    //mapping through the list of tasks
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} >
                    <Link to={`/board/${task.boardId}/task/${task.id}`}>
                        <strong>{task.name}</strong>
                    </Link>

                </div>
            ))}
        </div>
    )
}
export default TaskList