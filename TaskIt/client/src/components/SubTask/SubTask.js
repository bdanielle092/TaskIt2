import { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, useHistory } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Button, Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import { SubTaskContext } from "../../providers/SubTaskProvider";



const SubTask = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const { getSubTasks } = useContext(SubTaskContext)
    const { subTaskId, taskId, boardId } = useParams();
    const [subTask, setSubTask] = useState({})
    const history = useHistory();
    const [pendingDelete, setPendingDelete] = useState(false);

    //5.getting the subTask by id and returning the info in the return section 
    useEffect(() => {
        getToken()
            .then((token) =>

                fetch(`/api/subTask/${subTaskId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then((subTask) => {
                setSubTask(subTask)

            });

    }, []);

    //taking the user back to the task they are on 
    const goBackToTask = () => {
        history.push(`/board/${boardId}/task/${taskId}`);
    }



    //getting list of subTask on Task
    useEffect(() => {
        getSubTasks(taskId);
    }, []);

    const savePendingDelete = (subTaskId) => {

        getToken().then((token) =>
            fetch(`/api/subTask/${subTaskId}`, {
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(),
            }).then(() => {
                setPendingDelete(false);

            }).then(() => {
                getSubTasks(taskId);

            })
        );
    };

    //2. mounting the subTaskList component then passing subTask into that component next go to subTaskList 
    return (
        <div>
            <h3>{subTask.name}</h3>
            <Button outline color="info" onClick={goBackToTask}>
                Go Back To Task
              </Button>

            <Button
                className="btn btn-danger"
                onClick={(e) => setPendingDelete(true)}
            >
                Delete
            </Button>



            {/* DELETE CONFIRM MODAL */}
            <Modal isOpen={pendingDelete}>
                <ModalHeader>Delete {subTask.name}?</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this subTask? This action cannot be
                    undone.
        </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button className="btn btn-outline-danger" onClick={savePendingDelete}>Yes, Delete</Button>
                </ModalFooter>
            </Modal>


        </div>

    )

}

export default SubTask