import { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, useHistory } from "react-router-dom";

const Task = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const { id } = useParams();
    const [board, setBoard] = useState();
    const [task, setTask] = useState([]);

    //getting the task by id
    useEffect(() => {
        getToken()
            .then((token) =>

                fetch(`/api/board/${board.id}/task/${id}`, {
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