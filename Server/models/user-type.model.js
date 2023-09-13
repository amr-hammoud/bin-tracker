const mongoose = require("mongoose");

const userTypeSchema = new mongoose.Schema(
	{
        _id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const UserType = mongoose.model("UserType", userTypeSchema);

module.exports = UserType;
