const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
			trim: true,
			required: true,
		},
		last_name: {
			type: String,
			trim: true,
			required: true,
		},
		username: {
			type: String,
			trim: true,
			index: true,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			index: true,
			unique: true,
			sparse: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
			select:false,
		},
		user_type: {
			type: String,
			trim: true,
			required: true,
		},
		group_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Group",
			trim: true,
		},
		image: {
			type: String,
			trim: true,
		},
		device_id: {
			type: String,
			trim: true,
			unique: true,
			sparse: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
