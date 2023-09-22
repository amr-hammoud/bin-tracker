import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Group, Token } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import { sendRequest } from "../../../configs/request";
import ListItem from "../../../components/base/listItem";
import ListHeader from "../../../components/base/listheader";

export default function SuperAdminGroups() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const [groupList, setGroupList] = useState<Group[]>([]);

	const getGroups = async () => {
		try {
			const response = await sendRequest({
				route: "groups/",
				token,
			});
			console.log(response);
			if (response.status === 200) {
				setGroupList(response.data);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	useEffect(() => {
		getGroups();
	}, []);

	const deleteGroup = async (id: string) => {
		try {
			const response = await sendRequest({
				method: "DELETE",
				route: `groups/${id}`,
				token,
			});
			if (response.status === 200) {
				const newArr = groupList.filter((group) => {
					return group._id !== id;
				});
				setGroupList(newArr);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	return (
		<div className="flex">
			<Sidebar
				items={["Dashboard", "Users", "Groups", "Account"]}
				selected="Groups"
			/>
			<div className="flex flex-col w-full">
				<Navbar label="Groups" />
				<div className="p-10">
					<ListHeader
						items={["ID", "Name", "Admins Count", "Members Count", "Actions"]}
					/>
					{groupList.map((group: Group, index) => {
						return (
							<ListItem
								key={index}
								items={[
									group._id,
									group.name,
									group.admins.length.toString(),
									group.members.length.toString(),
								]}
								onDelete={deleteGroup}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
