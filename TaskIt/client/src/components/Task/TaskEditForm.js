import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { BoardContext } from "../../providers/BoardProvider";
import { TaskContext } from "../../providers/TaskProvider";
import { PriorityContext } from "../../providers/PriorityProvider";


//defining  the TaskEditForm and not passing anything
const TaskEditForm = () => {
    //bringing in the functions from TaskContext using useContext
    //Task object bring the properties for task 
    const { getTaskById, updateTask, task } = useContext(TaskContext)
    //board object bring the properties for board from BoardContext using useContext
    const { board } = useContext(BoardContext)
    const { priority, setPriority } = useContext(PriorityContext)


    //for edit, hold on to state of task in this view
    //setEditTask allow us to update state
    const [editTask, setEditTask] = useState({
        // id: task.id,
        name: "",
        notes: "",
        priorityId: task.priorityId,
        isComplete: task.isComplete,
        dateCreated: task.dateCreated,
        boardId: task.boardId,
        active: task.active

    });
    //UseParams pulls in the id information from applications view 
    const { taskId, boardId } = useParams();
    //useHistory allows us to undo/redo and change or navigate to different pages
    //ex history.push takes the user back to the board page there were on after editing the task 
    const history = useHistory();

    const handleChange = (evt) => {
        setPriority(evt.target.value)
    }

    //useEffects renders the page then come back and gets the taskId
    //allow us to edit the task 
    useEffect(() => {
        getTaskById(taskId)

    }, [])

    //sets the task at the start
    //this is what is in there before we change it
    useEffect(() => {
        setEditTask(task)
    }, [task]);


    //updating editTask value. Updates editTask value on every key stroke for the input field
    const handleFieldChange = (evt) => {
        //making a copy of editTask called newTask
        const newTask = { ...editTask };
        //saying newTask id equals the value
        newTask[evt.target.id] = evt.target.value;
        //updating the newTask
        setEditTask(newTask);
    };

    // update function to update the database with the new state of the board name
    const editATask = (event) => {
        //stops the user from hitting the submit button multiply times
        event.preventDefault()
        //updateTask method
        updateTask({
            id: taskId,
            name: editTask.name,
            notes: editTask.notes,
            // priorityId: editTask.priorityId,
            isComplete: editTask.isComplete,
            dateCreated: editTask.dateCreated,
            boardId: editTask.boardId,
            active: editTask.active

        })
        const parsePriority = parseInt(priority);
        editTask.priority = parsePriority
        if (!editTask.priority) {
            editTask.priority = task.priorityId
        }

        updateTask(editTask.id, editTask)
            .then(() => {
                //taking the user back to the board they were on 
                history.push(`/board/${board.id}`);

            })
    };

    if (!editTask) {
        return null
    }
    //return 1. input fields for each task property. The name, notes, and priority are the only ones you can change the others are hidden
    //2.submit button with an onClick that calls the editATask function
    //3. cancel button that takes the user back to the board they were on. I used the Link to take then back to the board page.
    //export the TaskEditForm to use in other components
    return (
        <div>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Input
                                id={taskId}
                                onChange={handleFieldChange}
                                type="hidden"
                                value={taskId}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Task Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                defaultValue={editTask.name}

                                onChange={(evt) => {
                                    evt.preventDefault()
                                    handleFieldChange(evt)
                                }}
                            />
                            <Label for="name">Task Notes</Label>
                            <Input
                                id="notes"
                                type="text"
                                name="notes"
                                defaultValue={editTask.notes}

                                onChange={(evt) => {
                                    evt.preventDefault()
                                    handleFieldChange(evt)
                                }}
                            />
                            <Label for="priority">Priority</Label>

                            <select

                                id="priorityId"
                                defaultValue={editTask.priorityId}
                                onChange={handleChange}>
                                <option value="1">None</option>
                                <option value="2">Low</option>
                                <option value="3">Medium</option>
                                <option value="4">High</option>

                            </select>


                        </FormGroup>
                        <Input
                            id={editTask.isComplete}
                            onChange={handleFieldChange}
                            type="hidden"
                            value={editTask.isComplete}
                        />
                        <Input
                            id={editTask.dateCreated}
                            onChange={handleFieldChange}
                            type="hidden"
                            value={editTask.dateCreated}
                        />
                        <Input
                            id={editTask.boardId}
                            onChange={handleFieldChange}
                            type="hidden"
                            value={editTask.boardId}
                        />
                        <Input
                            id={editTask.active}
                            onChange={handleFieldChange}
                            type="hidden"
                            value={editTask.active}
                        />
                        <FormGroup>

                        </FormGroup>


                    </Form>
                    <Button

                        color="warning "
                        onClick={editATask}

                    >
                        SUBMIT
                    </Button>
                    <Link to={`/board/${boardId}`}><Button type="button" color="warning">Cancel</Button></Link>
                </CardBody>
            </Card>
        </div>
    );
}
export default TaskEditForm;