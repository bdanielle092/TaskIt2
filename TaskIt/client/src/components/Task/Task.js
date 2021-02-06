import { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, useHistory } from "react-router-dom";

const Task = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const { taskId } = useParams();
    const [board, setBoard] = useState();
    const [task, setTask] = useState([]);

    //5.getting the task by id and return the info in the return 
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
            .then((task) => { setTask(task) });

    });
    return (
        <div>
            <h3>{task.name}</h3>
        </div>
    )
}

export default Task;