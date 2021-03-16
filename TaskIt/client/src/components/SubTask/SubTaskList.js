import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { TaskContext } from "../../providers/TaskProvider";




const SubTaskList = ({ subTasks }) => {
    //getting the task and board id from application  view
    const { taskId, boardId } = useParams();
    //bringing in the function getTaskById with useContext
    const { getTaskById, } = useContext(TaskContext)

    //useEffect to get the TaskById to get the subtask 
    useEffect(() => {
        getTaskById(taskId)

    }, []);


    //return 1. mapping through the subtask 
    //2. Link to subtask.js
    return (
        <div>

            {subTasks.map((subTask) => (
                <div key={subTask.id}>



                    <Link to={`/board/${boardId}/task/${subTask.taskId}/subTask/${subTask.id}`}>
                        <strong>{subTask.name}</strong>
                    </Link>


                </div>
            ))}
        </div>
    )
}

export default SubTaskList;