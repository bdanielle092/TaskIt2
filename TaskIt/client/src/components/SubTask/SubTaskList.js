import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { TaskContext } from "../../providers/TaskProvider";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { SubTaskContext } from "../../providers/SubTaskProvider";
import "./subTask.css"


//defining the SubTaskList and passing the subTask object
const SubTaskList = ({ subTasks }) => {

    //bringing in the function getTaskById with useContext
    const { getTaskById, } = useContext(TaskContext)
    //bring in the methods from SubTaskContext with useContext 
    const { SubTaskToggle } = useContext(SubTaskContext)
    //getting the task and board id from application  view
    const { taskId, boardId } = useParams();


    //useEffect to get the TaskById to get the subtask on the task page
    useEffect(() => {
        getTaskById(taskId)

    }, []);

    //function to check if the task is done true or false not done. bringing in the toggle function. the !check means it will do the opposite of what is 
    const Checked = (subTaskId, isComplete) => {

        if (isComplete === true) {
            return SubTaskToggle(taskId, subTaskId, false)
        }
        else {
            return SubTaskToggle(taskId, subTaskId, true)
        }
    }
    //return 1. mapping through the subtask 
    //2. Link to subtask.js
    //3. checkbox to mark a task complete
    //4. edit icon I use a link to take the user to the SubtaskEditForm
    //5. delete icon I use a link to take the user to the delete form 
    //exporting the subTaskList so it can be use in other components
    return (
        <div>

            {subTasks.map((subTask) => (
                <div key={subTask.id}>
                    <Row>

                        <Col xs="3">
                            <div className={subTask.isComplete ? "SubTask strike" : "SubTask"}>
                                <input
                                    type="checkbox"
                                    id={subTask.id}
                                    name="IsComplete"
                                    checked={subTask.isComplete}
                                    onChange={() => (Checked(subTask.id, subTask.isComplete))} />
                                {subTask.name}
                                {/* <Link to={`/board/${boardId}/task/${subTask.taskId}/subTask/${subTask.id}`}>
                                <strong>{subTask.name}</strong>
                            </Link> */}
                            </div>
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