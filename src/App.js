import Title from "./components/Title/Title";
import Input from "./components/Input/Input";
import TaskArea from "./components/TaskArea/Tasks";
import React from "react";
import { useState } from "react";
import Modal from "./components/UI/Modal";

//using this as placeholder before switching to mongodb
// let tasks = ["task 1", "task 2", "task 3"];
let tasks = [];

function App() {
	const [allTasks, setAllTasks] = useState(tasks);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [mode, setMode] = useState("");
	const [id, setID] = useState(0);

	console.log(isModalOpen);

	//handle addTask
	const handleAddTask = (addedTask) => {
		console.log(`Task to be added: ${addedTask}`);
		setAllTasks((prevTasks) => {
			return [addedTask, ...prevTasks];
		});
	};

	//handle deleteTask
	const handleDeleteTask = (task) => {
		console.log(`Task to be deleted: ${allTasks[task]}`);
		if (task === null || task === undefined || task === "") {
			setIsModalOpen(false);
			return;
		}

		setAllTasks((prevTasks) => {
			setIsModalOpen(false);
			setAllTasks(allTasks.filter((t) => t !== allTasks[task]));
		});
	};

	//handle editTask
	const handleEditTask = (task, newText) => {
		if (task === null || task === undefined || task === "") {
			return;
		}

		console.log(`Task edited: ${task} -> ${newText}`);
		setAllTasks((prevTasks) => {
			return prevTasks.map((t) => (t === task ? newText : t));
		});
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
			console.log(`Task to be deleted: ${id}`);
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
					onSave={handleEditTask}
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
