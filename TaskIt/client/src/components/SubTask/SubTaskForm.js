
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


const SubTaskForm = () => {
    const [subTask, setSubTask] = useState({ name: "", isComplete: false });
    const { getToken } = useContext(UserProfileContext);
    const { taskId, boardId } = useParams();
    const history = useHistory();

    //getting the taskId
    const createTaskId = () => {
        const newSubTask = subTask
        newSubTask["taskId"] = taskId
        setSubTask(newSubTask);

    }

    //useEffect for createTaskId function 
    useEffect(() => {
        createTaskId();
    }, [])

    //updating the subTask and setting the new subTask
    const handleSubmit = (evt) => {
        const newSubTask = { ...subTask };
        newSubTask[evt.target.name] = evt.target.value;
        setSubTask(newSubTask)
    }

    //making a new subTask and saving it to the database
    const createNewSubTask = () => {
        getToken()
            .then((token) =>
                fetch(`/api/subTask/task/${taskId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/JSON",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(subTask),
                })
            )
            .then(() => history.push(`/board/${boardId}/task/${taskId}`));

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
                                placeholder="Enter a subTask"
                                onChange={(evt) => handleSubmit(evt)}
                            />
                        </FormGroup>
                    </Form>
                    <Button

                        color="warning "
                        onClick={(evt) => {
                            evt.preventDefault();
                            createNewSubTask(subTask);
                        }}
                    >
                        SUBMIT
                </Button>
                </CardBody>
            </Card>
        </div>
    );
};
export default SubTaskForm;         