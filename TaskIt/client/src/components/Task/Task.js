import React, { useEffect, useContext } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useParams, Link } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TaskContext } from "../../providers/TaskProvider";
import SubTaskList from "../SubTask/SubTaskList";
import { Col } from "reactstrap";
import { SubTaskContext } from "../../providers/SubTaskProvider";



//defining Task function passing the properties of task object
const Task = ({ props }) => {
    //bringing the methods from TaskContext by  using useContext
    const { getTaskById, task } = useContext(TaskContext)
    //bring in the board object from BoardContext using useContext
    const { board } = useContext(BoardContext)
    //using useParams to get the taskId from application views
    const { taskId } = useParams();
    const { subTasks } = useContext(SubTaskContext)


    //useEffects render then come back to get the taskId
    useEffect(() => {
        getTaskById(taskId)

    }, [])

    //return 1.back arrow icon to take the user back to the board they were on. I used the Link to go back to the board page
    //2. Name Of task header
    //3.Notes header
    //4. paragraph tag to display the notes
    //5.Name of subTask header
    //6. list of subTask
    //7. Priority header
    //8. number of the priority the user pick
    //9. date created header and dated created info 
    //export the Task so it can be used in other component
    return (
        <div>

            <div className='icons'>
                <Link to={`/board/${board.id}`}>
                    <TiArrowBack
                        size="2em"
                        color="#2A9d8F"
                        task={task}
                        className='back-icon' />
                </Link>
            </div>
            <h3 className="TaskName">{task.name} Task</h3>
            <h3>Notes</h3>
            <p>{task.notes}</p>
            <h3>SubTask</h3>

            <h3>Priority</h3>
            <p>{task.priorityId}</p>



            <h3>Date Created: {task.dateCreated}</h3>



        </div>


    )
}
export default Task