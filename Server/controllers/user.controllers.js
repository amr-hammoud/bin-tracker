const User = require("../models/user.model");

const getUser = async (req, res) => {
	if (req.params.id) {
		const user = await User.findById(req.params.id);
		res.status(200).send(user);
	} else {
		const users = await User.find();
		res.status(200).send(users);
	}
};

const getGroupUser = async (req, res) => {
	if (req.params.id) {
		const user = await User.findById(req.params.id);
		if (req.user.group_id === user.group_id) {
			res.status(200).send(user);
		} else {
			es.status(401).send({ message: "Unauthorized" });
		}
	} else {
		const users = await User.find({ group_id: req.user.group_id });
		res.status(200).send(users);
	}
};

const updateUser = async (req, res) => {
	const user_data = req.body;
	const user_id = req.params.id;

	try {
		let user;

		if (user_id) {
			user = await User.findById(user_id);

			if (!user) {
				return res.status(404).send("User not found");
			}
		}

		for (const key in user_data) {
			if (user_data.hasOwnProperty(key)) {
				user[key] = user_data[key];
			}
		}
		await user.save();

		return res.send(user);
	} catch (error) {
		console.error("Error creating/updating user:", error);
		return res.status(500).send("Internal server error");
	}
};

const deleteUser = async (req, res) => {
	const id = req.params.id;
	await User.deleteOne({ _id: id });
	res.status(200).send("User deleted successfully");
};

module.exports = { getUser, updateUser, deleteUser, getGroupUser };
