import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Row } from 'reactstrap';
import { SubTaskContext } from "../../providers/SubTaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";



const SubTaskList = ({ subTasks }) => {
    const { getToken } = useContext(UserProfileContext);
    const { Toggle } = useContext(SubTaskContext);
    const { taskId, boardId } = useParams();
    const [subTask, setSubTask] = useState({});
    const [check, setCheck] = useState(subTask.isComplete);

    const Checked = (evt) => {
        Toggle(taskId, evt.target.id, !check)
        setCheck(!check)
    }





    //3.mapping through the list of subTasks which will be displayed on the task
    //4. link goes subTask.js to get the subTask by id which display one subTask info
    return (
        <div>
            {subTasks.map((subTask) => (
                <div key={subTask.id} >

                    <Col>

                        <input
                            type="checkbox"
                            id={subTask.id}
                            name="IsComplete"
                            checked={check}
                            onChange={Checked} />

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