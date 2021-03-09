import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { SubTaskContext } from "../../providers/SubTaskProvider";

const SubTaskList = ({ subTasks }) => {

    const { boardId, taskId } = useParams();





    return (
        <div>
            {subTasks.map((subTask) => (
                <div key={subTask.id}>
                    <Link to={`/board/${boardId}/task/${subTask.taskId}/SubTask/${subTask.id}`}>
                        <strong>{subTask.name}</strong>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default SubTaskList