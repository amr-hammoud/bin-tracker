const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
	{
		group_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Group',
            required: true,
		},
        sender_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
            required: true,
		},
        content: {
			type: String,
            required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
