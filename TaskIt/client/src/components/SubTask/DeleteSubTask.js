import React, { useEffect, useContext } from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { SubTaskContext } from "../../providers/SubTaskProvider"
import { BoardContext } from "../../providers/BoardProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button } from "reactstrap"

export default function DeleteSubTask() {
    //brining in methods and subTask object from SubTaskContext from useContext
    const { subTask, deleteSubTask, getSubTaskById } = useContext(SubTaskContext);
    //bringing in the task object 
    const { task } = useContext(TaskContext)
    //bringing in the board object 
    const { board } = useContext(BoardContext)
    //useParams allow us to get the boardId from ApplicationView
    const { subTaskId, boardId, taskId } = useParams();
    //useHistory will allow us to undo/redo and change or navigate to other pages
    //ex. I use history to take the user back to the task page after deleting a subTask
    const history = useHistory();

    //useEffect - you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.
    useEffect(() => {
        getSubTaskById((subTaskId))
    }, [])

    //deleteThisSubTask function. We delete the subTask and push it back to the task page.
    const deleteThisSubTask = () => {
        deleteSubTask(subTaskId)
        history.push(`/board/${board.id}/task/${task.id}`)
    }

    //return 1. Ask the user if they are user they want to delete this subTask
    //2. letting them know this can not be undone
    //3. button to delete the subTask. onClick that calls the deleteThisSubTask function.
    //4. cancel button that takes the user back to the task page they were on . I used the Link to go back to the task
    //export the DeleteSubTask so we can use it in other components
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
                    <Link to={`/board/${boardId}/task/${taskId}`}><Button type="button" color="warning">Cancel</Button></Link>
                </div>
            </div>


        </>
    )
}