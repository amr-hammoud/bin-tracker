const User = require("../models/user.model");
const Group = require("../models/group.model");

const getUser = async (req, res) => {
	if (req.params.id) {
		const user = await User.findById(req.params.id).populate("group_id");
		res.status(200).send(user);
	} else {
		const users = await User.find().populate("group_id");
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
				user[key] = user_data[key] ? user_data[key] : user[key];
			}
		}

		if (user_data.user_type !== undefined) {
			user.user_type = user_data.user_type;
		}

		if (user_data.group_id !== undefined) {
			const previousGroup = user.group_id;

			user.group_id = user_data.group_id;

			if (
				previousGroup &&
				previousGroup.toString() !== user_data.group_id
			) {
				const previousGroupDoc = await Group.findById(previousGroup);
				if (previousGroupDoc) {
					previousGroupDoc.admins = previousGroupDoc.admins.filter(
						(adminId) => adminId.toString() !== user_id
					);
					previousGroupDoc.members = previousGroupDoc.members.filter(
						(memberId) => memberId.toString() !== user_id
					);

					await previousGroupDoc.save();
				}
			}

			if (user.user_type === "2" && user.group_id) {
				const group = await Group.findById(user.group_id);
				if (group) {
					group.admins.push(user._id);
					await group.save();
				}
			} else if (user.user_type === "3" && user.group_id) {
				const group = await Group.findById(user.group_id);
				if (group) {
					group.members.push(user._id);
					await group.save();
				}
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

	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).send("User not found");
		}

		const { user_type, group_id } = user;

		if (user_type === "2" && group_id) {
			const group = await Group.findById(group_id);

			if (group) {
				group.admins = group.admins.filter(
					(adminId) => adminId.toString() !== id
				);
				await group.save();
			}
		} else if (user_type === "3" && group_id) {
			const group = await Group.findById(group_id);

			if (group) {
				group.members = group.members.filter(
					(memberId) => memberId.toString() !== id
				);
				await group.save();
			}
		}

		await User.deleteOne({ _id: id });
		res.status(200).send("User deleted successfully");
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = { getUser, updateUser, deleteUser, getGroupUser };
