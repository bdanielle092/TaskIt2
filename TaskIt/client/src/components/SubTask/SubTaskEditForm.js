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
import { SubTaskContext } from "../../providers/SubTaskProvider";


const SubTaskEditForm = () => {
    const { getSubTaskById, updateSubTask, subTask } = useContext(SubTaskContext)
    const { task } = useContext(TaskContext)
    const { board } = useContext(BoardContext)
    const [editSubTask, setEditSubTask] = useState({
        id: subTask.id,
        name: "",
        isComplete: subTask.isComplete,
        taskId: subTask.taskId,
        active: subTask.active
    })
    const { subTaskId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getSubTaskById(subTaskId)

    }, [])


    //sets the subTask at the start
    useEffect(() => {
        setEditSubTask(subTask)
    }, []);


    //updating editSubTask value. Updates editSubTask value on every key stroke for the input field
    const handleFieldChange = (evt) => {
        //making a copy of editSubTask called newSubTask
        const newSubTask = { ...editSubTask };
        //saying newSubTask id equals the value
        newSubTask[evt.target.id] = evt.target.value;
        //updating the newSubTask
        setEditSubTask(newSubTask);
    };

    const editASubTask = (event) => {
        //stops the user from hitting the submit button multiply times
        event.preventDefault()
        //updateSubTask method
        updateSubTask({
            id: editSubTask.id,
            name: editSubTask.name,
            isComplete: editSubTask.isComplete,
            taskId: editSubTask.taskId,
            active: editSubTask.active

        })
        //taking the user back to the board they were on 
        history.push(`/board/${board.id}/task/${task.id}`);
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Input
                                id={editSubTask.id}
                                onChange={handleFieldChange}
                                type="hidden"
                                value={editSubTask.id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">SubTask Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={editSubTask.name}

                                onChange={(evt) => {
                                    evt.preventDefault()
                                    handleFieldChange(evt)
                                }}
                            />
                        </FormGroup>

                        <Input
                            id={editSubTask.isComplete}
                            onChange={handleFieldChange}
                            type="hidden"
                            value={editSubTask.isComplete}
                        />
                        <Input
                            id={editSubTask.taskId}
                            onChange={handleFieldChange}
                            type="hidden"
                            value={editSubTask.taskId}
                        />
                        <Input
                            id={editSubTask.active}
                            onChange={handleFieldChange}
                            type="hidden"
                            value={editSubTask.active}
                        />

                        <FormGroup>

                        </FormGroup>
                    </Form>
                    <Button

                        color="warning "
                        onClick={editASubTask}

                    >
                        SUBMIT
                    </Button>
                    <Link to={`/board/${board.id}/task/${task.id}`}><Button type="button" color="warning">Cancel</Button></Link>
                </CardBody>
            </Card>
        </div>
    )
}
export default SubTaskEditForm