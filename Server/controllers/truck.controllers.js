const Truck = require("../models/truck.model");

const getTruck = async (req, res) => {
	if (req.params.id) {
		const truck = await Truck.findById(req.params.id);
		res.status(200).send(truck);
	} else {
		const trucks = await Truck.find({group_id: req.user.group_id}).populate('driver_id');
		res.status(200).send(trucks);
	}
};

const createOrUpdateTruck = async (req, res) => {
	const truck_data = req.body;
	const truck_id = req.params.id;

	try {
		let truck;

		if (truck_id) {
			truck = await Truck.findById(truck_id);

			if (!truck) {
				return res.status(404).send("Truck not found");
			}
		} else {
			truck = new Truck();
		}

		for (const key in truck_data) {
			if (truck_data.hasOwnProperty(key)) {
				truck[key] = truck_data[key];
			}
		}
		await truck.save();

		return res.send(truck);
	} catch (error) {
		console.error("Error creating/updating truck:", error);
		return res.status(500).send("Internal server error");
	}
};

const deleteTruck = async (req, res) => {
	const id = req.params.id;
	await Truck.deleteOne({ _id: id });
	res.status(200).send("Truck deleted successfully");
};

module.exports = {
	getTruck,
	createOrUpdateTruck,
	deleteTruck,
};
