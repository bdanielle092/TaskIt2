import React, { useEffect, useContext } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useParams, Link, useHistory } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TaskContext } from "../../providers/TaskProvider";
import SubTaskList from "../SubTask/SubTaskList";
import { Col } from "reactstrap";
import { SubTaskContext } from "../../providers/SubTaskProvider";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { PriorityContext } from "../../providers/PriorityProvider";



//defining Task function passing the properties of task object
const Task = ({ props }) => {
    //bringing the methods from TaskContext by  using useContext
    const { getTaskById, task } = useContext(TaskContext)
    //bring in the board object from BoardContext using useContext
    const { board } = useContext(BoardContext)
    //using useParams to get the taskId from application views
    const { taskId, boardId } = useParams();
    const { getSubTasks, subTasks } = useContext(SubTaskContext)
    const { priority } = useContext(PriorityContext)
    const history = useHistory();



    //useEffects render then come back to get the taskId 
    //getTaskById is getting the task info for a single task 
    useEffect(() => {
        getTaskById(taskId)
        getSubTasks(taskId)

    }, [])


    //taking the user to the board form 
    // we use history.push to take the user to the add task form 
    const goToSubTaskForm = () => {
        history.push(`/Board/${boardId}/task/${taskId}/SubTaskForm`);
    }


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
                <Link to={`/board/${boardId}`}>
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
            <div className='BoardContainer'>
                <p className="AddSubTaskName">Add SubTask</p>
                <AiOutlinePlusCircle
                    size="2em"
                    color="#2A9d8F"
                    onClick={goToSubTaskForm}
                    className='subTask-plus-icon' />
            </div>
            <Col className="listOfSubTasks">
                <SubTaskList subTasks={subTasks} />
            </Col>
            <h3>Priority</h3>
            <p>{task.priority.name}</p>



            <h3>Date Created: {task.dateCreated}</h3>



        </div>


    )
}
export default Task