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
import { Toaster, toast } from "react-hot-toast";

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

	const [deleteModalState, setdeleteModalState] = useState({
		open: false,
		id: "",
	});

	const activateDeleteModal = (id: string) => {
		setdeleteModalState({ ...deleteModalState, open: true, id: id });
	};

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
				setdeleteModalState({ ...deleteModalState, open: false });
				toast.success("Group Deleted Successfully", { duration: 2500 });
				setGroupList(newArr);
			}
		} catch (err: any) {
			console.error(err);
			setdeleteModalState({ ...deleteModalState, open: false });
			toast.error("Couldn't Delete Group", { duration: 4000 });
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
				<div>
					<Toaster />
				</div>
				<ModalComponent
					showModal={deleteModalState.open}
					onRequestClose={() =>
						setdeleteModalState({
							...deleteModalState,
							open: !deleteModalState.open,
						})
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
								setdeleteModalState({
									...deleteModalState,
									open: false,
								})
							}
						/>
						<Button
							label="Delete"
							bgColor="bg-red-400"
							hoverColor="hover:bg-red-500"
							onClick={() => deleteGroup(deleteModalState.id)}
						/>
					</div>
				</ModalComponent>
				<div className="p-10">
					<ListHeader
						items={[
							"ID",
							"Name",
							"Admins Count",
							"Members Count",
							"Actions",
						]}
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
								object={group}
								onDelete={(id) => activateDeleteModal(id)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
