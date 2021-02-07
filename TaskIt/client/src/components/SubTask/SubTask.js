import { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, useHistory } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Button } from 'reactstrap';



const SubTask = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const { subTaskId } = useParams();
    const [subTasks, setSubTasks] = useState([]);

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


    //1. get the list of subTasks
    useEffect(() => {
        getToken()
            .then((token) =>
                fetch(`/api/subTask/${subTask}`, {
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

    //2. mounting the subTaskList component then passing subTask into that component next go to subTaskList 
    return (
        <div>
            <h3>{subTask.name}</h3>


            <Col className="listOfSubTasks">
                <SubTaskList subTasks={subTasks} />
            </Col>
        </div>
    )

}

export default SubTask