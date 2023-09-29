const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
	{
		record: String,
	},
	{
		timestamps: true,
	}
);

const collectionHistorySchema = new mongoose.Schema(
	{
		collected: Boolean
	},
	{
		timestamps: true,
	}
);

const userSchema = new mongoose.Schema(
	{
		name: {
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
		waste_type: {
			type: String,
			trim: true,
		},
		data: [dataSchema],
		collection_history: [collectionHistorySchema],
	},
	{
		timestamps: true,
	}
);

const Bin = mongoose.model("bins", userSchema);

module.exports = Bin;
