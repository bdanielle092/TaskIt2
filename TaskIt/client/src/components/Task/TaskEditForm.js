import { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { Button, Col, ButtonGroup, Form, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SubTask from "../SubTask/SubTask";
import SubTaskList from "../SubTask/SubTaskList";
import { TaskContext } from "../../providers/TaskProvider";
import BoardForm from "../Board/BoardForm";




const TaskEditForm = () => {
    const { getToken } = useContext(UserProfileContext);
    const { getTasks, tasks } = useContext(TaskContext);
    const { taskId } = useParams();
    const { boardId } = useParams();
    //this is setting the inputBox to false so you won't see any box to edit or delete the notes
    const [showInputBox, setShowInputBox] = useState(false);
    //this is setting the notes to an empty string which will be changed in useEffected 
    const [notes, setNotes] = useState("");
    const [name, setName] = useState("");
    const history = useHistory();




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

    //updating task with the changes for notes and name 
    const updateTask = () => {
        const newTask = task
        newTask["boardId"] = boardId
        newTask["notes"] = notes
        //  I want you to update the name to the new name I just changed it too.
        newTask["name"] = name

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


}

export default TaskEditForm 