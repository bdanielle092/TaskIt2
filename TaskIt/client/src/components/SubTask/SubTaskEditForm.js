import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import {
    Card,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

const SubTaskEditForm = (props) => {
    const { getToken } = useContext(UserProfileContext)
    //useParams is the pathname that makes up the url of the browser
    //returns an object of key/value pairs of URL parameters. Use it to access match. params of the current <Route>
    const { boardId, taskId, subTaskId } = useParams()
    const history = useHistory()
    const [subTaskToEdit, setSubTaskToEdit] = useState({
        name: ""
    })

    //getting a single subTask
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
            //.then take that response and turn it into a json response 
            .then((res) => res.json())
            //first subTask is a taco and its a param of the function 
            //setting the state for a single subTask
            .then((subTask) => setSubTaskToEdit(subTask))
    }, [])

    const handleSubmit = (evt) => {
        const newSubTask = { ...subTaskToEdit }
        newSubTask[evt.target.name] = evt.target.value
        setSubTaskToEdit(newSubTask)
    }


    const updateSubTask = (subTask) => {
        getToken()
            .then((token) =>
                fetch(`/api/subTask/${subTaskId}`, {
                    method: "PUT",
                    headers: {
                        //what we are returning the data to the json database
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    // javascript object is being turned to into a string. The SubTask is the javascript object
                    //this allows json database to read the data 
                    body: JSON.stringify(subTask),
                })
            )
            .then((evt) => history.push(`/board/${boardId}/task/${taskId}`));
    };

    //return 1. inputs for name
    //2. Submit Button 
    //3. cancel Button warped in a Link to take the user back to the task
    return (
        <div>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">SubTask Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={subTaskToEdit.name}
                                onChange={(evt) => handleSubmit(evt)} />
                        </FormGroup>
                        <Button
                            color="warning"
                            onClick={(evt) => {
                                evt.preventDefault()
                                updateSubTask(subTaskToEdit)
                            }}>Submit</Button>
                        <Link to={`/board/${boardId}/task/${taskId}`}><Button type="button" color="warning">Cancel</Button></Link>
                    </Form>
                </CardBody>
            </Card>

        </div>

    )
}
export default SubTaskEditForm