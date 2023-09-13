const UserType = require("../models/user-type.model");

const getUserType = async (req, res) => {
    const userTypes = await UserType.find();
	res.status(200).send(userTypes);
};

const createUserType = async (req, res) => {
	const new_user_type = req.body;

	if (
        new_user_type._id != null &&
		new_user_type.name != null
	) {

		const user_type = new UserType({
			...req.body
		});

		user_type.save();

		res.send(user_type);
	} else {
		res.send(
			"UserType name and _id are required"
		);
	}
};

module.exports = { createUserType, getUserType };