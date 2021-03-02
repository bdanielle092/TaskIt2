import React, { useEffect, useContext } from "react";
import { Card, CardBody } from "reactstrap";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../providers/BoardProvider";


const Board = ({ props }) => {
    const { getBoardById, board } = useContext(BoardContext)
    const { id } = useParams();



    useEffect(() => {
        getBoardById(id)

    }, [])



    return (
        <Card>
            <CardBody>
                <h3 className="BoardName">{board.name} Board</h3>

            </CardBody>
        </Card>


    )
}
export default Board