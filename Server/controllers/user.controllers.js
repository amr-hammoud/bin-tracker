const User = require("../models/user.model");
const Group = require("../models/group.model");

const getUser = async (req, res) => {
	const user_type = req.user.user_type;
	if (user_type === "1") {
		if (req.params.id) {
			const user = await User.findById(req.params.id).populate(
				"group_id"
			);
			res.status(200).send(user);
		} else {
			const users = await User.find().populate("group_id");
			res.status(200).send(users);
		}
	} else if (user_type === "2") {
		if (req.params.id) {
			const users = await User.find({ group_id: req.user.group_id });
			const userList = users.filter((user) => {
				return user._id.equals(req.user._id);
			});
			if (userList.length > 0) {
				const user = userList[0];
				res.status(200).send(user);
			} else {
				res.status(200).send(users);
			}
		} else {
			res.status(422).send("ID Required");
		}
	} else if (user_type === "3") {
		if (req.params.id) {
			const users = await User.find({ group_id: req.user.group_id });
			const userList = users.filter((user) => {
				return user._id.equals(req.user._id);
			});
			if (userList.length > 0) {
				const user = userList[0];
				res.status(200).send(user);
			} else {
				res.status(404).send("User Not Found");
			}
		} else {
			res.status(422).send("ID Required");
		}
	}
};

const updateProfile = async (req, res) => {
	const user_data = req.body;
	const user_id = req.user._id;
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

		await user.save();
		return res.send(user);
	} catch (error) {
		console.error("Error updating profile:", error);
		return res.status(500).send("Internal server error");
	}
};

const updateImage = async (req, res) => {
	const image_data = req.body;
	const user_id = req.user._id;

	try {
		let user;

		if (user_id) {
			user = await User.findById(user_id);

			if (!user) {
				return res.status(404).send("User not found");
			}
		}

		user.image = image_data.image;

		await user.save();
		return res.send(user);
	} catch (error) {
		console.error("Error updating profile:", error);
		return res.status(500).send("Internal server error");
	}
};

const getGroupUser = async (req, res) => {
	if (req.params.id) {
		const user = await User.findById(req.params.id).populate("group_id");
		if (req.user.group_id === user.group_id) {
			res.status(200).send(user);
		} else {
			res.status(401).send({ message: "Unauthorized" });
		}
	} else {
		const users = await User.find({ group_id: req.user.group_id }).populate(
			"group_id"
		);
		res.status(200).send(users);
	}
};

const getGroupDrivers = async (req, res) => {
	try {
		const groupUsers = await User.find({
			group_id: req.user.group_id,
			user_type: "3",
		});

		res.status(200).send(groupUsers);
	} catch (error) {
		console.error("Error fetching group drivers:", error);
		res.status(500).send("Internal server error");
	}
};

const updateUser = async (req, res) => {
	const user_data = req.body;
	const user_id = req.user.id;

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

module.exports = {
	getUser,
	updateUser,
	deleteUser,
	getGroupUser,
	getGroupDrivers,
	updateProfile,
	updateImage,
};
