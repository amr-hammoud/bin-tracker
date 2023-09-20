import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Bin, Token } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import { sendRequest } from "../../../configs/request";
import ListItem from "../../../components/base/listItem";
import { MdLocationPin } from "react-icons/md";

export default function AdminBins() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const [binsList, setBinList] = useState([])

	const getBins = async () => {
		try {
			const response = await sendRequest({
				route: "bins/",
				token,
			});
			if (response.status === 200) {
				setBinList(response.data)
			}
		} catch (err: any) {
			console.error(err);
		}
	}

	useEffect(() => {
		getBins()
	}, [])

	const showLocation = () => {
		console.log("Location");
		
	}

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
			<div className="flex flex-col w-full">
				<Navbar label="Bins" />
				<div className="p-10">
					<h2>
						{binsList.map((bin: Bin, index) => {
							return <ListItem key={index} items={[bin.custom_id, bin.waste_type, bin.last_pickup_time]} customIcon={<MdLocationPin />} customIconAction={() => showLocation()}/>
							//TODO: Add location icon to listItem
						})}
					</h2>
				</div>
			</div>
		</div>
	);
}
