import React, { useState, useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";
// import { TaskContext } from "../../providers/TaskProvider";

const TaskEditForm = () => {
    const { getToken } = useContext(UserProfileContext)
    // const { task } = useContext(TaskContext)
    const { boardId, taskId } = useParams();
    //this is a empty string but when the page initially gets loaded then the string will be updated with the current info of the task
    const [taskToEdit, setTaskToEdit] = useState("")
    // the existing task object that is gets loads ar initial load too.
    const [existingTask, setExistingTask] = useState({})
    const history = useHistory();


    // you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.
    //this is getting the current state of the task base off the id passed in the uri and setting existingTask and taskToEdit
    useEffect(() => {
        getToken()
            .then((token) =>
                fetch(`/api/board/${boardId}/task`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then((task) => {
                setExistingTask(task)
                setTaskToEdit(task["name"])
                setTaskToEdit(task["notes"])
                setTaskToEdit(task["priorityId"])
            });

    }, []);

    //updating taskToEdit value. Updates taskToEdit value on every key stroke for the input field
    const handleSubmit = (evt) => {
        const newTask = evt.target.value;
        setTaskToEdit(newTask);
    };

    // update function to update the database with the new state of the task info
    const updateTask = (task) => {
        getToken()
            .then((token) =>
                fetch(`/api/task/${taskId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        //keeping all the existing keys the same except name, notes, priorityId
                        "active": existingTask["active"],
                        "id": existingTask["id"],
                        "name": taskToEdit,
                        "notes": taskToEdit,
                        "priorityId": taskToEdit,
                        "boardId": existingTask["boardId"],
                        "isComplete": existingTask["isComplete"]


                    }),
                })
            )
            .then((evt) => history.push(`/board/${boardId}`));
    };

    //taking the user back to the board they are on 
    const goBackToBoard = () => {
        history.push(`/board/${boardId}`);
    }


    return (
        <div>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Task Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                defaultValue={taskToEdit}
                                onChange={(evt) => {
                                    evt.preventDefault()
                                    handleSubmit(evt)
                                }} />
                            <Label for="notes">Notes</Label>
                            <Input
                                id="notes"
                                type="text"
                                name="notes"
                                defaultValue={taskToEdit}
                                onChange={(evt) => {
                                    evt.preventDefault()
                                    handleSubmit(evt)
                                }} />
                            <Label for="priority">Priority</Label>

                            <select

                                id="priorityId"
                                defaultValue={taskToEdit}
                                onChange={(evt) => handleSubmit(evt)}>
                                <option value="1">None</option>
                                <option value="2">Low</option>
                                <option value="3">Medium</option>
                                <option value="4">High</option>

                            </select>

                        </FormGroup>
                    </Form>
                    <Button

                        color="warning "
                        onClick={(evt) => {
                            evt.preventDefault();
                            updateTask(taskToEdit);
                        }}
                    >
                        SUBMIT
                    </Button>
                    <Button outline color="info" onClick={goBackToBoard}>
                        Cancel
                    </Button>
                </CardBody>
            </Card>
        </div>

    )
}
export default TaskEditForm