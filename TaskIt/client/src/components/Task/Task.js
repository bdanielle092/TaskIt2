import React, { useEffect, useContext } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useParams, Link } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { Col } from "reactstrap";
import SubTaskList from "../SubTask/SubTaskList"
import { SubTaskContext } from "../../providers/SubTaskProvider";
import { AiOutlinePlusCircle } from "react-icons/ai";




const Task = ({ props }) => {
    const { getTaskById, task, getTasks, tasks } = useContext(TaskContext)
    const { board } = useContext(BoardContext)
    const { subTask, subTasks } = useContext(SubTaskContext)
    const { taskId, boardId } = useParams();



    useEffect(() => {
        getTaskById(taskId)

    }, [])

    useEffect(() => {
        getTasks(boardId)

    }, [])

    //taking the user to the board form 
    const goToSubTaskForm = () => {
        history.push(`/Board/${boardId}/task/${taskId}/SubTaskForm`);
    }

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
            <div className='icons'>
                <AiOutlinePlusCircle
                    size="2em"
                    color="#2A9d8F"
                    onClick={goToSubTaskForm}
                    className='plus-icon' />
            </div>
            <Col className="listOfTasks">
                <SubTaskList subTasks={subTasks} />
            </Col>
            <h3>Priority</h3>
            <p>{task.priorityId}</p>



            <h3>Date Created: {task.dateCreated}</h3>



        </div>


    )
}
export default Task