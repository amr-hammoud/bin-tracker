import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, Truck } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import ListHeader from "../../../components/base/listheader";
import { sendRequest } from "../../../configs/request";
import ListItem from "../../../components/base/listItem";
import ModalComponent from "../../../components/base/modal";
import Button from "../../../components/base/button";
import { Toaster, toast } from "react-hot-toast";

export default function AdminTrucks() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const [truckList, setTruckList] = useState<Truck[]>([]);

	const getTrucks = async () => {
		try {
			const response = await sendRequest({
				route: "trucks/",
				token,
			});
			console.log(response);

			if (response.status === 200) {
				setTruckList(response.data);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	useEffect(() => {
		getTrucks();
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
			<div className="flex flex-col w-full">
				<Navbar label="Trucks" />
				<div>
					<Toaster />
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
					{truckList.map((truck: Truck, index) => {
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
								onDelete={(id) => activateDeleteModal(id)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
