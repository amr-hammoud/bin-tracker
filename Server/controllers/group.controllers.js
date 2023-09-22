const Group = require("../models/group.model");

const createGroup = async (req, res) => {
	const new_group = req.body;

	if (
		new_group.name != null
	) {

		const group = new Group({
			...req.body
		});

		group.save();

		res.send(group);
	} else {
		res.send(
			"group name is required"
		);
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

module.exports = { createGroup, getAllGroups, deleteGroup };