import Title from "./components/Title/Title";
import Input from "./components/Input/Input";
import TaskArea from "./components/TaskArea/Tasks";
import React from "react";
import { useState, useEffect } from "react";
import Modal from "./components/UI/Modal";

//using this as placeholder before switching to mongodb
// let tasks = ["task 1", "task 2", "task 3"];
//let tasks = [];

function App() {
	const [allTasks, setAllTasks] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [mode, setMode] = useState("");
	const [id, setID] = useState("");

	//first mount
	useEffect(() => {
		fetch("https://sore-jade-spider-sock.cyclic.app/api/tasks")
			.then((res) => res.json())
			.then((data) => {
				setAllTasks(data);
			})
			.catch((err) => console.log("Error fetching data: ", err));
	}, []);

	//check api every 500ms
	useEffect(() => {
		const timer = setTimeout(() => {
			fetch("https://sore-jade-spider-sock.cyclic.app/api/tasks")
				.then((res) => res.json())
				.then((data) => {
					setAllTasks(data);
				})
				.catch((err) => console.log("Error fetching data: ", err));
		}, 500); // delay the API call by 500ms

		return () => clearTimeout(timer); // clear the timer on unmount
	}, [allTasks]); // pass allTasks as a dependency

	//handle addTask
	const handleAddTask = (addedTask) => {
		console.log(`Task to be added: ${addedTask}`);

		fetch("https://sore-jade-spider-sock.cyclic.app/api/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ task: addedTask }),
		})
			.then((res) => res.json())
			.catch((err) => console.log("Error adding task: ", err));

		setAllTasks((prevTasks) => {
			const newTasks = [addedTask, ...prevTasks];
			return newTasks;
		});
	};

	//handle deleteTask
	const handleDeleteTask = (task) => {
		console.log(`Task to be deleted: ${task}`);
		if (task === null || task === undefined || task === "") {
			setIsModalOpen(false);
			return;
		}

		fetch(`https://sore-jade-spider-sock.cyclic.app/api/tasks/${task}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ _id: task }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Data's ID that is to be deleted: ", data);
				setAllTasks((prevTasks) => {
					setIsModalOpen(false);
					setAllTasks(prevTasks.filter((t) => t !== task));
					// setAllTasks(allTasks.filter((t) => t !== allTasks[task]));
				});
			})
			.then(() => console.log(`${JSON.stringify(allTasks)}`))
			.catch((err) => console.log("Error deleting task: ", err));
	};

	//handle editTask
	const handleEditTask = (task, newTask) => {
		console.log(`Task to be edited: ${task}`);
		if (task === null || task === undefined || task === "") {
			return;
		}

		console.log(`New Text -> ${newTask}`);
		fetch(`https://sore-jade-spider-sock.cyclic.app/api/tasks/${task}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ task: newTask }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error in updating new task");
				} else {
					setIsModalOpen(false);
					return response.json();
				}
			})
			.catch((err) => console.log("Error editing task: ", err));

		// setAllTasks((prevTasks) => {
		// 	return prevTasks.map((t, index) => {
		// 		if (index === task) {
		// 			setIsModalOpen(false);
		// 			return newText;
		// 		} else {
		// 			setIsModalOpen(false);
		// 			return t;
		// 		}
		// 	});
		// });
	};

	//handle mode
	const handleMode = (mode, id) => {
		if (mode === null || mode === undefined || mode === "") {
			setMode("");
			isModalOpen(false);
			return;
		}

		if (mode === "delete") {
			setMode("delete");
			console.log(`Within App.js, Task to be deleted: ${id}`);
			setID(id);
			setIsModalOpen(true);
		} else {
			setMode("edit");
			setID(id);
			setIsModalOpen(true);
		}
	};

	return (
		<>
			{isModalOpen && (
				<Modal
					mode={mode}
					onDelete={handleDeleteTask}
					onEdit={handleEditTask}
					taskID={id}
					onCancel={() => {
						setIsModalOpen(false);
					}}
					tasks={allTasks}
				/>
			)}
			<Title />
			<Input onAddTask={handleAddTask} />
			<TaskArea tasks={allTasks} onMode={handleMode} />
		</>
	);
}

export default App;
