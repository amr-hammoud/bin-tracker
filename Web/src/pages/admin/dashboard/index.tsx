import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, User } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import { sendRequest } from "../../../configs/request";
import { PieChart } from "../../../components/dashboard/piechart";

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
		<div className="flex">
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
				className={`flex flex-col w-full ${
					collapse ? "ml-20" : "ml-52"
				}`}
			>
				<Navbar label="Dashboard" />
				<div className="p-5">
					<div className="flex w-full flex-wrap md:flex-nowrap justify-center gap-16 h-fit text-gunmetal">
						<div className="flex flex-col w-full h-full gap-2">
							<div className="flex flex-col w-full h-full gap-2">
								<div className="flex flex-col flex-wrap justify-center content-center h-full w-full bg-primary-100 hover:bg-primary-200 p-3 text-center rounded">
									<div className=" text-xl">
										Users&nbsp;Count
									</div>
									<div className="mt-5 font-bold text-4xl">
										{stats?.users_count}
									</div>
								</div>
								<div className="flex flex-wrap sm:flex-nowrap h-full gap-2">
									<div className="flex flex-col flex-wrap justify-center content-center w-full h-full bg-neutral-50 hover:bg-neutral-100 p-3 text-center rounded">
										<div className=" text-xl">Admins</div>
										<div className="mt-5 font-bold text-4xl">
											{stats?.admins_count}
										</div>
									</div>
									<div className="flex flex-col flex-wrap justify-center content-center w-full h-full bg-neutral-50 hover:bg-neutral-100 p-3 text-center rounded">
										<div className=" text-xl">Drivers</div>
										<div className="mt-5 font-bold text-4xl">
											{stats?.drivers_count}
										</div>
									</div>
								</div>
								<div className="flex justify-center bg-neutral-50 p-2">
									<PieChart
										data={[
											{
												name: "Admin",
												value: stats.admins_count,
											},
											{
												name: "Driver",
												value: stats.drivers_count,
											},
										]}
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col w-full h-full gap-2">
							<div className="flex flex-col w-full h-full gap-2">
								<div className="flex flex-col flex-wrap justify-center content-center h-full w-full bg-primary-100 hover:bg-primary-200 p-3 text-center rounded">
									<div className=" text-xl">
										Bins&nbsp;Count
									</div>
									<div className="mt-5 font-bold text-4xl">
										{stats?.bins_count}
									</div>
								</div>
								<div className="flex flex-wrap lg:flex-nowrap h-full gap-2">
									<div className="flex flex-col flex-wrap justify-center content-center w-full h-full bg-neutral-50 hover:bg-neutral-100 p-3 text-center rounded">
										<div className=" text-xl">General</div>
										<div className="mt-5 font-bold text-4xl">
											{stats?.general_bins_count}
										</div>
									</div>
									<div className="flex flex-col flex-wrap justify-center content-center w-full h-full bg-neutral-50 hover:bg-neutral-100 p-3 text-center rounded">
										<div className=" text-xl">
											Recyclables
										</div>
										<div className="mt-5 font-bold text-4xl">
											{stats?.recyclables_bins_count}
										</div>
									</div>
									<div className="flex flex-col flex-wrap justify-center content-center w-full h-full bg-neutral-50 hover:bg-neutral-100 p-3 text-center rounded">
										<div className=" text-xl">
											Hazardous
										</div>
										<div className="mt-5 font-bold text-4xl">
											{stats?.hazardous_bins_count}
										</div>
									</div>
								</div>
								<div className="flex justify-center bg-neutral-50 p-2">
									<PieChart
										data={[
											{
												name: "General",
												value: stats.general_bins_count,
											},
											{
												name: "Recyclables",
												value: stats.recyclables_bins_count,
											},
											{
												name: "Hazardous",
												value: stats.hazardous_bins_count,
											},
										]}
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col w-full h-full gap-2">
							<div className="flex flex-col w-full h-full gap-2">
								<div className="flex flex-col flex-wrap justify-center content-center h-full w-full bg-primary-100 hover:bg-primary-200 p-3 text-center rounded">
									<div className=" text-xl">
										Trucks&nbsp;Count
									</div>
									<div className="mt-5 font-bold text-4xl">
										{stats?.trucks_count}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
