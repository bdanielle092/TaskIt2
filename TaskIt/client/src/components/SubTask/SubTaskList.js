import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { TaskContext } from "../../providers/TaskProvider";




const SubTaskList = ({ subTasks }) => {
    const { taskId, boardId } = useParams();
    const { getTaskById, } = useContext(TaskContext)


    useEffect(() => {
        getTaskById(taskId)

    }, []);



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