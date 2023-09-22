import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, User } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import { sendRequest } from "../../../configs/request";
import ListHeader from "../../../components/base/listheader";
import ListItem from "../../../components/base/listItem";

export default function AdminUsers() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const [userList, setUserList] = useState<User[]>([]);

	const getTrucks = async () => {
		try {
			const response = await sendRequest({
				route: "users/group",
				token,
			});
			if (response.status === 200) {
				setUserList(response.data);
			}
		} catch (err: any) {
			console.error(err);
		}
	}

	useEffect(() => {
		getTrucks();
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
				selected="Users"
			/>
			<div className="flex flex-col w-full">
				<Navbar label="Users" />
				<div className="p-10">
					<ListHeader
						items={["ID", "Name", "Username", "Role", "Actions"]}
					/>
					{userList.map((user: User, key) => {
						let user_type: string = "";
						if (user.user_type === "1") {
							user_type = "Super Admin";
						} else if (user.user_type === "2") {
							user_type = "Admin";
						} else if (user.user_type === "3") {
							user_type = "Driver";
						}
						return (
							<ListItem
								items={[
									user._id,
									`${user.first_name} ${user.last_name}`,
									user.username,
									user_type,
								]}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
