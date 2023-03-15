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
					//removed index (task, index)
					props.tasks.map((task) => (
						<div key={task._id} className={styles["task-container"]}>
							<li className={styles["task-desc"]}>{task.task}</li>
							<div className="task-btns">
								<button
									className={`${styles["edit-btn"]} ${styles.btn}`}
									onClick={() => props.onMode("edit", task._id)}
								>
									Edit Task
								</button>
								<button
									className={`${styles["delete-btn"]} ${styles.btn}`}
									onClick={() => props.onMode("delete", task._id)}
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
