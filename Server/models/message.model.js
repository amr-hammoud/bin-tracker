const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		receiver_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
            required: true,
		},
        sender_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
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
