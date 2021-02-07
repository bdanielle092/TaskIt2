import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Col, Row } from 'reactstrap';

const BoardList = ({ boards }) => {
    const history = useHistory();

    //taking user to the edit form   
    const goToBoardEditForm = (boardId) => {
        history.push(`/BoardEditForm/${boardId}`);
    }

    //mapping through the list of boards
    return (
        <div>
            {boards.map((board) => (
                <div key={board.id} >
                    <Row>
                        <Col>
                            <Link to={`/board/${board.id}`}>
                                <strong>{board.name}</strong>
                            </Link>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    {board.name} Actions
                </DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem onClick={() => goToBoardEditForm(board.id)} >Edit {board.name} Board</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Delete {board.name} Board</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                    <Row><br></br></Row>
                </div>
            ))
            }
        </div >
    )
}
export default BoardList 