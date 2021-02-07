import { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, useHistory } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Button } from 'reactstrap';



const SubTask = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const { subTaskId } = useParams();
    const [subTask, setSubTask] = useState("")

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




    //2. mounting the subTaskList component then passing subTask into that component next go to subTaskList 
    return (
        <div>
            <h3>{subTask.name}</h3>

        </div>
    )

}

export default SubTask