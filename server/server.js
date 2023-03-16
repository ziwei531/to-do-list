import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { router as taskRoutes } from "./routes/tasks.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(express.static(path.join(__dirname, "../public")));

const connectToDB = async () => {
	try {
		//connection to mongodb
		console.log(process.env.MONGO_URI);
		const c = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Successfully connected to ${mongoose.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

app.get("/", (req, res) => {
	res.send("Hello World");
});

//write the route like this http://localhost:3000/tasks for the route.rest file
//similarly, if it's app.use("/api/tasks", taskRoutes); then the
//route.rest file will be http://localhost:3000/api/tasks")

app.use("/api/tasks", taskRoutes);

// app.use(
// 	"/api/tasks",
// 	createProxyMiddleware({
// 		target: "http://localhost:5000",
// 		changeOrigin: true,
// 	}),
// 	taskRoutes
// );

// Serve Frontend
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
	});
} else {
	app.get("/", (res, req) => {
		res.send("Not in production.");
	});
}

let port = process.env.PORT || 5000;
connectToDB().then(() =>
	app.listen(port, () => {
		console.log(`This server is listening on port ${port}`);
	})
);
