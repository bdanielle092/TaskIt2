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
    // bringing in add method from SubTaskContext using useContext
    const { addSubTask } = useContext(SubTaskContext)
    // const { task } = useContext(TaskContext);
    // const { board } = useContext(BoardContext);
    //setting state and updating state
    const [subTask, setSubTask] = useState({ name: "", isComplete: false });
    //getting ids from application views
    const { taskId, boardId } = useParams();
    //useHistory allows us to undo/redo and change or navigate to different pages
    //ex. history.push takes the user back to the task page
    const history = useHistory();




    //useEffect for createTaskId function 
    //this allow the user to add a subTask to a task with the taskId and  boardId
    useEffect(() => {
        const createTaskId = () => {
            //making a copy of subtask
            const newSubTask = subTask
            //then setting the taskId to current taskId
            newSubTask["taskId"] = taskId
            //then setting the boardId to current boardId
            newSubTask["boardId"] = boardId
            //updating state
            setSubTask(newSubTask);

        }
        //calling the function 
        createTaskId();
    }, [])

    //updating the subTask and setting the new subTask
    const handleSubmit = (evt) => {
        //stops the user from push the button multiple times
        evt.preventDefault()
        //makes a copy of subtask
        const newSubTask = { ...subTask };
        //Subtask is an object with properties
        //set the property to the new value using bracket notation
        newSubTask[evt.target.id] = evt.target.value;
        //updating state
        setSubTask(newSubTask)
    }

    //function to make a new subTask and saving it to the database
    const createNewSubTask = () => {
        //if else statement alerts a user to add a name if they leave it empty
        if (subTask.name === "") {
            alert("Please enter a SubTask Name")
            //invoke addSubTask passing subTask and taskId  argument.
            //once complete, go back to the task page 
        } else {
            addSubTask(subTask, taskId)
            history.push(`/board/${boardId}/task/${taskId}`);
        }
    };





    //return 1. input fields to for name
    //2. submit button with an onClick calling the CreateNewSubTask function 
    //.3 cancel button that takes the user back to the task they were on. I used the Link to take the back to tasks
    //export SubTaskForm so they can be use on other components
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