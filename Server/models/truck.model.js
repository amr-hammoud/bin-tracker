const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			trim: true,
			index: true,
			unique: true,
			required: true,
		},
		plate_number: {
			type: String,
			trim: true,
            required: true,
		},
		group_id: {
			type: String,
			trim: true,
            required: true,
		},
		driver_id: {
			type: String,
			trim: true,
            required: true,
		},
        last_oil_change: {
            type: String,
            trim: true,
        },
        last_wash: {
            type: String,
            trim: true,
        },
		image: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
