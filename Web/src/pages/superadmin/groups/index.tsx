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
import Input from "../../../components/base/input";

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

	const [createModalState, setCreateModalState] = useState({
		open: false,
		type: "create",
	});
	const [groupData, setGroupData] = useState({
		_id: "",
		name: "",
	});

	const activateCreateModal = () => {
		setGroupData({
			...groupData,
			_id: "",
			name: "",
		});
		setCreateModalState({
			...createModalState,
			open: true,
			type: "create",
		});
	};

	const createGroup = async () => {
		const { _id, ...restData } = groupData;

		const asArray = Object.entries(restData);

		const filtered = asArray.filter(
			([key, value]) => value !== null && value !== ""
		);

		const finalData = Object.fromEntries(filtered);

		try {
			const response = await sendRequest({
				method: "POST",
				route: `groups`,
				body: finalData,
				token,
			});

			if (response.status === 200) {
				setCreateModalState({ ...createModalState, open: false });
				getGroups();
				toast.success("Group created successfully", { duration: 2500 });
			} else {
				setCreateModalState({ ...createModalState, open: false });
				toast.error("Couldn't Create, Try Again", { duration: 4000 });
			}
		} catch (err: any) {
			console.error(err);
			setCreateModalState({ ...createModalState, open: false });
			toast.error("Couldn't Create, Try Again", { duration: 2500 });
		}
	};

	const [filters, setfilters] = useState<{
		searchQuery: string;
	}>({
		searchQuery: "",
	});

	const filterBySearch = (groupList: Group[], query: string) => {
		if (!query) {
			return groupList;
		}

		const lowerCaseQuery = query.toLowerCase();

		return groupList.filter((group) => {
			const name = group.name.toLowerCase();

			return name.includes(lowerCaseQuery);
		});
	};

	const filterObjects = (query: string) => {
		setfilters({ ...filters, searchQuery: query });
	};

	return (
		<div className="flex">
			<Sidebar
				items={["Dashboard", "Users", "Groups", "Account"]}
				selected="Groups"
			/>
			<div className="flex flex-col w-full">
				<Navbar
					label="Groups"
					buttonLabel="+ Create Group"
					buttonAction={() => activateCreateModal()}
				/>
				<div>
					<Toaster />
				</div>
				{/* Create - Edit Modal */}
				<ModalComponent
					showModal={createModalState.open}
					onRequestClose={() =>
						setCreateModalState({
							...createModalState,
							open: !createModalState.open,
						})
					}
				>
					<div className="text-xl">Create/Edit User</div>
					<div className="flex flex-col flex-wrap justify-center content-center w-96">
						<div className="flex gap-5 w-full">
							<Input
								label="Name"
								placeholder="name"
								value={groupData.name}
								onChange={(e) => {
									setGroupData({
										...groupData,
										name: e.target.value,
									});
								}}
								required
							/>
						</div>
					</div>
					<div className="flex w-full justify-center gap-10 mt-5">
						<Button
							label="Cancel"
							color="text-gunmetal"
							bgColor="bg-neutral-100"
							hoverColor="hover:bg-neutral-600"
							onClick={() =>
								setCreateModalState({
									...createModalState,
									open: false,
								})
							}
						/>
						{createModalState.type === "edit" ? (
							<Button
								label="Update"
								bgColor="bg-primary-500"
								hoverColor="hover:bg-primary-700"
								// onClick={() => updateGroup()}
							/>
						) : (
							<Button
								label="Create"
								bgColor="bg-primary-500"
								hoverColor="hover:bg-primary-700"
								onClick={() => createGroup()}
							/>
						)}
					</div>
				</ModalComponent>
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
				<div className="p-10 pb-2">
					<div className="flex content-center justify-center py-2 px-5 gap-5 rounded-lg bg-primary-200">
						<div className="flex flex-wrap content-center w-1/2">
							<Input
							label="Search"
								placeholder="Search by name"
								onChange={(e) => filterObjects(e.target.value)}
							/>
						</div>
						
					</div>
				</div>
				<div className="p-10 pt-3">
					<ListHeader
						items={[
							"Name",
							"Admins Count",
							"Members Count",
							"Actions",
						]}
					/>
					{filterBySearch(groupList, filters.searchQuery).map((group: Group, index) => {
						return (
							<ListItem
								key={index}
								items={[
									// group._id,
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
