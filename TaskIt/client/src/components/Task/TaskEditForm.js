
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import {
    Card,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

const TaskEditForm = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const { boardId, taskId } = useParams();
    const history = useHistory()
    const [taskToEdit, setTaskToEdit] = useState({
        name: "",
        notes: "",
        priorityId: "",

    })
    const [priorities, setPriorities] = useState([])


    useEffect(() => {
        getToken()
            .then((token) =>
                fetch(`/api/priority`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then((priority) => setPriorities(priority))
            .then((_) => {
                getToken()
                    .then((token) =>
                        fetch(`/api/task/${taskId}`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                    )
                    .then((res) => res.json())
                    .then((task) => setTaskToEdit(task));
            });
    }, []);



    const handleSubmit = (evt) => {
        const newTask = { ...taskToEdit }
        newTask[evt.target.name] = evt.target.value;
        setTaskToEdit(newTask)
    }

    const updateTask = (task) => {
        getToken()
            .then((token) =>
                fetch(`/api/task/${taskId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(task)
                })
            )
            .then((evt) => history.push(`/board/${boardId}`))
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
                                value={taskToEdit.name}
                                onChange={(evt) => handleSubmit(evt)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="notes">Notes</Label>
                            <Input
                                id="notes"
                                type="text"
                                name="notes"
                                value={taskToEdit.notes}
                                onChange={(evt) => handleSubmit(evt)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="selectCategory">Priority</Label>
                            <Input
                                type="select"
                                name="priorityId"
                                id="priority"
                                value={taskToEdit.priorityId}
                                onChange={(e) => handleSubmit(e)}
                            >
                                <option>Select Priority ...</option>
                                {priorities.map((priority) => (
                                    <option value={priority.id} key={priority.id}>
                                        {priority.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>

                        <Button
                            color="warning"
                            onClick={(e) => {
                                e.preventDefault();
                                updateTask(taskToEdit);
                            }}
                        > Submit</Button>
                        <Link to={`/board/${boardId}`}><Button type="button" color="warning">Cancel</Button></Link>
                    </Form>

                </CardBody>

            </Card>
        </div>
    )
}

export default TaskEditForm