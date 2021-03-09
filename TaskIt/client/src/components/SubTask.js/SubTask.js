import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { SubTaskContext } from "../../providers/SubTaskProvider";
// import { TaskContext } from "../../providers/TaskProvider";
// import { BoardContext } from "../../providers/SubTaskProvider";
// import { TiArrowBack } from "react-icons/ti";
// import { AiOutlinePlusCircle } from "react-icons/ai";


const SubTask = ({ props }) => {
    const { getSubTaskById, subTask } = useContext(SubTaskContext)
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