import React, { useContext, useEffect } from "react";
import { SubTaskContext } from "../../providers/SubTaskProvider";
import { useParams } from "react-router-dom";


//defining SubTask function passing the properties of task object
const SubTask = ({ props }) => {
    //bring in the object subTask and the function getSubTaskById with use context
    const { subTask, getSubTaskById } = useContext(SubTaskContext)
    //getting the subTaskId from application views
    const { subTaskId } = useParams();

    //this useEffect is getting the subTaskById which allows us to get the properties on the subTask like the name
    useEffect(() => {

        getSubTaskById(subTaskId)

    }, [])

    //return 1. subTask name
    return (
        <h3>{subTask.name} SubTask</h3>
    )
}
export default SubTask;