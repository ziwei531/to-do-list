import React from "react";
import styles from "./Tasks.module.css";
import Container from "../UI/Container";

function Tasks(props) {
	return (
		<>
			<div className={styles["task-header"]}>
				<h1 className={styles.header}>Tasks</h1>
			</div>

			<ul className={styles.task}>
				{props.tasks.length === 0 ? (
					<Container>
						<p className={styles["empty-tasks"]}>
							No available task data. Start adding your tasks now :)
						</p>
					</Container>
				) : (
					props.tasks.map((task) => (
						<div key={task} className={styles["task-container"]}>
							<li className={styles["task-desc"]}>{task}</li>
							<div className="task-btns">
								<button
									className={`${styles["edit-btn"]} ${styles.btn}`}
									onClick={props.onEditTasks}
								>
									Edit Task
								</button>
								<button
									className={`${styles["delete-btn"]} ${styles.btn}`}
									onClick={props.onClearTasks}
								>
									Delete Task
								</button>
							</div>
						</div>
					))
				)}
			</ul>
		</>
	);
}

export default Tasks;
