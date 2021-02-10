import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Row } from 'reactstrap';
import { UserProfileContext } from "../../providers/UserProfileProvider";



const SubTaskList = ({ subTasks }) => {
    const { getToken } = useContext(UserProfileContext)
    const { taskId, boardId } = useParams();
    const [subTask, setSubTask] = useState({});
    const [isComplete, setIsComplete] = useState()



    //checkbox
    const setSubTaskAsComplete = (evt, subTaskId) => {
        if (evt.target.name === "isComplete") {
            const newIsComplete = evt.target.value;
            setIsComplete(newIsComplete)
        }
        const newSubTask = { ...subTask }
        newSubTask["isComplete"] = isComplete
        getToken()
            .then((token) =>
                fetch(`/api/subTask/${subTaskId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(
                        newSubTask
                    ),
                })
            )
        newSubTask[evt.target.name] = subTask.complete ? false : true;
        setSubTask(newSubTask)
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
                            id={`check--${subTask.id}`}
                            name="complete"
                            checked={subTask.complete}
                            onChange={(evt) => {
                                setSubTaskAsComplete(evt, subTask.id);
                            }} />


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