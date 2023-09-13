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

module.exports = { createGroup };