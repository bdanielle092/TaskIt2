import React, { useEffect, useContext } from "react";
import { Col } from "reactstrap";
import { useParams, Link, useHistory } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TiArrowBack } from "react-icons/ti";
import TaskList from "../Task/TaskList";
import { TaskContext } from "../../providers/TaskProvider";
import { AiOutlinePlusCircle } from "react-icons/ai";


const Board = ({ props }) => {
    const { getBoardById, board } = useContext(BoardContext)
    const { boardId } = useParams();
    const { getTasks, tasks } = useContext(TaskContext);
    const history = useHistory();



    useEffect(() => {
        getBoardById(boardId)

    }, [])

    useEffect(() => {

        getTasks(boardId);

    }, [])


    //taking the user to the board form 
    const goToTaskForm = () => {
        history.push(`/Board/${boardId}/TaskForm`);
    }

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
            <div className='icons'>
                <AiOutlinePlusCircle
                    size="2em"
                    color="#2A9d8F"
                    onClick={goToTaskForm}
                    className='plus-icon' />
            </div>
            <h3 className="BoardName">{board.name} Board</h3>

            <Col className="listOfTasks">
                <TaskList tasks={tasks} />
            </Col>

        </div>


    )
}
export default Board