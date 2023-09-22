const Message = require("../models/message.model");

const sendChatMessage = async (req, res) => {
	const message = req.body;

	if (
		message.receiver_id !== undefined &&
		message.content !== undefined &&
		message.receiver_id.toString().trim() !== "" &&
		message.content.toString().trim() !== ""
	) {
		try {
			const new_message = new Message({
				...req.body,
				sender_id: req.user._id,
			});

			await new_message.save();

			res.status(200).send(new_message);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal server error");
		}
	} else {
		res.status(400).send(
			"receiver_id and content are required and should not be empty"
		);
	}
};

module.exports = { sendChatMessage };
