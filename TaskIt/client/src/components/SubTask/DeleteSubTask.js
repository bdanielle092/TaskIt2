import React, { useEffect, useContext } from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { SubTaskContext } from "../../providers/SubTaskProvider"
import { BoardContext } from "../../providers/BoardProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button } from "reactstrap"

export default function DeleteSubTask() {
    const { subTask, deleteSubTask, getSubTaskById } = useContext(SubTaskContext);
    const { task } = useContext(TaskContext)
    const { board } = useContext(BoardContext)
    const { subTaskId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getSubTaskById((subTaskId))
    }, [])

    const deleteThisSubTask = () => {
        deleteSubTask(subTaskId)
        history.push(`/board/${board.id}/task/${task.id}`)
    }

    return (
        <>
            <div className="delete-confirm-container">
                <h3> Are you sure you want to delete {subTask.name} SubTask ?</h3>
                <h5>This can not be undone</h5>

                <div className="row">
                    <Button
                        color="warning "
                        onClick={deleteThisSubTask}>
                        Delete
                    </Button>
                    <Link to={`/board/${board.id}/task/${task.id}`}><Button type="button" color="warning">Cancel</Button></Link>
                </div>
            </div>


        </>
    )
}