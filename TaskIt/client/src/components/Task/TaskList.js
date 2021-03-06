import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TaskContext } from "../../providers/TaskProvider";

const TaskList = ({ tasks }) => {
    const { getBoardById } = useContext(BoardContext);
    const { getTaskById } = useContext(TaskContext);
    const { boardId, taskId } = useParams();


    useEffect(() => {
        getBoardById(boardId)

    }, [])

    useEffect(() => {
        getTaskById(taskId)

    }, [])

    //mapping through the list of tasks
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} >
                    <Link to={`/board/${task.boardId}/task/${task.id}`}>
                        <strong>{task.name}</strong>
                    </Link>

                    <div className='icons'>
                        <Link to={`/board/${boardId}/TaskEditForm/${taskId}`}>
                            <FiEdit
                                size="2em"
                                color="#2A9d8F"
                                taskId={task}
                                className='edit-icon' />
                        </Link>
                    </div>

                    <div className='icons'>
                        <Link to={`/DeleteTask/${task.id}`}>
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
export default TaskList