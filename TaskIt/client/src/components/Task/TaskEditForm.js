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



const TaskEditForm = () => {
    const { getTaskById, updateTask, task } = useContext(TaskContext)
    const { board } = useContext(BoardContext)

    //for edit, hold on to state of task in this view
    const [editTask, setEditTask] = useState({
        id: task.id,
        name: "",
        notes: "",
        priorityId: "",
        isComplete: task.isComplete,
        dateCreated: task.dateCreated,
        boardId: task.boardId,
        active: task.active

    });
    //UseParams pulls in the id information from applications view 
    const { taskId } = useParams();
    const history = useHistory();


    useEffect(() => {
        getTaskById(taskId)

    }, [])

    //sets the task at the start
    useEffect(() => {
        setEditTask(task)
    }, [task]);


    //updating boardToEdit value. Updates boardToEdit value on every key stroke for the input field
    const handleFieldChange = (evt) => {
        const newTask = { ...editTask };
        newTask[evt.target.id] = evt.target.value;
        setEditTask(newTask);
    };

    // update function to update the database with the new state of the board name
    const editATask = (event) => {
        event.preventDefault()
        updateTask({
            id: editTask.id,
            name: editTask.name,
            notes: editTask.notes,
            priorityId: editTask.priorityId,
            isComplete: editTask.isComplete,
            dateCreated: editTask.dateCreated,
            boardId: editTask.boardId,
            active: editTask.active

        })
        history.push(`/board/${board.id}`);
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Input
                                id={editTask.id}
                                onChange={handleFieldChange}
                                type="hidden"
                                value={editTask.id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Board Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={editTask.name}

                                onChange={(evt) => {
                                    evt.preventDefault()
                                    handleFieldChange(evt)
                                }}
                            />
                            <Input
                                id="notes"
                                type="text"
                                name="notes"
                                value={editTask.notes}

                                onChange={(evt) => {
                                    evt.preventDefault()
                                    handleFieldChange(evt)
                                }}
                            />
                            <Label for="priority">Priority</Label>
                            <select

                                id="priorityId"
                                value={editTask.priorityId}
                                onChange={(evt) => handleFieldChange(evt)}>
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
                    <Link to={`/board/${board.id}`}><Button type="button" color="warning">Cancel</Button></Link>
                </CardBody>
            </Card>
        </div>
    );
}
export default TaskEditForm;