import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Group, Token } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import { sendRequest } from "../../../configs/request";
import ListItem from "../../../components/base/listItem";
import ListHeader from "../../../components/base/listheader";
import ModalComponent from "../../../components/base/modal";
import Button from "../../../components/base/button";

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

	const [modalState, setModalState] = useState({
		open: false,
		id: "",
	});

	const activateModal = (id: string) => {
		setModalState({ ...modalState, open: true, id: id });
	};

	return (
		<div className="flex">
			<Sidebar
				items={["Dashboard", "Users", "Groups", "Account"]}
				selected="Groups"
			/>
			<div className="flex flex-col w-full">
				<Navbar label="Groups" />
				<ModalComponent
					showModal={modalState.open}
					onRequestClose={() =>
						setModalState({ ...modalState, open: !modalState.open })
					}
				>
					<div className="text-xl">
						Are you sure you want to delete?
					</div>
					<div className="flex w-full justify-center gap-10 mt-5">
						<Button
							label="Cancel"
							color="text-gunmetal"
							bgColor="bg-neutral-100"
							hoverColor="hover:bg-neutral-600"
							onClick={() =>
								setModalState({ ...modalState, open: false })
							}
						/>
						<Button
							label="Delete"
							bgColor="bg-red-400"
							hoverColor="hover:bg-red-500"
							onClick={() => deleteGroup(modalState.id)}
						/>
					</div>
				</ModalComponent>
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
								onDelete={(id) => activateModal(id)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
