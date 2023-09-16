const express = require("express");
const app = express();
const mongooseConnect = require("./configs/mongoDB.connect");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const authRouter = require("./routes/auth.routes")
app.use("/auth", authRouter)

const groupRouter = require("./routes/group.routes")
app.use("/groups", groupRouter)

const userTypeRouter = require("./routes/user-type.routes")
app.use("/user-types", userTypeRouter)

const binRouter = require("./routes/bin.routes")
app.use("/bins", binRouter)

app.listen(8000, (err) => {
	if (err) {
		console.error("\u001b[1;34m⚡[server]: " + `\u001b[0m${err}`);
		return;
	}
	console.log("\u001b[1;34m⚡[server]: " + `\u001b[0mApp Running on http://localhost:${8000}`);
	mongooseConnect();
});
