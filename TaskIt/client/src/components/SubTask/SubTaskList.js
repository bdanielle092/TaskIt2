import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Row } from 'reactstrap';



const SubTaskList = ({ subTasks }) => {
    const { boardId, taskId, subTaskId } = useParams();






    //3.mapping through the list of subTasks which will be displayed on the task
    //4. link goes subTask.js to get the subTask by id which display one subTask info
    return (
        <div>
            {subTasks.map((subTask) => (
                <div key={subTask.id} >
                    {/* <Row> */}
                    <Col>
                        <Link to={`/board/${boardId}/task/${taskId}/SubTask/${subTaskId}`}>
                            <strong>{subTask.name}</strong>
                        </Link>
                    </Col>
                    {/* <Col></Col>
                        <Col></Col>
                        <Col>
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    {subTask.name} Actions
                </DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem >Edit {subTask.name} SubTask</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Delete {subTask.name} SubTask</DropdownItem>
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
export default SubTaskList