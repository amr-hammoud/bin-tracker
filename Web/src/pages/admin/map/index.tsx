import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, User } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import MapComponent from "../../../components/map/main";
import { sendRequest } from "../../../configs/request";

export default function AdminMap() {
	const user: User | null = useSelector(
		(state: RootState) => state.auth.user
	);

	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
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
		getBins()
	}, [])

	const [activeStyle, setActiveStyle] = useState<number>(0);

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
				selected="Map"
			/>
			<div className="flex flex-col w-full relative">
				<Navbar label="Map" />
				<div className="h-full z-10">
					<MapComponent
						center={{ lat: 34.0, lng: 36.0 }}
						zoom={8}
						layerStyle={activeStyle}
						bins={binsList}
					/>
				</div>
				<div className="absolute bottom-5 left-5 z-20">
					<h3 className="m-1 font-semibold text-gunmetal">
						Map Style
					</h3>
					<div className="flex w-fit h-20 bg-neutral-0 shadow-lg p-2 gap-2 text-gunmetal rounded-md border border-primary-500">
						<div
							className={`flex flex-wrap justify-center content-center p-2 aspect-square text-center
										rounded-md border border-neutral-700 ${
											activeStyle === 0
												? "bg-primary-100"
												: ""
										}
										hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`}
							onClick={() => setActiveStyle(0)}
						>
							Atlas
						</div>
						<div
							className={`flex flex-wrap justify-center content-center p-2 aspect-square text-center
							rounded-md border border-neutral-700 ${
								activeStyle === 1 ? "bg-primary-100" : ""
							}
							hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`}
							onClick={() => setActiveStyle(1)}
						>
							Terrain
						</div>
						<div
							className={`flex flex-wrap justify-center content-center p-2 aspect-square text-center
							rounded-md border border-neutral-700 ${
								activeStyle === 2 ? "bg-primary-100" : ""
							}
							hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`}
							onClick={() => setActiveStyle(2)}
						>
							Lines
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
