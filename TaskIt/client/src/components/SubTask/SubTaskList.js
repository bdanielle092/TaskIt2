import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { TaskContext } from "../../providers/TaskProvider";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { SubTaskContext } from "../../providers/SubTaskProvider";




const SubTaskList = ({ subTasks }) => {

    //bringing in the function getTaskById with useContext
    const { getTaskById, } = useContext(TaskContext)
    const { subTask, SubTaskToggle } = useContext(SubTaskContext)
    //getting the task and board id from application  view
    const { taskId, boardId } = useParams();
    const [check, setCheck] = useState(subTask.isComplete);

    //useEffect to get the TaskById to get the subtask 
    useEffect(() => {
        getTaskById(taskId)

    }, []);

    //function to check if the task is done true or false not done. bringing in the toggle function. the !check means it will do the opposite of what is 
    const Checked = (evt) => {
        SubTaskToggle(taskId, evt.target.id, !check)
        setCheck(!check)
    }
    //return 1. mapping through the subtask 
    //2. Link to subtask.js
    return (
        <div>

            {subTasks.map((subTask) => (
                <div key={subTask.id}>
                    <Row>

                        <Col xs="3">
                            <input
                                type="checkbox"
                                id={subTask.id}
                                name="IsComplete"
                                checked={check}
                                onChange={Checked} />
                            {subTask.name}
                            {/* <Link to={`/board/${boardId}/task/${subTask.taskId}/subTask/${subTask.id}`}>
                                <strong>{subTask.name}</strong>
                            </Link> */}
                        </Col>
                        <Col xs="auto"></Col>
                        <Col xs="auto"></Col>
                        <Col xs="2" className='icons'>
                            <Link to={`/board/${boardId}/task/${taskId}/SubTaskEditForm/${subTask.id}`}>
                                <FiEdit
                                    size="2em"
                                    color="#2A9d8F"
                                    subtask={subTask}
                                    className='edit-icon' />
                            </Link>
                        </Col>
                        <Col xs="2" className='icons'>
                            <Link to={`/DeleteSubTask/${subTask.id}`}>
                                <RiDeleteBin5Line
                                    size="2em"
                                    color="#2A9d8F"
                                    className='delete-icon' />
                            </Link>
                        </Col>
                    </Row>
                    <Row><br></br></Row>
                </div>
            ))}
        </div>
    )
}

export default SubTaskList;