import React, { useEffect, useContext } from "react";
import { Col } from "reactstrap";
import { useParams, Link, useHistory } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TiArrowBack } from "react-icons/ti";
import TaskList from "../Task/TaskList";
import { TaskContext } from "../../providers/TaskProvider";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./Board.css"

//this whole thing is a method and we are passing the properties. Then we are exporting it at the end so we can use in in other components 
const Board = ({ props }) => {
    //bringing in the methods from BoardProvider with useContext
    //we bringing in board object to get the properties of a board 
    const { board } = useContext(BoardContext);
    //useParams allow us to get the boardId from application view
    const { boardId } = useParams();
    //bringing in methods from TaskProvider using TaskContext 
    //we bringing tasks to get the properties of the tasks 
    const { getTasks, tasks } = useContext(TaskContext);
    //useHistory allows you undo or redo things in your app.
    //an example in this page is we can go back to pervious page if we decide we don't want to be on the board card. 
    const history = useHistory();


    //useEffect - you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.
    //example is in the component it will come back an get the boardById and get the Task
    // useEffect(() => {
    //     getBoardById(boardId)

    // }, [])

    useEffect(() => {

        getTasks(boardId);

    }, [])


    //taking the user to the board form 
    // we use history.push to take the user to the add task form 
    const goToTaskForm = () => {
        history.push(`/Board/${boardId}/TaskForm`);
    }
    //In this return 1. we have a back arrow icon which takes the use back to the previous page
    //2. We display the name of the board we are on 
    //3. we have an add icon which take the user to the add task form 
    //4. We display the list of tasks on this board
    //last we export the board so we can import it in other components
    return (
        <div>
            <div className='icons'>
                <Link to={"/"}>
                    <TiArrowBack
                        size="2em"
                        color="#2A9d8F"
                        board={board}
                        className='back-icon' />
                </Link>
            </div>

            <h3 className="BoardName">{board.name} Board</h3>
            <div className='BoardContainer'>
                <p className="AddTaskName">Add Task</p>
                <AiOutlinePlusCircle
                    size="2em"
                    color="#2A9d8F"
                    onClick={goToTaskForm}
                    className='task-plus-icon' />
            </div>


            <Col className="listOfTasks">
                <TaskList tasks={tasks} />
            </Col>

        </div>


    )
}
export default Board