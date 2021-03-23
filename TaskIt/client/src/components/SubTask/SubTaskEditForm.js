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

const SubTaskEditForm = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const { boardId, taskId, subTaskId } = useParams()
    const history = useHistory()
    const [subTaskToEdit, setSubTaskToEdit] = useState({
        name: ""
    })

    useEffect(() => {
        getToken()
            .then((token) =>
                fetch(`/api/subTask/${subTaskId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                })
            )
            .then((res) => res.json())
            .then((subTask) => setSubTaskToEdit(subTask))
    }, [])

    const handleSubmit = (evt) => {
        const newSubTask = { ...subTaskToEdit }
        newSubTask[evt.target.name] = evt.target.value
        setSubTaskToEdit(newSubTask)
    }


    const updateSubTask = (subTask) => {
        getToken()
            .then((token) =>
                fetch(`/api/subTask/${subTaskId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(subTask),
                })
            )
            .then((evt) => history.push(`/board/${boardId}/task/${taskId}`));
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">SubTask Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={subTaskToEdit.name}
                                onChange={(evt) => handleSubmit(evt)} />
                        </FormGroup>
                        <Button
                            color="warning"
                            onClick={(evt) => {
                                evt.preventDefault()
                                updateSubTask(subTaskToEdit)
                            }}>Submit</Button>
                        <Link to={`/board/${boardId}/task/${taskId}`}><Button type="button" color="warning">Cancel</Button></Link>
                    </Form>
                </CardBody>
            </Card>

        </div>

    )
}
export default SubTaskEditForm