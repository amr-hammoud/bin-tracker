import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { User } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";

export default function AdminBins() {
	const user: User | null = useSelector(
		(state: RootState) => state.auth.user
	);

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
				selected="Bins"
			/>
			<div className="flex flex-col w-full">
				<Navbar label="Bins" />
				<div className="p-5">
					<h2>
						Hello {user?.first_name} {user?.last_name}
					</h2>
				</div>
			</div>
		</div>
	);
}
