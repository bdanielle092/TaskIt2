import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Row } from 'reactstrap';
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Task from "../Task/Task";



const TaskList = ({ tasks }) => {
    const { getToken } = useContext(UserProfileContext)
    const { Toggle } = useContext(TaskContext)
    const { boardId } = useParams();
    const [task, setTask] = useState({});
    const [check, setCheck] = useState(task.isComplete);
    const history = useHistory();

    // //taking user to the edit form   
    // const goToTaskEditForm = (taskId, boardId) => {
    //     //change path for edit 
    //     history.push(`/board/${boardId}/task/${taskId}`);
    // }




    const Checked = (evt) => {
        // console.log(evt.target.id)
        Toggle(boardId, evt.target.id, !check)
        setCheck(!check)
    }




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
                            id={task.id}
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