import React, { useState, useContext, useEffect } from "react";
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



const SubTaskForm = () => {
    const { addSubTask } = useContext(SubTaskContext)
    const { task } = useContext(TaskContext);
    const { board } = useContext(BoardContext);
    const [subTask, setSubTask] = useState({ name: "", isComplete: false });
    const { taskId, boardId } = useParams();
    const history = useHistory();

    //getting the taskId
    const createTaskId = () => {
        const newSubTask = subTask
        newSubTask["taskId"] = taskId
        newSubTask["boardId"] = boardId
        setSubTask(newSubTask);

    }

    //useEffect for createTaskId function 
    useEffect(() => {
        createTaskId();
    }, [])

    //updating the subTask and setting the new subTask
    const handleSubmit = (evt) => {
        evt.preventDefault()
        const newSubTask = { ...subTask };
        newSubTask[evt.target.name] = evt.target.value;
        setSubTask(newSubTask)
    }

    //making a new subTask and saving it to the database
    const createNewSubTask = () => {
        if (subTask.name === "") {
            alert("Please enter a SubTask Name")
        } else {
            addSubTask(taskId, subTask)
            history.push(`/board/${boardId}/task/${taskId}`);
        }
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
                            createNewSubTask();
                        }}
                    >
                        SUBMIT
                </Button>
                    <Link to={`/board/${board.id}/task/${taskId}`}><Button type="button" color="warning">Cancel</Button></Link>
                </CardBody>
            </Card>
        </div>
    );
};
export default SubTaskForm;