import React, { useEffect, useContext } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";
import { TiArrowBack } from "react-icons/ti";
import TaskList from "../Task/TaskList";


const Board = ({ props }) => {
    const { getBoardById, board } = useContext(BoardContext)
    const { boardId } = useParams();
    const { getAllTask, tasks } = useContext(BoardContext);



    useEffect(() => {
        getBoardById(boardId)

    }, [])

    useEffect(() => {

        getAllTask(boardId);

    }, [])





    return (
        <Card>
            <CardBody>
                <div className='icons'>
                    <Link to={"/"}>
                        <TiArrowBack
                            size="2em"
                            color="#2A9d8F"
                            boardId={board}
                            className='back-icon' />
                    </Link>
                </div>
                <h3 className="BoardName">{board.name} Board</h3>
                <Col className="listOfTasks">
                    <TaskList tasks={tasks} />
                </Col>
            </CardBody>
        </Card>


    )
}
export default Board