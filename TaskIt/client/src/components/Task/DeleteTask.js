import React, { useEffect, useContext } from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { BoardContext } from "../../providers/BoardProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button } from "reactstrap"



export default function DeleteTask() {
    //bringing in the methods and task object from TaskContext using useContext
    const { task, deleteTask, getTaskById } = useContext(TaskContext);
    //bringing in the board object 
    const { board } = useContext(BoardContext);
    //useParams allow us to get the boardId from ApplicationView
    const { taskId } = useParams();
    //useHistory will allow us to undo/redo and change or navigate to other pages
    //ex. I use history to take the user back to the board page after deleting a task
    const history = useHistory();

    //useEffect - you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.
    useEffect(() => {
        getTaskById((taskId))
    }, [])

    //deleteThisTask function. We delete the board and push it back to the board page.
    const deleteThisTask = () => {
        deleteTask(taskId)
        history.push(`/board/${board.id}`)
    }

    //return 1. Ask the user if they are user they want to delete this task
    //2. letting them know this can not be undone
    //3. button to delete the task. onClick that calls the deleteThisTask function.
    //4. cancel button that takes the user back to the board page they were on . I used the Link to go back to the board
    //export the DeleteTask so we can use it in other components
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
