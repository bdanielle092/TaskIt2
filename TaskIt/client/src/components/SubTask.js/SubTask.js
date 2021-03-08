import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { SubTaskContext } from "../../providers/SubTaskProvider";
import { TaskContext } from "../../providers/TaskProvider";
// import { TiArrowBack } from "react-icons/ti";
// import { AiOutlinePlusCircle } from "react-icons/ai";


const SubTask = ({ props }) => {
    const { getSubTaskById, subTask } = useContext(SubTaskContext)
    const { task } = useContext(TaskContext);
    const { board } = useContext(BoardContext);
    const { subTaskId } = useParams();


    useEffect(() => {
        getSubTaskById(subTaskId)

    }, [])




    return (
        <div>

            <h3 className="SubTaskName">{subTask.name} SubTask</h3>

        </div>


    )
}
export default SubTask