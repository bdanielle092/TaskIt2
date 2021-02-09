import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Row } from 'reactstrap';



const SubTaskList = ({ subTasks }) => {
    const { boardId, taskId } = useParams();






    //3.mapping through the list of subTasks which will be displayed on the task
    //4. link goes subTask.js to get the subTask by id which display one subTask info
    return (
        <div>
            {subTasks.map((subTask) => (
                <div key={subTask.id} >

                    <Col>
                        <Link to={`/board/${boardId}/task/${taskId}/SubTask/${subTask.id}`}>
                            <strong>{subTask.name}</strong>
                        </Link>
                    </Col>
                </div>


            ))
            }
        </div >

    )
}

export default SubTaskList