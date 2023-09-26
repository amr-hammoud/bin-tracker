import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, Truck, User, User2 } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import ListHeader from "../../../components/base/listheader";
import { sendRequest } from "../../../configs/request";
import ListItem from "../../../components/base/listItem";
import ModalComponent from "../../../components/base/modal";
import Button from "../../../components/base/button";
import { Toaster, toast } from "react-hot-toast";
import Input from "../../../components/base/input";
import Select from "../../../components/base/select";

export default function AdminTrucks() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);
	const user: User2 | null = useSelector(
		(state: RootState) => state.auth.user as User2
	);

	const collapse: boolean = useSelector(
		(state: RootState) => state.sidebar.collapse
	);

	const [truckList, setTruckList] = useState<Truck[]>([]);
	const [driverList, setDriverList] = useState<User[]>([]);

	const getTrucks = async () => {
		try {
			const response = await sendRequest({
				route: "trucks/",
				token,
			});

			if (response.status === 200) {
				setTruckList(response.data);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	const getDrivers = async () => {
		try {
			const response = await sendRequest({
				route: `users/drivers`,
				token,
			});

			if (response.status === 200) {
				setDriverList(response.data);
			} else {
				toast.error("Error Getting Drivers", { duration: 4000 });
			}
		} catch (err: any) {
			console.error(err);
			toast.error("Error Getting Drivers", { duration: 2500 });
		}
	};

	useEffect(() => {
		getTrucks();
		getDrivers();
	}, []);

	const [deleteModalState, setDeleteModalState] = useState({
		open: false,
		id: "",
	});

	const activateDeleteModal = (id: string) => {
		setDeleteModalState({ ...deleteModalState, open: true, id: id });
	};

	const deleteTruck = async (id: string) => {
		try {
			const response = await sendRequest({
				method: "DELETE",
				route: `trucks/${id}`,
				token,
			});
			if (response.status === 200) {
				const newArr = truckList.filter((truck) => {
					return truck?._id !== id;
				});
				setDeleteModalState({ ...deleteModalState, open: false });
				toast.success("Truck Deleted Successfully", { duration: 2500 });
				setTruckList(newArr);
			}
		} catch (err: any) {
			console.error(err);
			setDeleteModalState({ ...deleteModalState, open: false });
			toast.error("Couldn't Delete Truck", { duration: 4000 });
		}
	};

	const [createModalState, setCreateModalState] = useState({
		open: false,
		type: "create",
	});
	const [truckData, setTruckData] = useState<{
		_id: string;
		plate_number: string;
		group_id: string | undefined;
		driver_id: string;
		last_oil_change?: string | undefined;
		last_wash?: string | undefined;
	}>({
		_id: "",
		plate_number: "",
		group_id: "",
		driver_id: "",
		last_oil_change: "",
		last_wash: "",
	});

	const activateCreateModal = () => {
		setTruckData({
			...truckData,
			_id: "",
			plate_number: "",
			group_id: user?.group_id,
			driver_id: driverList[0]._id,
			last_oil_change: "",
			last_wash: "",
		});
		setCreateModalState({
			...createModalState,
			open: true,
			type: "create",
		});
	};

	const createTruck = async () => {
		const { _id, ...restData } = truckData;

		const asArray = Object.entries(restData);

		const filtered = asArray.filter(
			([key, value]) => value !== null && value !== ""
		);

		const finalData = Object.fromEntries(filtered);

		try {
			const response = await sendRequest({
				method: "POST",
				route: `trucks`,
				body: finalData,
				token,
			});

			if (response.status === 200) {
				setCreateModalState({ ...createModalState, open: false });
				getTrucks();
				toast.success("Truck created successfully", { duration: 2500 });
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

	const transformedDriversList = driverList.reduce(
		(acc: Record<string, string>, currentItem) => {
			acc[currentItem.username] = currentItem._id;
			return acc;
		},
		{}
	);

	const activateEditModal = (data: any) => {
		const truck = JSON.parse(data);
		setTruckData({
			...truckData,
			_id: truck._id,
			plate_number: truck.plate_number,
			group_id: truck.group_id,
			driver_id: truck.driver_id,
			last_oil_change: truck.last_oil_change,
			last_wash: truck.last_wash,
		});

		setCreateModalState({ ...createModalState, open: true, type: "edit" });
	};

	const updateTruck = async () => {
		const { _id, ...restData } = truckData;

		try {
			const response = await sendRequest({
				method: "POST",
				route: `trucks/${truckData._id}`,
				body: restData,
				token,
			});

			if (response.status === 200) {
				setCreateModalState({ ...createModalState, open: false });
				getTrucks();
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

	const [filters, setfilters] = useState<{
		searchQuery: string;
		selectedFilter: string;
	}>({
		searchQuery: "",
		selectedFilter: "All",
	});

	const filterBySearch = (userList: Truck[], query: string) => {
		if (!query) {
			return userList;
		}

		const lowerCaseQuery = query.toLowerCase();

		return userList.filter((truck) => {
			const plate_number = truck.plate_number.toLowerCase();
			const driver_name =
				`${truck.driver_id.first_name} ${truck.driver_id.last_name}`.toLowerCase();

			return (
				plate_number.includes(lowerCaseQuery) ||
				driver_name.includes(lowerCaseQuery)
			);
		});
	};

	const filterObjects = (query: string) => {
		setfilters({ ...filters, searchQuery: query });
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
				selected="Trucks"
			/>
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
							label="Plate Number"
							placeholder="plate"
							value={truckData.plate_number}
							onChange={(e) => {
								setTruckData({
									...truckData,
									plate_number: e.target.value,
								});
							}}
							required
						/>
					</div>
					<div className="flex gap-5">
						<Input
							label="Last Oil Change"
							type="date"
							value={truckData.last_oil_change}
							onChange={(e) => {
								setTruckData({
									...truckData,
									last_oil_change: e.target.value,
								});
							}}
							required
						/>
						<Input
							label="Last Wash"
							type="date"
							value={truckData.last_wash}
							onChange={(e) => {
								setTruckData({
									...truckData,
									last_wash: e.target.value,
								});
							}}
							required
						/>
					</div>
					<Select
						label="Driver"
						required
						value={truckData.driver_id}
						options={transformedDriversList}
						onChange={(e) =>
							setTruckData({
								...truckData,
								driver_id: e.target.value,
							})
						}
					/>
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
							onClick={() => updateTruck()}
						/>
					) : (
						<Button
							label="Create"
							bgColor="bg-primary-500"
							hoverColor="hover:bg-primary-700"
							onClick={() => createTruck()}
						/>
					)}
				</div>
			</ModalComponent>
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
				<div className="text-xl">Are you sure you want to delete?</div>
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
						onClick={() => deleteTruck(deleteModalState.id)}
					/>
				</div>
			</ModalComponent>
			<div
				className={`flex flex-col w-full ${
					collapse ? "ml-20" : "ml-52"
				}`}
			>
				<Navbar
					label="Trucks"
					buttonLabel="+ Create Truck"
					buttonAction={() => activateCreateModal()}
				/>
				<div>
					<Toaster />
				</div>
				<div className="p-10 pb-2">
					<div className="flex content-center justify-center py-2 px-5 gap-5 rounded-lg bg-primary-200">
						<div className="flex flex-wrap content-center w-1/2">
							<Input
								label="Search"
								placeholder="Search by plate number/driver"
								onChange={(e) => filterObjects(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="p-10">
					<ListHeader
						items={[
							"Plate Number",
							"Driver",
							"Last Oil Change",
							"Last Wash",
							"Actions",
						]}
					/>
					{filterBySearch(truckList, filters.searchQuery).map(
						(truck: Truck, index) => {
							return (
								<ListItem
									key={index}
									items={[
										truck.plate_number,
										truck.driver_id.first_name +
											" " +
											truck.driver_id.last_name,
										truck.last_oil_change,
										truck.last_wash,
									]}
									object={truck}
									onEdit={(data) => activateEditModal(data)}
									onDelete={(id) => activateDeleteModal(id)}
								/>
							);
						}
					)}
				</div>
			</div>
		</div>
	);
}
