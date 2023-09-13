const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		admins: {
			type: Array,
		},
		members: {
			type: Array,
		},
	},
	{
		timestamps: true,
	}
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
