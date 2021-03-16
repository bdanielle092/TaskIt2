import React, { useContext, useEffect } from "react";
import { SubTaskContext } from "../../providers/SubTaskProvider";
import { useParams, Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";


//defining SubTask function passing the properties of task object
const SubTask = ({ props }) => {
    //bring in the object subTask and the function getSubTaskById with use context
    const { subTask, getSubTaskById } = useContext(SubTaskContext)
    //getting the subTaskId from application views
    const { subTaskId, boardId, taskId } = useParams();

    //this useEffect is getting the subTaskById which allows us to get the properties on the subTask like the name
    useEffect(() => {

        getSubTaskById(subTaskId)

    }, [])

    //return 1. back button which take the user back to the task they  were on. I used the Link to go back to task
    //2.subTask name
    return (
        <div>
            <div className='icons'>
                <Link to={`/board/${boardId}/task/${taskId}`}>
                    <TiArrowBack
                        size="2em"
                        color="#2A9d8F"
                        subTask={subTask}
                        className='back-icon' />
                </Link>
            </div>
            <h3>{subTask.name} SubTask</h3>
        </div>
    )
}
export default SubTask;