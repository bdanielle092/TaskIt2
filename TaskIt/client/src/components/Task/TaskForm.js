import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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

const TaskForm = () => {
    const [task, setTask] = useState({ name: "", note: "", isComplete: false, dateTime: "" })
    const { getToken } = useContext(UserProfileContext);
    const { boardId } = useParams();
    const history = useHistory();

    //getting the boardId 
    const createBoardId = () => {
        const newTask = task
        newTask["boardId"] = boardId
        setTask(newTask);
    }

    //useEffect for createBoardId function 
    useEffect(() => {
        createBoardId();
    }, [])


    //this is updating the task and setting it as the new task
    //if its a priorityId change to a number otherwise return as a string 
    const handleSubmit = (evt) => {
        const newTask = { ...task };
        if (evt.target.name === "priorityId") {
            newTask[evt.target.name] = Number(evt.target.value);
        } else {
            newTask[evt.target.name] = evt.target.value;
        }

        setTask(newTask);
    };

    //this is creating the new task in the database then taking us back to the board we are currently on 
    const createNewTask = () => {
        getToken()
            .then((token) =>
                fetch(`/api/board/${boardId}/task`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/JSON",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(task),
                })
            )
            .then(() => history.push(`/board/${boardId}`));
    };

    //updateTask = task, then setting the date to current day and time, then updating set task to the updated day and time in the database
    const createDate = () => {
        const updateTask = task
        updateTask["dateTime"] = Date.now()
        setTask(updateTask)
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
                                placeholder="Enter new task name"
                                onChange={(evt) => handleSubmit(evt)}
                            />
                            <Label for="notes">Notes</Label>
                            <Input
                                id="notes"
                                type="text"
                                name="notes"
                                placeholder="Enter notes"
                                onChange={(evt) => handleSubmit(evt)}
                            />
                            <Label for="priority">Choose a Priority</Label>
                            <select onChange={(evt) => handleSubmit(evt)} id="priority" name="priorityId" form="priority">
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
                            createDate();
                            createNewTask();
                        }}
                    >
                        SUBMIT
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
};
export default TaskForm;

