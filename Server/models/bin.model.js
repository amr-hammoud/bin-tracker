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
		longitude: {
			type: String,
			trim: true,
		},
		latitude: {
			type: String,
			trim: true,
		},
		group_id: {
			type: String,
			trim: true,
            required: true,
		},
        last_pickup_time: {
            type: String,
            trim: true,
        },
		waste_type: {
			type: String,
			trim: true,
		},
        data: {
            type: Array,
        }
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
