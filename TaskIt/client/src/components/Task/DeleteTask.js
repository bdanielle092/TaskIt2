import React, { useEffect, useContext } from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { BoardContext } from "../../providers/BoardProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button } from "reactstrap"



export default function DeleteTask() {
    const { task, deleteTask, getTaskById } = useContext(TaskContext);
    const { board } = useContext(BoardContext);
    const { taskId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getTaskById((taskId))
    }, [])

    const deleteThisTask = () => {
        deleteTask(taskId)
        history.push(`/board/${board.id}`)
    }


    return (
        <>
            <div className="delete-confirm-container">
                <h3> Are you sure you want to delete {task.name} Task ?</h3>
                <h5>This can not be undone and all SubTask on this Task will be delete too</h5>

                <div className="row">
                    <Button
                        color="warning "
                        onClick={deleteThisTask}>
                        Delete
                        </Button>
                    <Link to={`/board/${board.id}`}><Button type="button" color="warning">Cancel</Button></Link>
                </div>
            </div>


        </>
    )
}
