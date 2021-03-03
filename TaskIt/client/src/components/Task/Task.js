import React, { useEffect, useContext } from "react";
import { Card, CardBody } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { TaskContext } from "../../providers/TaskProvider";
// import { TiArrowBack } from "react-icons/ti"


const Task = ({ props }) => {
    const { getTaskById, task } = useContext(TaskContext)
    const { taskId } = useParams();



    useEffect(() => {
        getTaskById(taskId)

    }, [])



    return (
        <Card>
            <CardBody>

                <h3 className="TaskName">{task.name} Task</h3>

            </CardBody>
        </Card>


    )
}
export default Task