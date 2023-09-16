const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
	{
		record: String,
	},
	{
		timestamps: true,
	}
);

const userSchema = new mongoose.Schema(
	{
		custom_id: {
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
		data: [dataSchema],
	},
	{
		timestamps: true,
	}
);

const Bin = mongoose.model("bins", userSchema);

module.exports = Bin;
