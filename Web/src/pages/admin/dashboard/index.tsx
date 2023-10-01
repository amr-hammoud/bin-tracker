import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, User } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import { sendRequest } from "../../../configs/request";
import BarChart from "../../../components/dashboard/barchart";
import PieChart from "../../../components/dashboard/piechart";

export default function AdminDashboard() {
	const user: User | null = useSelector(
		(state: RootState) => state.auth.user
	);

	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const collapse: boolean = useSelector(
		(state: RootState) => state.sidebar.collapse
	);

	const [stats, setStats] = useState<{
		users_count: number;
		admins_count: number;
		drivers_count: number;
		bins_count: number;
		general_bins_count: number;
		recyclables_bins_count: number;
		hazardous_bins_count: number;
		trucks_count: number;
		collected_bins_per_day: Array<{
			date: string;
			count: number;
		}>;
	}>({
		users_count: 0,
		admins_count: 0,
		drivers_count: 0,
		bins_count: 0,
		general_bins_count: 0,
		recyclables_bins_count: 0,
		hazardous_bins_count: 0,
		trucks_count: 0,
		collected_bins_per_day: [
			{
				date: new Date().toISOString(),
				count: 0,
			},
		],
	});

	const getAnalytics = async () => {
		try {
			const response = await sendRequest({
				route: `analytics`,
				token,
			});
			if (response.status === 200) {
				setStats(response.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAnalytics();
	}, []);

	return (
		<div className="flex h-screen">
			<Sidebar
				items={[
					"Dashboard",
					"Bins",
					"Map",
					"Users",
					"Trucks",
					"Announcements",
					"Chats",
					"Account",
				]}
				selected="Dashboard"
			/>
			<div
				className={`flex flex-col h-full w-full ${
					collapse ? "ml-20" : "ml-64"
				}`}
			>
				<Navbar label="Dashboard" />
				<div className="p-5 h-full">
					<div className="flex w-full flex-wrap md:flex-nowrap justify-center gap-16 h-full max-h-96 text-gunmetal">
						<div className="flex flex-col w-full h-full gap-2">
							<div className="flex flex-col w-full h-fit  gap-2">
								<div className="flex flex-col flex-wrap justify-center content-center h-fit w-full bg-primary-100 hover:bg-primary-200 p-3 text-center rounded">
									<div className=" text-xl">
										Users&nbsp;Count
									</div>
									<div className="mt-5 font-bold text-4xl">
										{stats?.users_count}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full h-full gap-2 z-10 bg-neutral-100 rounded">
								<PieChart
									data={[
										{
											id: "admins",
											label: "Admins",
											value: stats.admins_count,
										},
										{
											id: "drivers",
											label: "Drivers",
											value: stats.drivers_count,
										},
									]}
								/>
							</div>
						</div>
						<div className="flex flex-col w-full h-full gap-2">
							<div className="flex flex-col w-full h-fit gap-2">
								<div className="flex flex-col flex-wrap justify-center content-center h-fit w-full bg-primary-100 hover:bg-primary-200 p-3 text-center rounded">
									<div className=" text-xl">
										Bins&nbsp;Count
									</div>
									<div className="mt-5 font-bold text-4xl">
										{stats?.bins_count}
									</div>
								</div>
							</div>
							<div className="flex flex-col w-full h-full gap-2 z-10 bg-neutral-100 rounded">
								<PieChart
									data={[
										{
											id: "general",
											label: "General",
											value: stats.general_bins_count,
										},
										{
											id: "recyclables",
											label: "Recyclables",
											value: stats.recyclables_bins_count,
										},
										{
											id: "hazardous",
											label: "Hazardous",
											value: stats.hazardous_bins_count,
										},
									]}
								/>
							</div>
						</div>
						<div className="flex flex-col w-full h-full gap-2">
							<div className="flex flex-col flex-wrap justify-center content-center h-full w-full bg-primary-100 hover:bg-primary-200 p-3 text-center rounded">
								<div className="flex flex-col justify-center flex-nowrap content-center h-full text-xl">
									<div>Trucks&nbsp;Count</div>
									<div className="mt-5 font-bold text-4xl">2</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-full h-1/2 bg-neutral-50 p-5 mt-5">
						<div>Bins Collected Per day (Last week)</div>
						<BarChart data={stats?.collected_bins_per_day} />
					</div>
				</div>
			</div>
		</div>
	);
}
