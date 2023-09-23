import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, User } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import { sendRequest } from "../../../configs/request";
import ListItem from "../../../components/base/listItem";
import ListHeader from "../../../components/base/listheader";
import ModalComponent from "../../../components/common/modal";
import Button from "../../../components/base/button";

export default function SuperAdminUsers() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const [userList, setUserList] = useState<User[]>([]);

	const getUsers = async () => {
		try {
			const response = await sendRequest({
				route: "users/",
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
				setUserList(newArr);
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
				selected="Users"
			/>
			<div className="flex flex-col w-full bg-neutral-0">
				<Navbar label="Users" />
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
							onClick={() => deleteUser(modalState.id)}
						/>
					</div>
				</ModalComponent>
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
								onDelete={(id) => activateModal(id)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
