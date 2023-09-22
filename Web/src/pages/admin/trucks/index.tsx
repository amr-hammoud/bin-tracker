import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, Truck } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import ListHeader from "../../../components/base/listheader";
import { sendRequest } from "../../../configs/request";
import ListItem from "../../../components/base/listItem";

export default function AdminTrucks() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const [trucksList, setTrucksList] = useState<Truck[]>([]);

	const getTrucks = async () => {
		try {
			const response = await sendRequest({
				route: "trucks/",
				token,
			});
			if (response.status === 200) {
				setTrucksList(response.data);
			}
		} catch (err: any) {
			console.error(err);
		}
	}

	useEffect(() => {
		getTrucks();
	}, []);

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
			<div className="flex flex-col w-full">
				<Navbar label="Trucks" />
				<div className="p-10">
					<ListHeader
						items={["Plate Number", "Driver", "Last Oil Change", "Last Wash", "Actions"]}
					/>
					{trucksList.map((truck: Truck, index) => {
						return (
							<ListItem
								key={index}
								items={[
									truck.plate_number,
									truck.driver_id.first_name + " " + truck.driver_id.last_name,
									truck.last_oil_change,
									truck.last_wash,
								]}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
