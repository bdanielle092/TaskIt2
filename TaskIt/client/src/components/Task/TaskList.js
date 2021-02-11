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





    //function to check if the task is done true or false not done. bringing in the toggle function. the !check means it will do the opposite of what is 
    const Checked = (evt) => {
        Toggle(boardId, evt.target.id, !check)
        setCheck(!check)
    }




    //3.mapping through the list of tasks which will be displayed on the board
    //4. link goes task.js to get the task by id which display one task info
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} >

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

                </div>
            ))
            }
        </div >
    )
}
export default TaskList 