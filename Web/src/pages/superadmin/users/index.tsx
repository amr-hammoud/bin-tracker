import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, User } from "../../../store/interfaces";
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

	const [deleteModalState, setdeleteModalState] = useState({
		open: false,
		id: "",
	});

	const activateDeleteModal = (id: string) => {
		setdeleteModalState({ ...deleteModalState, open: true, id: id });
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
				setdeleteModalState({ ...deleteModalState, open: false });
				toast.success("User Deleted Successfully", { duration: 2500 });
				setUserList(newArr);
			}
		} catch (err: any) {
			console.error(err);
			setdeleteModalState({ ...deleteModalState, open: false });
			toast.error("Couldn't Delete User", { duration: 4000 });
		}
	};

	const [createModalState, setCreateModalState] = useState({
		open: false,
		type: "create",
	});
	const [userData, setUserData] = useState({
		_id: "",
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		user_type: "",
	});

	const activateCreateModal = () => {
		setUserData({
			...userData,
			_id: "",
			first_name: "",
			last_name: "",
			username: "",
			email: "",
			password: "",
			user_type: "1",
		});
		setCreateModalState({
			...createModalState,
			open: true,
			type: "create",
		});
	};

	const activateEditModal = (data: any) => {
		const user = JSON.parse(data);
		setUserData({
			...userData,
			_id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			email: user.email,
			user_type: user.user_type,
		});

		setCreateModalState({ ...createModalState, open: true, type: "edit" });
	};

	const updateUser = async () => {
		const { _id, ...restData } = userData;

		try {
			const response = await sendRequest({
				method: "PUT",
				route: `users/${userData._id}`,
				body: restData,
				token,
			});

			if (response.status === 200) {
				setCreateModalState({ ...createModalState, open: false });
				getUsers();
				toast.success("User updated successfully", { duration: 2500 });
			} else {
				setCreateModalState({ ...createModalState, open: false });
				toast.error("Couldn't Update, Try Again", { duration: 4000 });
			}
		} catch (err: any) {
			console.error(err);
			setCreateModalState({ ...createModalState, open: false });
			toast.error("Couldn't Update, Try Again", { duration: 2500 });
		}
	};

	const createUser = async () => {
		const { _id, ...restData } = userData;

		const asArray = Object.entries(restData);

		const filtered = asArray.filter(
			([key, value]) => value !== null && value !== ""
		);

		const finalData = Object.fromEntries(filtered);

		try {
			const response = await sendRequest({
				method: "POST",
				route: `auth/register`,
				body: finalData,
				token,
			});

			console.log(response);

			if (response.status === 200) {
				setCreateModalState({ ...createModalState, open: false });
				getUsers();
				toast.success("User created successfully", { duration: 2500 });
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

	return (
		<div className="flex">
			<Sidebar
				items={["Dashboard", "Users", "Groups", "Account"]}
				selected="Users"
			/>
			<div className="flex flex-col w-full bg-neutral-0">
				<Navbar
					label="Users"
					buttonLabel="+ Create User"
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
						<div className="flex gap-5">
							<Input
								label="First Name"
								placeholder="first name"
								value={userData.first_name}
								onChange={(e) => {
									setUserData({
										...userData,
										first_name: e.target.value,
									});
								}}
								required
							/>
							<Input
								label="Last Name"
								placeholder="last name"
								value={userData.last_name}
								onChange={(e) => {
									setUserData({
										...userData,
										last_name: e.target.value,
									});
								}}
								required
							/>
						</div>
						<Input
							label="Username"
							placeholder="username"
							value={userData.username}
							onChange={(e) => {
								setUserData({
									...userData,
									username: e.target.value,
								});
							}}
							required
						/>
						<Input
							label="Email"
							type="email"
							placeholder="Email"
							value={userData.email}
							onChange={(e) => {
								setUserData({
									...userData,
									email: e.target.value,
								});
							}}
						/>
						{createModalState.type === "create" ? (
							<Input
								label="Password"
								type="password"
								placeholder="Password"
								value={userData.password}
								onChange={(e) => {
									setUserData({
										...userData,
										password: e.target.value,
									});
								}}
								required
							/>
						) : (
							<Input
								label="Password"
								type="password"
								placeholder="Password"
								value={userData.password}
								onChange={(e) => {
									setUserData({
										...userData,
										password: e.target.value,
									});
								}}
							/>
						)}

						<Select label="User Type" required value={userData.user_type} options={{"Super Admin": "1", "Admin": "2", "Driver": "3"}} onChange={(e) => setUserData({...userData, user_type: e.target.value})}/>

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
								onClick={() => updateUser()}
							/>
						) : (
							<Button
								label="Create"
								bgColor="bg-primary-500"
								hoverColor="hover:bg-primary-700"
								onClick={() => createUser()}
							/>
						)}
					</div>
				</ModalComponent>
				{/* Delete Modal */}
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
							onClick={() => deleteUser(deleteModalState.id)}
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
								object={user}
								onEdit={(data) => activateEditModal(data)}
								onDelete={(id) => activateDeleteModal(id)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
