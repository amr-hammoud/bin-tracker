import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Bin, Token, User2 } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import { sendRequest } from "../../../configs/request";
import ListItem from "../../../components/base/listItem";
import { MdLocationPin } from "react-icons/md";
import ListHeader from "../../../components/base/listheader";
import { Toaster, toast } from "react-hot-toast";
import Button from "../../../components/base/button";
import Select from "../../../components/base/select";
import Input from "../../../components/base/input";
import ModalComponent from "../../../components/base/modal";

export default function AdminBins() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const user: User2 | null = useSelector(
		(state: RootState) => state.auth.user as User2
	);

	const [binsList, setBinList] = useState([]);

	const getBins = async () => {
		try {
			const response = await sendRequest({
				route: "bins/",
				token,
			});
			if (response.status === 200) {
				setBinList(response.data);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	useEffect(() => {
		getBins();
	}, []);

	const [deleteModalState, setDeleteModalState] = useState({
		open: false,
		id: "",
	});

	const activateDeleteModal = (id: string) => {
		setDeleteModalState({ ...deleteModalState, open: true, id: id });
	};

	const deleteBins = async (id: string) => {
		try {
			const response = await sendRequest({
				method: "DELETE",
				route: `bins/${id}`,
				token,
			});
			if (response.status === 200) {
				const newArr = binsList.filter((bin: Bin) => {
					return bin._id !== id;
				});
				setDeleteModalState({ ...deleteModalState, open: false });
				toast.success("Bin Deleted Successfully", { duration: 2500 });
				setBinList(newArr);
			}
		} catch (err: any) {
			console.error(err);
			setDeleteModalState({ ...deleteModalState, open: false });
			toast.error("Couldn't Delete Bin", { duration: 4000 });
		}
	};

	const [createModalState, setCreateModalState] = useState({
		open: false,
		type: "create",
	});
	const [binData, setBinData] = useState<{
		_id: string;
		custom_id: string;
		longitude: string | null;
		latitude: string | null;
		group_id: string | undefined;
		last_pickup_time: string | undefined;
		waste_type: string | undefined;
		data: Array<{
			_id: string;
			record: string;
			createdAt: string;
			updatedAt: string;
		}>;
	}>({
		_id: "",
		custom_id: "",
		longitude: "",
		latitude: "",
		group_id: "",
		last_pickup_time: "",
		waste_type: "",
		data: [],
	});

	const activateCreateModal = () => {
		setBinData({
			...binData,
			_id: "",
			custom_id: "",
			longitude: "",
			latitude: "",
			group_id: user?.group_id,
			last_pickup_time: "",
			waste_type: "General",
			data: [],
		});
		setCreateModalState({
			...createModalState,
			open: true,
			type: "create",
		});
	};

	const createBin = async () => {
		const { _id, ...restData } = binData;

		const asArray = Object.entries(restData);

		const filtered = asArray.filter(
			([key, value]) => value !== null && value !== ""
		);

		const finalData = Object.fromEntries(filtered);

		try {
			const response = await sendRequest({
				method: "POST",
				route: `bins`,
				body: finalData,
				token,
			});

			if (response.status === 200) {
				setCreateModalState({ ...createModalState, open: false });
				getBins();
				toast.success("Bin created successfully", { duration: 2500 });
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

	const activateEditModal = (data: any) => {
		const bin: Bin = JSON.parse(data);
		setBinData({
			...binData,
			_id: bin._id,
			custom_id: bin.custom_id,
			longitude: bin.longitude,
			latitude: bin.latitude,
			group_id: bin.group_id,
			last_pickup_time: bin.last_pickup_time,
			waste_type: bin.waste_type,
			data: bin.data,
		});

		setCreateModalState({ ...createModalState, open: true, type: "edit" });
	};

	const updateBin = async () => {
		const { _id, ...restData } = binData;

		try {
			const response = await sendRequest({
				method: "POST",
				route: `bins/${binData._id}`,
				body: restData,
				token,
			});

			if (response.status === 200) {
				setCreateModalState({ ...createModalState, open: false });
				getBins();
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

	const filterBySearch = (binsList: Bin[], query: string) => {
		if (!query) {
			return binsList;
		}

		const lowerCaseQuery = query.toLowerCase();

		return binsList.filter((bin) => {
			const custom_id = bin.custom_id.toLowerCase();

			return custom_id.includes(lowerCaseQuery);
		});
	};

	const filterByWasteType = (binsList: Bin[], type: string) => {
		if (type === "All") {
			return binsList;
		}

		return binsList.filter((bin) => bin.waste_type === type);
	};

	const filterObjects = (query: string) => {
		setfilters({ ...filters, searchQuery: query });
	};

	const showLocation = () => {
		console.log("Location");
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
				selected="Bins"
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
							label="Custom ID"
							placeholder="id"
							value={binData.custom_id}
							onChange={(e) => {
								setBinData({
									...binData,
									custom_id: e.target.value,
								});
							}}
							required
						/>
					</div>
					<div className="flex gap-5">
						<Input
							label="Latitude"
							placeholder="latitude"
							value={binData.latitude}
							onChange={(e) => {
								setBinData({
									...binData,
									latitude: e.target.value,
								});
							}}
							required
						/>
						<Input
							label="Longitude"
							placeholder="longitude"
							value={binData.longitude}
							onChange={(e) => {
								setBinData({
									...binData,
									longitude: e.target.value,
								});
							}}
							required
						/>
					</div>
					<Input
						label="Last Pickup"
						type="date"
						value={binData.last_pickup_time}
						onChange={(e) => {
							setBinData({
								...binData,
								last_pickup_time: e.target.value,
							});
						}}
						required
					/>
					<Select
						label="Waste Type"
						required
						value={binData.waste_type}
						options={{
							General: "General",
							Recyclables: "Recyclables",
							Hazardous: "Hazardous",
						}}
						onChange={(e) =>
							setBinData({
								...binData,
								waste_type: e.target.value,
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
							onClick={() => updateBin()}
						/>
					) : (
						<Button
							label="Create"
							bgColor="bg-primary-500"
							hoverColor="hover:bg-primary-700"
							onClick={() => createBin()}
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
						onClick={() => deleteBins(deleteModalState.id)}
					/>
				</div>
			</ModalComponent>
			<div className="flex flex-col w-full">
				<Navbar
					label="Bins"
					buttonLabel="+ Create Bin"
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
								placeholder="Search by id"
								onChange={(e) => filterObjects(e.target.value)}
							/>
						</div>
						<div className="flex flex-wrap content-center w-1/2">
							<Select
								label="Filter by waste type"
								value={filters.selectedFilter}
								options={{
									All: "All",
									General: "General",
									Recyclables: "Recyclables",
									Hazardous: "Hazardous",
								}}
								onChange={(e) =>
									setfilters({
										...filters,
										selectedFilter: e.target.value,
									})
								}
							/>
						</div>
					</div>
				</div>
				<div className="p-10 pt-3">
					<ListHeader
						items={[
							"ID",
							"Custom ID",
							"Waste Type",
							"Last pickup time",
							"Latitude",
							"Longitude",
							"Actions",
						]}
					/>
					{filterByWasteType(
						filterBySearch(binsList, filters.searchQuery),
						filters.selectedFilter
					).map((bin: Bin, index) => {
						return (
							<ListItem
								key={index}
								items={[
									bin._id,
									bin.custom_id,
									bin.waste_type,
									bin.latitude,
									bin.longitude,
									bin.last_pickup_time,
								]}
								object={bin}
								customIcon={<MdLocationPin />}
								customIconAction={() => showLocation()}
								onEdit={(data) => activateEditModal(data)}
								onDelete={(id) => activateDeleteModal(id)}
							/>
						);
						//TODO: Add location icon to listItem
					})}
				</div>
			</div>
		</div>
	);
}
