import React, { useContext } from "react";
import { SubTaskContext } from "../../providers/SubTaskProvider";

const SubTask = ({ props }) => {
    const { subTask } = useContext(SubTaskContext)

    return (
        <h3>{subTask.name} SubTask</h3>
    )
}
export default SubTask;