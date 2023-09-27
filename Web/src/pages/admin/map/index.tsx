import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Bin, Token } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import MapComponent from "../../../components/map/main";
import { sendRequest } from "../../../configs/request";
import { LatLngLiteral } from "leaflet";
import LineChart from "../../../components/map/chart";

export default function AdminMap() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const collapse: boolean = useSelector(
		(state: RootState) => state.sidebar.collapse
	);

	const [activeStyle, setActiveStyle] = useState<number>(0);
	const [activeBin, setActiveBin] = useState<Bin | null>(null);
	const [mapPosition, setMapPosition] = useState<LatLngLiteral>({
		lat: 34.0,
		lng: 36.0,
	});

	const [binsList, setBinList] = useState<Bin[]>([]);

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

	const [routeSuggestion, setRouteSuggestion] = useState();

	const formatBins = (binsList: Bin[]) => {
		return binsList.map((bin) => ({
			latitude: bin.latitude,
			longitude: bin.longitude,
			fill_level:
				bin.data.length > 0 ? bin.data[bin.data.length - 1].record : 0,
			last_pickup_time: bin.last_pickup_time,
		}));
	};

	const prepareAndSendToAPI = async () => {
		try {
			const filteredBins = binsList.filter((bin: Bin) =>
				bin.data.some((record: any) => record.record >= 90)
			);

			if (filteredBins.length === 0) {
				console.log("No bins with fill level above 90% found.");
				return;
			}

			const bins = formatBins(binsList);

			const osrmResponse = await sendRequest({
				method: "POST",
				route: "bins/best-route",
				body: { bins: bins },
				token,
			});

			const routeData = osrmResponse.data;
			setRouteSuggestion(routeData);
			console.log("Optimal route data:", routeData);
		} catch (error) {
			console.error("Error calculating optimal route:", error);
		}
	};


	return (
		<div className="flex h-screen w-full">
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
			<div
				className={`flex flex-col w-full relative ${
					collapse ? "ml-20" : "ml-52"
				}`}
			>
				<Navbar
					label="Map"
					buttonLabel="Suggest Route"
					buttonAction={() => prepareAndSendToAPI()}
				/>
				<div className={`w-full h-full z-10`}>
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
						osrmResponse={routeSuggestion}
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
							Default
						</div>
						<div
							className={`flex flex-wrap justify-center content-center p-2 text-center
										rounded-md border border-neutral-700 ${
											activeStyle === 1
												? "bg-primary-100"
												: ""
										}
										hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`}
							onClick={() => setActiveStyle(1)}
						>
							Atlas
						</div>
						<div
							className={`flex flex-wrap justify-center content-center p-2 text-center
							rounded-md border border-neutral-700 ${
								activeStyle === 2 ? "bg-primary-100" : ""
							}
							hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`}
							onClick={() => setActiveStyle(2)}
						>
							Terrain
						</div>
						<div
							className={`flex flex-wrap justify-center content-center p-2 text-center
							rounded-md border border-neutral-700 ${
								activeStyle === 3 ? "bg-primary-100" : ""
							}
							hover:border-primary-500 hover:bg-primary-200 hover:cursor-pointer`}
							onClick={() => setActiveStyle(3)}
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
							<div className="flex flex-col h-fit p-4 gap-2 text-gunmetal w-full">
								<div>
									<span className="font-bold">ID:</span>{" "}
									{activeBin?._id}
								</div>
								<div>
									<span className="font-bold">
										Name:
									</span>{" "}
									{activeBin?.name}
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
