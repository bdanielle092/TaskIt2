import React from "react";
import { Link, useHistory } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Row } from 'reactstrap';


const TaskList = ({ tasks }) => {
    const history = useHistory();

    //taking user to the edit form   
    const goToTaskEditForm = (taskId, boardId) => {
        //change path for edit 
        history.push(`/board/${boardId}/task/${taskId}`);
    }

    //3.mapping through the list of tasks which will be displayed on the board
    //4. link goes task.js to get the task by id which display one task info
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} >
                    {/* <Row> */}
                    <Col>
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