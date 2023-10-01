const Users = require("../models/user.model");
const Bins = require("../models/bin.model");
const Trucks = require("../models/truck.model");

let user;

const getAnalytics = async (req, res) => {
	user = req.user;
	group_id = user.group_id;
	user_type = user.user_type;
	let response = {};
	let filter = null;
	try {
		if (user_type === "2") {
			filter = { group_id: group_id };
		}

		const users = await Users.find(filter);
		response.users_count = users.length;
		if (user_type === "1") {
			response.super_admins_count = users.filter(
				(user) => user.user_type === "1"
			).length;
		}
		response.admins_count = users.filter(
			(user) => user.user_type === "2"
		).length;
		response.drivers_count = users.filter(
			(user) => user.user_type === "3"
		).length;

		const bins = await Bins.find(filter);
		response.bins_count = bins.length;
		response.general_bins_count = bins.filter(
			(bin) => bin.waste_type === "General"
		).length;
		response.recyclables_bins_count = bins.filter(
			(bin) => bin.waste_type === "Recyclables"
		).length;
		response.hazardous_bins_count = bins.filter(
			(bin) => bin.waste_type === "Hazardous"
		).length;

		const trucks = await Trucks.find(filter);
		response.trucks_count = trucks.length;

		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);

		if (user_type === "1") {
			const collectedBinsPerDay = await Bins.aggregate([
				{
					$unwind: "$collection_history",
				},
				{
					$match: {
						"collection_history.updatedAt": { $ne: null },
						"collection_history.updatedAt": { $gte: sevenDaysAgo },
					},
				},
				{
					$group: {
						_id: {
							year: { $year: "$collection_history.updatedAt" },
							month: { $month: "$collection_history.updatedAt" },
							day: {
								$dayOfMonth: "$collection_history.updatedAt",
							},
						},
						count: { $sum: 1 },
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
			]);

			const formattedData = collectedBinsPerDay.map((item) => ({
				date: new Date(item._id.year, item._id.month - 1, item._id.day),
				count: item.count,
			}));
	
			response.collected_bins_per_day = formattedData;
			
		} else if (user_type === "2") {
			const collectedBinsPerDay = await Bins.aggregate([
				{
					$match: {
						group_id: group_id,
					},
				},
				{
					$unwind: "$collection_history",
				},
				{
					$match: {
						"collection_history.updatedAt": { $ne: null },
						"collection_history.updatedAt": { $gte: sevenDaysAgo },
					},
				},
				{
					$group: {
						_id: {
							year: { $year: "$collection_history.updatedAt" },
							month: { $month: "$collection_history.updatedAt" },
							day: {
								$dayOfMonth: "$collection_history.updatedAt",
							},
						},
						count: { $sum: 1 },
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
			]);

			const formattedData = collectedBinsPerDay.map((item) => ({
				date: new Date(item._id.year, item._id.month - 1, item._id.day),
				count: item.count,
			}));
	
			response.collected_bins_per_day = formattedData;
		}

		

		res.status(200).send(response);
	} catch (err) {
		res.status(404).send("An error occured: ", err);
	}
};

module.exports = { getAnalytics };
