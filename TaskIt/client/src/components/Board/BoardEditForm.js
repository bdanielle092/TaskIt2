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

const BoardEditForm = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const { boardId } = useParams()
    const history = useHistory()
    const [boardToEdit, setBoardToEdit] = useState({
        name: ""
    })

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
            .then((board) => setBoardToEdit(board))
    }, [])


    const handleSubmit = (evt) => {
        const newBoard = { ...boardToEdit }
        newBoard[evt.target.name] = evt.target.value
        setBoardToEdit(newBoard)
    }


    const updateBoard = (board) => {
        getToken()
            .then((token) =>
                fetch(`/api/board/${boardId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(board),
                })
            )
            .then((evt) => history.push("/"));
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Board Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={boardToEdit.name}
                                onChange={(evt) => handleSubmit(evt)} />
                        </FormGroup>
                        <Button
                            color="warning"
                            onClick={(evt) => {
                                evt.preventDefault()
                                updateBoard(boardToEdit)
                            }}>Submit</Button>
                        <Link to={`/`}><Button type="button" color="warning">Cancel</Button></Link>
                    </Form>
                </CardBody>

            </Card>
        </div>
    )

}
export default BoardEditForm