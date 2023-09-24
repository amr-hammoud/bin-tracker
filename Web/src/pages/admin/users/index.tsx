import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, User, Group } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import { sendRequest } from "../../../configs/request";
import ListItem from "../../../components/base/listItem";
import ListHeader from "../../../components/base/listheader";
import ModalComponent from "../../../components/base/modal";
import Button from "../../../components/base/button";
import Input from "../../../components/base/input";
import { Toaster, toast } from "react-hot-toast";
import Select from "../../../components/base/select";

export default function AdminUsers() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const [userList, setUserList] = useState<User[]>([]);

	const getUsers = async () => {
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
	};

	useEffect(() => {
		getUsers();
	}, []);

	const [deleteModalState, setDeleteModalState] = useState({
		open: false,
		id: "",
	});

	const activateDeleteModal = (id: string) => {
		setDeleteModalState({ ...deleteModalState, open: true, id: id });
	};

	const deleteUser = async (id: string) => {
		try {
			const response = await sendRequest({
				method: "DELETE",
				route: `users/${id}`,
				token,
			});
			if (response.status === 200) {
				const newArr = userList.filter((user) => {
					return user?._id !== id;
				});
				setDeleteModalState({ ...deleteModalState, open: false });
				toast.success("User Deleted Successfully", { duration: 2500 });
				setUserList(newArr);
			}
		} catch (err: any) {
			console.error(err);
			setDeleteModalState({ ...deleteModalState, open: false });
			toast.error("Couldn't Delete User", { duration: 4000 });
		}
	};

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
			<div className="flex flex-col w-full bg-neutral-0">
				<Navbar label="Users" />
				<div>
					<Toaster />
				</div>
				
				{/* Delete Modal */}
				<ModalComponent
					showModal={deleteModalState.open}
					onRequestClose={() =>
						setDeleteModalState({
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
								setDeleteModalState({
									...deleteModalState,
									open: false,
								})
							}
						/>
						<Button
							label="Delete"
							bgColor="bg-red-400"
							hoverColor="hover:bg-red-500"
							onClick={() => deleteUser(deleteModalState.id)}
						/>
					</div>
				</ModalComponent>
				
				<div className="p-10 pt-3">
					<ListHeader
						items={["Name", "Username", "Group", "Role", "Actions"]}
					/>
					{filterByRole(
						filterBySearch(userList, filters.searchQuery),
						filters.selectedFilter
					).map((user: User, key) => {
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
									`${user.first_name} ${user.last_name}`,
									user.username,
									user.group_id?.name,
									user_type,
								]}
								object={user}
								onDelete={(id) => activateDeleteModal(id)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
