import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Bin, Token, User } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import MapComponent from "../../../components/map/main";
import { sendRequest } from "../../../configs/request";
import { LatLngLiteral } from "leaflet";
import LineChart from "../../../components/map/chart";

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
		getBins();
	}, []);

	const [activeStyle, setActiveStyle] = useState<number>(0);

	const [mapPosition, setMapPosition] = useState<LatLngLiteral>({
		lat: 34.0,
		lng: 36.0,
	});

	const [activeBin, setActiveBin] = useState<Bin | null>(null);

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
						center={mapPosition}
						zoom={8}
						layerStyle={activeStyle}
						bins={binsList}
						positionSetter={() => setMapPosition}
						activeBin={activeBin}
						activeBinSetter={setActiveBin}
						onbinClick={(e) => {
							console.log(e);
						}}
					/>
				</div>
				<div className="absolute flex content-center gap-2 top-16 right-5 z-20">
					<h3 className="flex flex-wrap content-center m-1 font-semibold text-gunmetal">
						Map Style
					</h3>
					<div className="flex w-fit h-10 bg-neutral-0 shadow-lg p-2 gap-2 text-gunmetal rounded-md border border-primary-500">
						<div
							className={`flex flex-wrap justify-center content-center p-2 text-center
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
							className={`flex flex-wrap justify-center content-center p-2 text-center
							rounded-md border border-neutral-700 ${
								activeStyle === 1 ? "bg-primary-100" : ""
							}
							hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`}
							onClick={() => setActiveStyle(1)}
						>
							Terrain
						</div>
						<div
							className={`flex flex-wrap justify-center content-center p-2 text-center
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
				{activeBin ? (
					<div className="absolute bottom-5 left-5 z-20 w-11/12">
						<h3 className="m-1 font-semibold text-gunmetal">
							Active Bin
						</h3>
						<div className="flex h-fit w-fit bg-neutral-0 shadow-lg p-3 rounded-md border border-primary-500">
							<div className="flex flex-col w-96 h-fit p-4 gap-2 text-gunmetal w-full">
								<div>
									<span className="font-bold">ID:</span>{" "}
									{activeBin?.custom_id}
								</div>
								<div>
									<span className="font-bold">
										Custom ID:
									</span>{" "}
									{activeBin?._id}
								</div>
								<div>
									<span className="font-bold">
										Waste Type:
									</span>{" "}
									{activeBin?.waste_type}
								</div>
								<div>
									<span className="font-bold">
										Coordinates:
									</span>{" "}
									{`${activeBin?.latitude}, ${activeBin?.longitude}`}
								</div>
							</div>
							<div className="h-full w-full z-30 bg-neutral-0">
								<LineChart data={activeBin.data} />
							</div>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}
