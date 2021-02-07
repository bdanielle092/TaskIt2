import { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, useHistory } from "react-router-dom";
import { Button, Col, ButtonGroup, Form, Input } from 'reactstrap';
import SubTask from "../SubTask/SubTask";
import SubTaskList from "../SubTask/SubTaskList";

const Task = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const { taskId } = useParams();
    const { boardId } = useParams();
    const [board, setBoard] = useState();
    const [task, setTask] = useState([]);
    const [cSelected, setCSelected] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    //this is setting the inputBox to false so you won't see any box to edit or delete the notes
    const [showInputBox, setShowInputBox] = useState(false);
    //this is setting the notes to an empty string which will be changed in useEffected 
    const [notes, setNotes] = useState("");
    const [name, setName] = useState("");
    const history = useHistory();
    const [subTasks, setSubTasks] = useState();
    const { subTask, setSubTask } = useState();

    //Priority
    const onCheckboxBtnClick = (selected) => {
        const index = cSelected.indexOf(selected);
        if (index < 0) {
            cSelected.push(selected);
        } else {
            cSelected.splice(index, 1);
        }
        setCSelected([...cSelected]);
    }

    //5.getting the task by id and returning the info in the return section 
    useEffect(() => {
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
            .then((task) => {
                setTask(task)
                setNotes(task.notes)
                setName(task.name)
                setRSelected(task.priorityId)
            });

    }, []);


    //is toggling between showing the input box and not showing it when you change the notes, the !showInputBox does the opposite of the setShowInputBox
    const handelInputDisplay = () => {
        setShowInputBox(!showInputBox);

    }

    //updating notes value. Updates the notes value on every key stroke for the input field
    const handleSubmit = (evt) => {
        if (evt.target.name === "notes") {
            const newNotes = evt.target.value;
            setNotes(newNotes);
        } else if (evt.target.name === "name") {
            const newName = evt.target.value;
            setName(newName)
        }
    };

    //updating task with the changes for notes 
    const updateTask = () => {
        const newTask = task
        newTask["boardId"] = boardId
        newTask["notes"] = notes
        //  I want you to update the name to the new name I just changed it too.
        newTask["name"] = name
        console.log(newTask)
        getToken()
            .then((token) =>
                fetch(`/api/Board/${boardId}/task/${taskId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(
                        newTask
                    ),
                })
            )
            .then((evt) => handelInputDisplay());
    };

    //Delete a Task
    // const deleteTask = () => {
    //     getToken()
    //     .then((token) =>
    //     fetch(`api/board/${task.boardId}/task/${taskId}`, {
    //       method: "DELETE",
    //       headers: {
    //               Authorization: `Bearer ${token}`
    //       }
    //     }))
    //     //get all the task or go back to the board they were on 
    //     .then();
    // }

    //taking the user back to the board they are on 
    const goBackToBoard = () => {
        history.push(`/board/${boardId}`);
    }


    //1. get the list of subTasks
    useEffect(() => {
        getToken()
            .then((token) =>
                fetch(`/api/subTask/task/${taskId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                })
            )
            .then((res) => res.json())
            .then((subTasks) =>

                setSubTasks(subTasks));

    }, []);
    if (!subTasks) {
        return null;
    }


    return (
        <div>

            {
                showInputBox ?

                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(evt) => {
                            evt.preventDefault()
                            handleSubmit(evt)
                        }} />
                    : <h3>{task.name}</h3>


            }

            <Button outline color="info" onClick={goBackToBoard}>
                Go Back
              </Button>
            <h4>Notes</h4>
            { showInputBox ?
                <>
                    <Input
                        id="notes"
                        type="text"
                        name="notes"
                        value={notes}
                        onChange={(evt) => {
                            evt.preventDefault()
                            handleSubmit(evt)
                        }} />

                    <Button color="warning" size="sm" onClick={(evt) => { evt.preventDefault(); updateTask() }}> save </Button>
                </>
                : <div> <p>{task.notes}</p>  <Button color="warning" size="sm" onClick={handelInputDisplay}>Edit</Button></div>}



            <h4>Subtask</h4>
            <Col className="listOfSubTasks">
                <SubTaskList subTasks={subTasks} boardId={task.boardId} />
            </Col>

            <h5>Priority</h5>

            <ButtonGroup>
                <Button color="primary" onClick={() => setRSelected(1)} active={rSelected === 1}>none</Button>
                <Button color="primary" onClick={() => setRSelected(2)} active={rSelected === 2}>low</Button>
                <Button color="primary" onClick={() => setRSelected(3)} active={rSelected === 3}>medium</Button>
                <Button color="primary" onClick={() => setRSelected(4)} active={rSelected === 4}>high</Button>
            </ButtonGroup>
            <p>Selected: {rSelected}</p>

            <h4>Date Created: {task.dateCreated}</h4>

            {/* <Button color="danger" onClick={(e) => {e.preventDefault() deleteTask(taskToDelete); }} >Delete {task.name}</Button> */}
        </div>

    )
}

export default Task;