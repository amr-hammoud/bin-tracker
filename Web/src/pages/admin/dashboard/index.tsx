import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { User } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";

export default function AdminDashboard() {
	const user: User | null = useSelector(
		(state: RootState) => state.auth.user
	);

	return (
		<div className="flex">
			<Sidebar
				items={["Dashboard", "Bins", "Map", "Users", "Trucks", "Announcements", "Chats", "Account"]}
				selected="Dashboard"
			/>
			<div className=" p-5">
				<h1>Dashboard</h1>
				<h2>
					Hello {user?.first_name} {user?.last_name}
				</h2>
			</div>
		</div>
	);
}
