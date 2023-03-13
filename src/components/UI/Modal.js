import React from "react";
import styles from "./Modal.module.css";
import { useState, useEffect } from "react";

function Modal(props) {
	const [editedText, setEditedText] = useState("");
	let taskID = props.taskID;

	const handleChange = (e) => {
		setEditedText(e.target.value);
	};

	const deleteColor = {
		backgroundColor: "red",
		color: "white",
		border: "none",
		padding: "10px 20px",
		borderRadius: "5px",
		cursor: "pointer",
	};

	const editColor = {
		backgroundColor: "blue",
		color: "white",
		border: "none",
		padding: "10px 20px",
		borderRadius: "5px",
		cursor: "pointer",
	};

	return (
		<div className={styles.modal}>
			<div className={styles["modal-content"]}>
				{props.mode === "edit" ? (
					<div className={styles["edit-container"]}>
						<p>Edit your item here</p>
						<input
							className={styles["input-field"]}
							type="text"
							value={editedText}
							onChange={handleChange}
							onKeyPress={(event) => {
								if (event.key === "Enter") {
									props.onEdit(taskID, editedText);
								}
							}}
						/>
						<button
							style={editColor}
							onClick={() => props.onEdit(taskID, editedText)}
						>
							Edit
						</button>
						<button onClick={props.onCancel} className={styles.cancel}>
							Cancel
						</button>
					</div>
				) : (
					<div className={styles["delete-container"]}>
						{props.tasks.map((task, index) => {
							if (index === taskID) {
								return <p>{`Are you sure you want to delete "${task}"?`}</p>;
							}
						})}

						<button style={deleteColor} onClick={() => props.onDelete(taskID)}>
							Delete
						</button>
						<button onClick={props.onCancel} className={styles.cancel}>
							Cancel
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Modal;
