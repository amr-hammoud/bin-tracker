const express = require("express");
const http = require("http");
const mongooseConnect = require("./configs/mongoDB.connect");
const cors = require("cors");
const { initializeSocketIo } = require("./socketio.config")
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = initializeSocketIo(server);

app.io = io;

app.use(cors());
app.use(express.json());

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.routes");
app.use("/users", userRouter);

const groupRouter = require("./routes/group.routes");
app.use("/groups", groupRouter);

const userTypeRouter = require("./routes/user-type.routes");
app.use("/user-types", userTypeRouter);

const binRouter = require("./routes/bin.routes");
app.use("/bins", binRouter);

const truckRouter = require("./routes/truck.routes");
app.use("/trucks", truckRouter);

const messageRouter = require("./routes/message.routes");
app.use("/messages", messageRouter);

const announcementRouter = require("./routes/announcement.routes");
app.use("/announcements", announcementRouter);

const analyticsRouter = require("./routes/analytics.routes");
app.use("/analytics", analyticsRouter);


server.listen(8000, (err) => {
	if (err) {
		console.error("\u001b[1;34m⚡[server]: " + `\u001b[0m${err}`);
		return;
	}
	console.log(
		"\u001b[1;34m⚡[server]: " +
			`\u001b[0mApp Running on http://localhost:${8000}`
	);
	mongooseConnect();
});

module.exports = server;