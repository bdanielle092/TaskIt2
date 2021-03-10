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

//defining the taskForm and not passing anything
const TaskForm = () => {
    //brining in the add function from TaskContext using useContext
    const { addTask } = useContext(TaskContext)
    //we bringing in board object to get the properties of a board 
    const { board } = useContext(BoardContext)
    //task is the state of the object and setTask allow us to update the Task
    //useState I am saying the state of the task is an empty string
    const [task, setTask] = useState({ name: "", note: "", priorityId: 1, isComplete: false, dateTime: "" })
    //useParams gets the boardId from application views
    const { boardId } = useParams();
    //useHistory allows us to undo/redo and change or navigate to different pages
    //ex. history.push takes the user back to the board page
    const history = useHistory();


    //getting the boardId 
    const createBoardId = () => {
        const newTask = task
        newTask["boardId"] = boardId
        //updating the newTask
        setTask(newTask);
    }

    //useEffect for createBoardId function 
    useEffect(() => {
        createBoardId();
    }, [])


    //this is updating the task and setting it as the new task and parsing the priority
    //The parseInt function converts its first argument to a string, parses that string, then returns an integer or NaN
    const handleSubmit = (evt) => {
        //stops the user from pushing the button multiply times
        evt.preventDefault()
        //making a copy of task called newTask
        const newTask = { ...task };
        //newTask id equal value
        newTask[evt.target.id] = evt.target.value;
        //paring the priorityId so I comes back as a number and not a string
        newTask.priorityId = parseInt(newTask.priorityId)
        //updating the newTask
        setTask(newTask);

    }
    //this is creating the new task in the database then taking us back to the board we are currently on 
    const createNewTask = (evt) => {
        //if else statement to make sure they enter a name
        if (task.name === "") {
            alert("Please enter a Task Name")

        } else {
            //invoke addTask passing boardId and task as an argument.
            //once complete, go back to the board page 
            addTask(boardId, task)
            history.push(`/board/${boardId}`);
        }
    };

    //function for createDate
    const createDate = () => {
        //updateTaskDate = task
        const updateTaskDate = task
        //then setting the date to current day and time
        updateTaskDate["dateTime"] = Date.now()
        //then updating set task to the updated day and time in the database
        setTask(updateTaskDate)
    }

    //return 1. input fields to for name, notes, and priority
    //2. submit button with an onClick calling the createDate and CreateNewTask function 
    //.3 cancel button that takes the user back to the board they were on. I used the Link to take the back to boards
    //export BoardForm so they can be use on other components
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
                                value={task.priorityId}
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