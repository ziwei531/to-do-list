import Title from "./components/Title/Title";
import Input from "./components/Input/Input";
import TaskArea from "./components/TaskArea/Tasks";
import React from "react";
import { useState } from "react";

//using this as placeholder before switching to mongodb
let tasks = [];

function App() {
	const [allTasks, setAllTasks] = useState(tasks);

	const handleAddTask = (addedTask) => {
		console.log(`Task to be added: ${addedTask}`);
		setAllTasks((prevTasks) => {
			return [addedTask, ...prevTasks];
		});
	};
	// <Title /> <-- title here
	// <Input Area /> <-- inputting here
	// <Tasks Area/> <-- displaying of the tasks here
	return (
		<>
			<Title />
			<Input onAddTask={handleAddTask} />
			<TaskArea tasks={allTasks} />
		</>
	);
}

export default App;
