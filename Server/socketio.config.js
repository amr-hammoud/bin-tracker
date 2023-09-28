const { Server } = require("socket.io");
const { sendAnnouncement } = require("./controllers/announcement.controllers");


function initializeSocketIo(server) {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log(`Socket ${socket.id} connected`);

		socket.on("join_announcements_channel", (group) => {
			socket.join(group.group);
			socket.emit(
				"joined_announcements_channel",
				`joined the group ${group.group}`
			);
		});

		socket.on("disconnect", () => {
			console.log(`Socket ${socket.id} disconnected`);
		});
	});

	return io;
}

module.exports = {initializeSocketIo};
