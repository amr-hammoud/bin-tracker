const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
	{
		members: {
			type: Array,
		},
        type: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
