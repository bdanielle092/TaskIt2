import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Row } from 'reactstrap';
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Task from "../Task/Task";



const TaskList = ({ tasks }) => {
    const { getToken } = useContext(UserProfileContext)
    const { Toggle, updatedTask, setUpdatedTask } = useContext(TaskContext)
    const { taskId, boardId } = useParams();
    const [task, setTask] = useState({});
    const [check, setCheck] = useState(task.isComplete);
    const history = useHistory();

    // //taking user to the edit form   
    // const goToTaskEditForm = (taskId, boardId) => {
    //     //change path for edit 
    //     history.push(`/board/${boardId}/task/${taskId}`);
    // }


    const Checked = (evt) => {
        Toggle(task.id, !check)
        setCheck(!check)
    }


    //checkbox
    // const setTaskAsComplete = (evt, taskId) => {
    //     if (evt.target.name === "isComplete") {
    //         const newIsComplete = evt.target.value;
    //         setIsComplete(newIsComplete)
    //     }
    //     const newTask = { ...task }
    //     newTask["isComplete"] = isComplete
    //     getToken()
    //         .then((token) =>
    //             fetch(`/api/Board/${boardId}/task/${taskId}`, {
    //                 method: "PUT",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //                 body: JSON.stringify(
    //                     newTask
    //                 ),
    //             })
    //         )
    //     newTask[evt.target.name] = task.complete ? false : true;
    //     setTask(newTask)
    // }

    //3.mapping through the list of tasks which will be displayed on the board
    //4. link goes task.js to get the task by id which display one task info
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} >
                    {/* <Row> */}
                    <Col>

                        <input
                            type="checkbox"
                            name="IsComplete"
                            checked={check}
                            onChange={Checked} />


                        <Link to={`/board/${task.boardId}/task/${task.id}`}>
                            <strong>{task.name}</strong>
                        </Link>

                    </Col>
                    {/* <Col></Col>
                        <Col></Col>
                        <Col>
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    {task.name} Actions
                </DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem onClick={() => goToTaskEditForm(task.id, task.boardId)} >Edit {task.name} Task</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Delete {task.name} Task</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                    <Row><br></br></Row> */}
                </div>
            ))
            }
        </div >
    )
}
export default TaskList 