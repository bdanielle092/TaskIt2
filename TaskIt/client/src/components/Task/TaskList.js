import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TaskContext } from "../../providers/TaskProvider";


const TaskList = ({ tasks }) => {
    const { getBoardById } = useContext(BoardContext);
    const { task, TaskToggle } = useContext(TaskContext)
    const { boardId } = useParams();
    const [check, setCheck] = useState(task.isComplete);

    useEffect(() => {
        getBoardById(boardId)

    }, [])

    //function to check if the task is done true or false not done. bringing in the toggle function. the !check means it will do the opposite of what is 
    const Checked = (evt) => {
        TaskToggle(boardId, evt.target.id, !check)
        setCheck(!check)
    }


    //mapping through the list of tasks
    //xs is at the smallest size it will take up the amount of space we give it. If you wanted to take the whole space you would be 12 auto what is left out of that pie graph 
    //I used the Row to have the icons next to the BoardName vertically and Col have the BoardName and icon list horizontally. The extra Row and Col is to help with spacing
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} >
                    <Row>
                        <Col xs="3">
                            <input
                                type="checkbox"
                                id={task.id}
                                name="IsComplete"
                                checked={check}
                                onChange={Checked} />

                            <Link to={`/board/${task.boardId}/task/${task.id}`}>
                                <strong>{task.name}</strong>
                            </Link>
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