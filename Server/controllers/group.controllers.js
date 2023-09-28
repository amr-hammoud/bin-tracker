const Group = require("../models/group.model");

const createOrUpdateGroup = async (req, res) => {
	const group_data = req.body;
	const group_id = req.params.id;

	try {
		let group;

		if (group_id) {
			group = await Group.findById(group_id);

			if (!group) {
				return res.status(404).send("Group not found");
			}
		} else {
			group = new Group();
		}

		for (const key in group_data) {
			if (group_data.hasOwnProperty(key)) {
				group[key] = group_data[key];
			}
		}
		await group.save();

		return res.send(group);
	} catch (error) {
		console.error("Error creating/updating group:", error);
		return res.status(500).send("Internal server error");
	}
};

const getAllGroups = async (req, res) => {
	const groups = await Group.find();
	res.status(200).send(groups);
}

const deleteGroup = async (req, res) => {
	const id = req.params.id;
	await Group.deleteOne({ _id: id});
	res.status(200).send("Group deleted successfully")
}

module.exports = { createOrUpdateGroup, getAllGroups, deleteGroup };