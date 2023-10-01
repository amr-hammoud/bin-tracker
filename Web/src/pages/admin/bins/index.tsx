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
import { useNavigate } from "react-router-dom";
import LocationInput from "../../../components/map/locationInput";
import { MdRestoreFromTrash } from "react-icons/md";

export default function AdminBins() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const user: User2 | null = useSelector(
		(state: RootState) => state.auth.user as User2
	);

	const collapse: boolean = useSelector(
		(state: RootState) => state.sidebar.collapse
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
		name: string;
		longitude: string;
		latitude: string;
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
		name: "",
		latitude: "33.880166",
		longitude: "35.851174",
		group_id: "",
		last_pickup_time: "",
		waste_type: "",
		data: [],
	});

	const activateCreateModal = () => {
		setBinData({
			...binData,
			_id: "",
			name: "",
			latitude: "33.880166",
			longitude: "35.851174",
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
				toast.success("Bin added successfully", { duration: 2500 });
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
			name: bin.name,
			longitude: bin.longitude,
			latitude: bin.latitude,
			group_id: bin.group_id,
			last_pickup_time:
				bin.collection_history[bin.collection_history.length - 1]
					?.updatedAt,
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
			const id = bin._id.toLowerCase();
			const name = bin.name.toLowerCase();

			return name.includes(lowerCaseQuery) || id.includes(lowerCaseQuery);
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

	const navigate = useNavigate();
	const showLocation = (object: any) => {
		navigate(`/admin/map/${object._id}`, { replace: true });
	};

	const handleLocationChange = (lat: number, lng: number) => {
		setBinData({
			...binData,
			latitude: lat.toString(),
			longitude: lng.toString(),
		});
	};

	const addPickupStamp = async (object: any) => {
		try {
			const response = await sendRequest({
				route: `bins/${object._id}/stamp`,
				token,
			});
			if (response.status === 200) {
				getBins();
				toast.success("Pickup Time Updated Successfully", {
					duration: 1000,
				});
			}
		} catch (err: any) {
			console.error(err);
			toast.success("Failed to update pickup time", { duration: 1500 });
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
							label="Name"
							placeholder="name"
							value={binData.name}
							onChange={(e) => {
								setBinData({
									...binData,
									name: e.target.value,
								});
								console.log(e.target.value);
							}}
							required
						/>
					</div>
					<div className="h-60 w-full my-5 z-10">
						<div className="font-poppins text-sm text-gunmetal">
							Location<span className=" text-red-500">*</span>
						</div>
						<LocationInput
							lat={binData.latitude}
							lng={binData.longitude}
							onLocationChange={handleLocationChange}
						/>
					</div>
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
			<div
				className={`flex flex-col w-full ${
					collapse ? "ml-20" : "ml-64"
				}`}
			>
				<Navbar
					label="Bins"
					buttonLabel="+ Add Bin"
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
								placeholder="Search by id/name"
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
							"Name",
							"Waste Type",
							"Last pickup time",
							"Actions",
						]}
					/>
					<div className="flex flex-col-reverse gap-0">
						{filterByWasteType(
							filterBySearch(binsList, filters.searchQuery),
							filters.selectedFilter
						).map((bin: Bin, index) => {
							const updatedAt =
								bin.collection_history[
									bin.collection_history.length - 1
								]?.updatedAt;
							const date = new Date(updatedAt);

							const formattedDate = date.toLocaleString("en-US", {
								day: "2-digit",
								month: "long",
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							});

							function isValidDate(date: Date): boolean {
								return isFinite(date.getTime());
							}

							return (
								<ListItem
									key={index}
									items={[
										bin._id,
										bin.name,
										bin.waste_type,
										isValidDate(date) ? formattedDate : "-",
									]}
									object={bin}
									customIcon={<MdLocationPin />}
									customIconAction={(object) =>
										showLocation(object)
									}
									customIcon_2={<MdRestoreFromTrash />}
									customIconAction_2={(object) =>
										addPickupStamp(object)
									}
									onEdit={(data) => activateEditModal(data)}
									onDelete={(id) => activateDeleteModal(id)}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
