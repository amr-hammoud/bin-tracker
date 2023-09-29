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
	const record_data = req.body;
	console.log(record_data);

	if (record_data.record != null) {
		try {
			const id = req.params.id;

			const bin_instance = await Bin.findById(id);

			if (!bin_instance) {
				return res
					.status(404)
					.send("Bin not found\nCheck id in ENDPOINT");
			}

			// if (record_data.latitude !== '0.0' && record_data.longitude !== '0.0') {
			// 	bin_instance.latitude = record_data.latitude;
			// 	bin_instance.longitude = record_data.longitude;
			// }

			bin_instance.data.push({
				timestamp: new Date(),
				record: record_data.record,
			});

			await bin_instance.save();

			const response_string = ` | Record Added Successfully\n | Record: ${record_data.record}\n | Latitude: ${record_data.latitude}\n | Longitude: ${record_data.longitude}`;

			return res.send(response_string);
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

const addPickupStamp = async (req, res) => {
	const id = req.params.id;

	if (id != null) {
		try {
			const bin_instance = await Bin.findById(id);

			if (!bin_instance) {
				return res
					.status(404)
					.send("Bin not found");
			}

			bin_instance.collection_history.push({
				timestamp: new Date(),
				collected: true,
			});

			await bin_instance.save();

			return res.status(200).send(bin_instance.collection_history);
		} catch (error) {
			console.error("Error adding stamp:", error);
			return res.status(500).send("Internal server error");
		}
	} else {
		return res.status(400).send("id is required");
	}
};

const calculateProximity = (bin1, bin2) => {
	const lat1 = bin1.latitude;
	const lon1 = bin1.longitude;
	const lat2 = bin2.latitude;
	const lon2 = bin2.longitude;

	const earthRadius = 6371;

	const lat1Rad = (lat1 * Math.PI) / 180;
	const lon1Rad = (lon1 * Math.PI) / 180;
	const lat2Rad = (lat2 * Math.PI) / 180;
	const lon2Rad = (lon2 * Math.PI) / 180;

	const dLat = lat2Rad - lat1Rad;
	const dLon = lon2Rad - lon1Rad;

	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = earthRadius * c;

	return distance;
};

const calculateOptimalRoute = async (req, res) => {
	const { bins } = req.body;

	const FillLevelWeight = 0.6;
	const ProximityWeight = 0.4;

	try {
		if (bins.length === 0) {
			return res.status(400).send("No bins sent");
		}

		const depot = { latitude: 33.890211, longitude: 35.484557 };
		bins.forEach((bin) => {
			const proximity = calculateProximity(depot, bin);
			bin.score =
				FillLevelWeight * bin.fill_level + ProximityWeight * proximity;
		});

		const sortedBins = bins.sort((a, b) => b.score - a.score);

		const waypointString = sortedBins
			.map((waypoint) => `${waypoint.longitude},${waypoint.latitude}`)
			.join(";");

		const osrmApiUrl = `http://localhost:5000/route/v1/driving/${waypointString}?steps=true&alternatives=false`;

		const response = await axios.get(osrmApiUrl);

		const routeData = response.data;
		const route = routeData.routes[0];

		return res.status(200).send(route);
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
	addPickupStamp,
	calculateOptimalRoute,
};
