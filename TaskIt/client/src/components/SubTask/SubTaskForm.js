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




    //useEffect for createTaskId function 
    useEffect(() => {
        const createTaskId = () => {
            const newSubTask = subTask
            newSubTask["taskId"] = taskId
            newSubTask["boardId"] = boardId
            setSubTask(newSubTask);

        }
        createTaskId();
    }, [])

    //updating the subTask and setting the new subTask
    const handleSubmit = (evt) => {
        evt.preventDefault()
        const newSubTask = { ...subTask };
        newSubTask[evt.target.id] = evt.target.value;
        setSubTask(newSubTask)
    }

    //making a new subTask and saving it to the database
    const createNewSubTask = () => {
        if (subTask.name === "") {
            alert("Please enter a SubTask Name")
        } else {
            addSubTask(subTask, taskId)
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
                    <Link to={`/board/${boardId}/task/${taskId}`}><Button type="button" color="warning">Cancel</Button></Link>
                </CardBody>
            </Card>
        </div>
    );
};
export default SubTaskForm;