const Announcement = require("../models/announcement.model");

const sendAnnouncement = async (req, res) => {
	const announcement = req.body;
	console.log(announcement);

	if (
		announcement.group_id !== undefined &&
		announcement.content !== undefined &&
		announcement.group_id.toString().trim() !== "" &&
		announcement.content.toString().trim() !== ""
	) {
		try {
			const new_announcement = new Announcement({
				...req.body,
				sender_id: req.user._id,
			});

			await new_announcement.save();
			const responseMessage = await Announcement.findById(new_announcement._id).populate("sender_id");
			req.app.io.to(announcement.group_id).emit("receive_message", responseMessage);

			res.status(200).send(new_announcement);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal server error");
		}
	} else {
		res.status(400).send(
			"group_id and content are required and should not be empty"
		);
	}
};

const getAnnouncements = async (req, res) => {
	const { group_id } = req.params;

	try {
		const announcements = await Announcement.find({ group_id: group_id })
			.sort({ createdAt: 1 })
			.populate("sender_id");
		res.status(200).send(announcements);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};

module.exports = { sendAnnouncement, getAnnouncements };
