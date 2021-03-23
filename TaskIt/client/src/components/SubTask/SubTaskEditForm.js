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
    //bringing in methods and subtask object from subTaskContext using useContext
    const { getSubTaskById, updateSubTask, subTask } = useContext(SubTaskContext)
    //bringing in task object from TaskContext using usContext 
    const { task } = useContext(TaskContext)
    //bringing in board object from BoardContext using usContext 
    const { board } = useContext(BoardContext)
    const { subTaskId } = useParams()
    //setting and updating state
    const [editSubTask, setEditSubTask] = useState({
        id: subTask.id,
        name: "",
        isComplete: subTask.isComplete,
        taskId: subTask.taskId,
        active: subTask.active
    })
    //getting subTaskId from application views
    // const { subTaskId } = useParams();
    //useHistory allows us to undo/redo and change or navigate to different pages
    //ex. history.push takes the user back to the task page
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
        //task is an object with properties.
        //set the property to the new value using the  bracket notation
        //saying newSubTask id equals the value
        newSubTask[evt.target.id] = evt.target.value;
        //updating state
        setEditSubTask(newSubTask);
    };

    //function to update the SubTask to the database
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

    //return 1. input fields for each subTask property. The name is the the only ones you can change the others are hidden
    //2.submit button with an onClick that calls the editASubTask function
    //3. cancel button that takes the user back to the task they were on. I used the Link to take then back to the task page.
    //export the SubTaskEditForm to use in other components
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