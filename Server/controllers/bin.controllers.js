const Bin = require("../models/bin.model");
const axios = require("axios");

const getBin = async (req, res) => {
	if (req.params.id) {
		const bin = await Bin.findById(req.params.id);
		res.status(200).send(bin);
	} else {
		const bins = await Bin.find({ group_id: req.user.group_id });
		res.status(200).send(bins);
	}
};

const createOrUpdateBin = async (req, res) => {
	const bin_data = req.body;
	const bin_id = req.params.id;

	try {
		let bin;

		if (bin_id) {
			bin = await Bin.findById(bin_id);

			if (!bin) {
				return res.status(404).send("Bin not found");
			}
		} else {
			bin = new Bin();
		}

		for (const key in bin_data) {
			if (bin_data.hasOwnProperty(key)) {
				bin[key] = bin_data[key];
			}
		}
		await bin.save();

		return res.send(bin);
	} catch (error) {
		console.error("Error creating/updating bin:", error);
		return res.status(500).send("Internal server error");
	}
};

const deleteBin = async (req, res) => {
	const id = req.params.id;
	await Bin.deleteOne({ _id: id });
	res.status(200).send("Bin deleted successfully");
};

const addBinRecord = async (req, res) => {
	const new_bin_record = req.body;

	if (new_bin_record.record != null) {
		try {
			const id = req.params.id;

			const bin_instance = await Bin.findById(id);

			if (!bin_instance) {
				return res.status(404).send("Bin not found");
			}

			bin_instance.data.push({
				timestamp: new Date(),
				record: new_bin_record.record,
			});

			await bin_instance.save();

			return res.send(bin_instance);
		} catch (error) {
			console.error("Error adding bin record:", error);
			return res.status(500).send("Internal server error");
		}
	} else {
		return res.status(400).send("id and record are required");
	}
};

const deleteBinRecord = async (req, res) => {
	const { bin_id, record_id } = req.params;

	try {
		const bin_instance = await Bin.findById(bin_id);

		if (!bin_instance) {
			return res.status(404).send("Bin not found");
		}

		bin_instance.data = bin_instance.data.filter(
			(record) => record._id != record_id
		);

		await bin_instance.save();

		return res.status(200).send("Record deleted successfully");
	} catch (error) {
		console.error("Error deleting bin record:", error);
		return res.status(500).send("Internal server error");
	}
};

const calculateOptimalRoute = async (req, res) => {
	const { bins } = req.body;

	try {

		if (bins.length === 0) {
			return res
				.status(400)
				.send(
					"No bins with fill level above 90% and recent last_pickup_time found."
				);
		}

		const waypoints = bins
			.map((bin) => `${bin.longitude},${bin.latitude}`)
			.join(";");

		const osrmApiUrl = `http://localhost:5000/route/v1/driving/${waypoints}?steps=true&alternatives=false`;

		const osrmResponse = await axios.get(osrmApiUrl);

		const routeData = osrmResponse.data;

		return res.status(200).send(routeData);
	} catch (error) {
		console.error("Error calculating optimal route:", error);
		return res.status(500).send("Internal server error");
	}
};

module.exports = {
	getBin,
	createOrUpdateBin,
	deleteBin,
	addBinRecord,
	deleteBinRecord,
	calculateOptimalRoute,
};
