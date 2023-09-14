const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		conversation_id: {
			type: String,
            required: true,
		},
        sender_id: {
			type: String,
            required: true,
		},
        content: {
			type: String,
            required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
