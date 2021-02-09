import { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, useHistory } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Button } from 'reactstrap';
import "./Board.css";
import TaskList from "../Task/TaskList";
import { TaskContext, TaskProvider } from "../../providers/TaskProvider";





const Board = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const { getTasks, tasks } = useContext(TaskContext)
    const { boardId } = useParams();
    const history = useHistory();
    //setting the state of board and then updating the state of board
    const [board, setBoard] = useState([]);




    //getting the board by id 
    useEffect(() => {
        getToken()
            .then((token) =>

                fetch(`/api/board/${boardId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then((board) => { setBoard(board) });

    }, []);


    //getting the all the tasks for the board the user is on 
    //1. get the list of tasks
    useEffect(() => {
        getTasks(boardId);
    }, []);



    //taking the user back to the home page
    const goBackHome = () => {
        history.push(`/`);
    }
    //taking the user to the task form 
    const goToTaskForm = () => {
        history.push(`/board/${boardId}/TaskForm`);
    }


    //2. mounting the taskList component then passing task into that component next  go to taskList 
    return (
        <div>
            <h3 className="BoardName">{board.name} Board</h3>
            <Button outline color="info" onClick={goBackHome}>
                Go Home
              </Button>

            <Button onClick={goToTaskForm}>New Task</Button>

            <Col className="listOfTasks">
                <TaskList tasks={tasks} />
            </Col>


        </div>

    )
}
export default Board