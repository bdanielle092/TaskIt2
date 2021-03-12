import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { SubTaskContext } from "../../providers/SubTaskProvider";
import { TaskContext } from "../../providers/TaskProvider";

const SubTaskList = ({ subTasks }) => {
    const { subTask } = useContext(SubTaskContext)
    const { getTaskById } = useContext(TaskContext);
    const { boardId, taskId } = useParams();

    useEffect(() => {
        getTaskById(taskId)

    }, [])





    return (
        <div>
            {subTasks.map((subTask)(
                <div key={subTask.id}>
                    <Row>
                        <Col xs="3">
                            <Link to={`/board/${boardId}/task/${subTask.taskId}/SubTask/${subTask.id}`}>
                                <strong>{subTask.name}</strong>
                            </Link>
                        </Col>
                    </Row>

                </div>
            ))}
        </div>
    )
}

export default SubTaskList;