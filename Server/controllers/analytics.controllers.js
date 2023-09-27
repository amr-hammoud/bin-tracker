const Users = require("../models/user.model");
const Bins = require("../models/bin.model");
const Trucks = require("../models/truck.model");

let user;

const getAnalytics = async (req, res) => {
	user = req.user;
	group_id = user.group_id;
    let response = {};
	try {
		const users = await Users.find({ group_id: group_id });
        response.users_count=users.length;
        response.admins_count = users.filter(user => user.user_type === "2").length;
        response.drivers_count = users.filter(user => user.user_type === "3").length;

        const bins = await Bins.find({ group_id: group_id })
        response.bins_count=bins.length;
        response.general_bins_count= bins.filter(bin => bin.waste_type === "General").length;
        response.recyclables_bins_count= bins.filter(bin => bin.waste_type === "Recyclables").length;
        response.hazardous_bins_count= bins.filter(bin => bin.waste_type === "Hazardous").length;

        const trucks = await Trucks.find({ group_id: group_id });
        response.trucks_count=trucks.length;


        const collectedBinsPerDay = await Bins.aggregate([
            {
                $match: {
                    group_id: group_id,
                },
            },
            {
                $unwind: "$data",
            },
            {
                $match: {
                    "data.collection_history": { $ne: null },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$data.updatedAt" },
                        month: { $month: "$data.updatedAt" },
                        day: { $dayOfMonth: "$data.updatedAt" },
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

		res.status(200).send(response);
	} catch (err) {
		res.status(404).send("An error occured: ", err );
	}
    
};

module.exports = { getAnalytics };
