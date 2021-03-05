import React, { useEffect, useContext } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useParams, Link } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TaskContext } from "../../providers/TaskProvider";
// import { TiArrowBack } from "react-icons/ti"


const Task = ({ props }) => {
    const { getTaskById, task } = useContext(TaskContext)
    const { board } = useContext(BoardContext)
    const { taskId } = useParams();



    useEffect(() => {
        getTaskById(taskId)

    }, [])



    return (
        <div>

            <div className='icons'>
                <Link to={`/board/${board.id}`}>
                    <TiArrowBack
                        size="2em"
                        color="#2A9d8F"
                        taskId={task}
                        className='back-icon' />
                </Link>
            </div>
            <h3 className="TaskName">{task.name} Task</h3>
            <h3>Notes</h3>
            <p>{task.notes}</p>
            <h3>SubTask</h3>
            <h3>Priority</h3>
            <p>{task.priorityId}</p>



            <h3>Date Created: {task.dateCreated}</h3>



        </div>


    )
}
export default Task