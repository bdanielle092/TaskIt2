import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TaskContext } from "../../providers/TaskProvider";
import "./task.css"


//defining the method TaskList and passing in the tasks object
const TaskList = ({ tasks }) => {

    //get the method from BoardContext using useContext
    // const { getBoardById } = useContext(BoardContext);
    //get the method from TaskContext using useContext
    const { TaskToggle } = useContext(TaskContext)
    //getting boardId from application views 
    const { boardId } = useParams();

    //useEffect - you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.
    //get the board by Id
    // useEffect(() => {
    //     getBoardById(boardId)

    // }, [])

    //checked it a function that passes the params tasId and isComplete
    //if the task is complete we return the function TaskToggle and pass the params boardId, taskId and false 
    //else we return TaskToggle and pass the params boardId, taskId, and true  
    const Checked = (taskId, isComplete) => {

        if (isComplete === true) {
            return TaskToggle(boardId, taskId, false)
        }
        else {
            return TaskToggle(boardId, taskId, true)
        }

    }


    //return 1.mapping through the list of tasks
    //xs is at the smallest size it will take up the amount of space we give it. If you wanted to take the whole space you would be 12 auto what is left out of that pie graph 
    //I used the Row to have the icons next to the BoardName vertically and Col have the BoardName and icon list horizontally. The extra Row and Col is to help with spacing
    //2. checkbox
    //3. link to task.js
    //4. edit icon with link to editForm
    //5. delete icon with link to deleteForm 
    //export the taskList so it can be use in other components

    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} >
                    <Row>
                        <Col xs="3">
                            <div className={task.isComplete ? "Task strike" : "Task"}>
                                <input
                                    type="checkbox"
                                    id={task.id}
                                    name="IsComplete"
                                    checked={task.isComplete}
                                    onChange={() => (Checked(task.id, task.isComplete))} />

                                <Link to={`/board/${task.boardId}/task/${task.id}`}>
                                    <strong>{task.name}</strong>
                                </Link>
                            </div>
                        </Col>
                        <Col xs="auto"></Col>
                        <Col xs="auto"></Col>
                        <Col xs="2" className='icons'>
                            <Link to={`/board/${boardId}/TaskEditForm/${task.id}`}>
                                <FiEdit
                                    size="2em"
                                    color="#2A9d8F"
                                    task={task}
                                    className='edit-icon' />
                            </Link>
                        </Col>

                        <Col xs="2" className='icons'>
                            <Link to={`/DeleteTask/${task.id}`}>
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
export default TaskList