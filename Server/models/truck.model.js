const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema(
	{
		plate_number: {
			type: String,
			trim: true,
			index: true,
			unique: true,
            required: true,
		},
		group_id: {
			type: String,
			trim: true,
            required: true,
		},
		driver_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
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

const Truck = mongoose.model("Truck", truckSchema);

module.exports = Truck;
