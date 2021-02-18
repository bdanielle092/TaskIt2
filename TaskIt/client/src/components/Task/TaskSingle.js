import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Row } from 'reactstrap';
import { TaskContext } from "../../providers/TaskProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Task from "../Task/Task";



const TaskSingle = () => {
    const { getToken } = useContext(UserProfileContext)
    const { task, Toggle } = useContext(TaskContext)
    console.log(task)
    const { boardId, taskId } = useParams();

    // const [task, setTask] = useState({});
    const [checked, setChecked] = useState(task.isComplete);
    const history = useHistory();





    //function to check if the task is done true or false not done. bringing in the toggle function. the !check means it will do the opposite of what is 
    const isChecked = (evt) => {
        if (checked === false) {
            Toggle(boardId, evt.target.id, true)
            setChecked(true)
            console.log(task)

        } else {
            Toggle(boardId, evt.target.id, false)
            setChecked(false)
        }
        console.log(evt)
        // Toggle(boardId, evt.target.id, !check)
        // setChecked(!checked)
    }




    //3.mapping through the list of tasks which will be displayed on the board
    //4. link goes task.js to get the task by id which display one task info
    return (
        <div>



            <input
                type="checkbox"
                id={task.id}
                name="IsComplete"
                checked={checked}
                onChange={isChecked} />


            <Link to={`/board/${task.boardId}/task/${task.id}`}>
                <strong>{task.name}</strong>
            </Link>



        </div>


    )
}
export default TaskSingle
