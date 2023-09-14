const mongoose = require("mongoose");

const conversationTypeSchema = new mongoose.Schema(
	{
		name: {
			type: Array,
		},
	},
	{
		timestamps: true,
	}
);

const conversationType = mongoose.model("ConversationType", conversationType);

module.exports = conversationType;
