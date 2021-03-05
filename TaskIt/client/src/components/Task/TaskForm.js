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


const TaskForm = () => {
    const { addTask } = useContext(TaskContext)
    const { board } = useContext(BoardContext)
    const [task, setTask] = useState({ name: "", note: "", priority: 1, isComplete: false, dateTime: "" })
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
    const createNewTask = (evt) => {
        if (task.name === "") {
            alert("Please enter a Task Name")
        } else {
            addTask(boardId, task)
            history.push(`/board/${boardId}`);
        }
    };

    //updateTaskDate = task, then setting the date to current day and time, then updating set task to the updated day and time in the database
    const createDate = () => {
        const updateTaskDate = task
        updateTaskDate["dateTime"] = Date.now()
        setTask(updateTaskDate)
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
                            <select
                                required
                                className="form-control"
                                id="priorityId"
                                value={task.priority}
                                onChange={(evt) => handleSubmit(evt)}>
                                <option value="1">None</option>
                                <option value="2">Low</option>
                                <option value="3">Medium</option>
                                <option value="4">High</option>

                            </select>

                        </FormGroup>
                    </Form>
                    <Button

                        color="warning"
                        onClick={(evt) => {
                            evt.preventDefault();
                            createDate();
                            createNewTask();
                        }}
                    >
                        SUBMIT
                    </Button>
                    <Link to={`/board/${board.id}`}><Button type="button" color="warning">Cancel</Button></Link>
                </CardBody>
            </Card>
        </div>
    )
};
export default TaskForm;