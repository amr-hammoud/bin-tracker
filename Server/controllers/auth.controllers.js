const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
const Group = require("../models/group.model");

const login = async (req, res) => {
	const { email, username, password } = req.body;
	try {
		const user = await User.findOne({
			$or: [{ email }, { username }],
		}).select('+password -image');
		if (!user)
			return res
				.status(404)
				.send({ message: "Email/username or password incorrect" });

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid)
			return res
				.status(404)
				.send({ message: "Email/username or password incorrect" });

		const { password: hashedPassword, ...userInfo } = user.toJSON();
		const token = jwt.sign(userInfo, process.env.JWT_SECRET);

		res.status(200).send({
			token,
			user: userInfo,
		});
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).send({ message: "An error occurred during login." });
	}
};

const register = async (req, res) => {
	const new_user = req.body;

	if (
		new_user.first_name != null &&
		new_user.last_name != null &&
		new_user.username != null &&
		new_user.password != null &&
		new_user.user_type != null
	) {
		const { password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			...req.body,
			password: hashedPassword,
		});

		try {
			await user.save();
			const { user_type, group_id } = new_user;

			if (user_type === "2" && group_id) {
				const group = await Group.findById(group_id);

				if (group) {
					group.admins.push(user._id);
					await group.save();
				}
			} else if (user_type === "3" && group_id) {
				const group = await Group.findById(group_id);

				if (group) {
					group.members.push(user._id);
					await group.save();
				}
			}

			res.status(200).send(user);
		} catch (err) {
			res.status(500).send(err);
		}
	} else {
		res.send(
			"first_name, last_name, username, password, group_id and user_type are required"
		);
	}
};

const verify = (_, res) => {
	res.send("Verified");
};

module.exports = { login, register, verify };
