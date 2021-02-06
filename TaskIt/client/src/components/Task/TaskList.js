import React from "react";
import { Link } from "react-router-dom";

const TaskList = ({ tasks }) => {

    //mapping through the list of tasks
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} >
                    <Link to={`/board/${board.id}/task`}>
                        <strong>{task.name}</strong>
                    </Link>
                </div>
            ))}
        </div>
    )
}
export default TaskList 