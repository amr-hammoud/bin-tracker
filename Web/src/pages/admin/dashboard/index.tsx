import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, User } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import { sendRequest } from "../../../configs/request";

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

	const [stats, setStats] = useState({});

	const getAnalytics = async () => {
		try {
			const response = await sendRequest({
				route: `analytics`,
				token,
			});
			if (response.status === 200) {
				setStats(response.data);
				console.log(stats);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAnalytics()
	}, [])

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
				<div className="p-5"></div>
			</div>
		</div>
	);
}
