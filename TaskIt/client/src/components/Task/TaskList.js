import React from "react";
import { Link } from "react-router-dom";

const TaskList = ({ tasks }) => {

    //3.mapping through the list of tasks which will be displayed on the board
    //4. link goes task.js to get the task by id which display one task info
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