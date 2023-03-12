import styles from "./Input.module.css";
import { useState } from "react";
import React from "react";

function Input(props) {
	const [enteredValue, setEnteredValue] = useState("");
	const [isValid, setIsValid] = useState(true);

	const valueChangeHandler = (event) => {
		setEnteredValue(event.target.value);
		if (event.target.value.trim().length > 0) {
			setIsValid(true);
		}
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();
		if (enteredValue.trim().length === 0) {
			setIsValid(false);
			console.error("Error occured due to invalid input");
			return;
		}

		console.log(`Form submitted: ${enteredValue}`);
		setEnteredValue("");
		props.onAddTask(enteredValue);
	};

	return (
		<>
			<form autoComplete="off" onSubmit={formSubmitHandler}>
				<div className={styles.container}>
					<input
						type="text"
						placeholder="Enter a task"
						required
						value={enteredValue}
						onChange={valueChangeHandler}
					/>
					<button className={styles["input-btn"]} type="submit">
						Add Task
					</button>
					{!isValid && (
						<p className={styles["error-text"]}>Please enter a valid task</p>
					)}
				</div>
			</form>
		</>
	);
}

export default Input;
