import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Bin, Token } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import MapComponent from "../../../components/map/main";
import { sendRequest } from "../../../configs/request";
import { LatLngLiteral } from "leaflet";
import { useParams } from "react-router-dom";
import LineChart from "../../../components/map/linechart";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../../../components/base/button";
import RangeSlider from "../../../components/map/rangeInput";
import toast, { Toaster } from "react-hot-toast";

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

	const { id } = useParams();

	const setActiveBinID = (data: Bin[]) => {
		let bins: any[] = [];
		id !== null
			? (bins = data.filter((bin: Bin) => {
					return bin._id === id;
			  }))
			: console.log("No Active Bin");

		id && bins.length > 0 ? setActiveBin(bins[0]) : setActiveBin(null);
	};

	const [binsList, setBinList] = useState<Bin[]>([]);

	useEffect(() => {
		getBins();
	}, []);

	const getBins = async () => {
		try {
			const response = await sendRequest({
				route: "bins/",
				token,
			});
			if (response.status === 200) {
				setBinList(response.data);
				setActiveBinID(response.data);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	const [suggestedRoute, setSuggestedRoute] = useState("");

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
			setSuggestedRoute("")
			if (filteredBins.length === 0) {
				toast.error("No Bins Selected, Modify the filter", {
					duration: 4000,
				});
				return;
			}
			const bins = formatBins(filteredBins);
			toast("Processing", {
				icon: "⚙️",
				duration: 500,
			});
			const osrmResponse = await sendRequest({
				method: "POST",
				route: "bins/best-route",
				body: { bins: bins },
				token,
			});

			if (osrmResponse.status === 200) {
				setTimeout(() => {
					toast.success("Route Suggestion Complete", {
						duration: 1500,
					});
					setSuggestedRoute(osrmResponse.data.geometry);
				}, 500);
			} else {
				setTimeout(() => {
					toast.error(
						"Something wrong happened,\nroute suggestion not complete",
						{
							duration: 4000,
						}
					);
				}, 500);
			}
		} catch (error) {
			console.error("Error calculating optimal route:", error);
		}
	};

	const [filterValues, setFilterValues] = useState<number[]>([0, 100]);
	const [filteredBins, setFilteredBins] = useState<Bin[]>([]);

	const filterBinsByFillLevel = (
		bins: Bin[],
		minFillLevel: number,
		maxFillLevel: number
	) => {
		return bins.filter((bin) => {
			const lastRecord =
				bin.data.length > 0
					? parseFloat(bin.data[bin.data.length - 1].record)
					: 0;
			return lastRecord >= minFillLevel && lastRecord <= maxFillLevel;
		});
	};

	useEffect(() => {
		const filteredBins = filterBinsByFillLevel(
			binsList,
			filterValues[0],
			filterValues[1]
		);
		setActiveBin(null);
		setFilteredBins(filteredBins);
	}, [filterValues]);

	useEffect(() => {
		const filteredBins = filterBinsByFillLevel(
			binsList,
			filterValues[0],
			filterValues[1]
		);
		setFilteredBins(filteredBins);
	}, [binsList]);

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
				/>
				<div>
					<Toaster />
				</div>
				<div className={`w-full h-full z-10`}>
					<MapComponent
						center={mapPosition}
						zoom={8}
						layerStyle={activeStyle}
						bins={filteredBins}
						positionSetter={() => setMapPosition}
						activeBin={activeBin}
						activeBinSetter={setActiveBin}
						onbinClick={(e) => {
							console.log(e);
						}}
						routeString={suggestedRoute}
					/>
				</div>
				<div className="absolute flex flex-col content-center gap-2 top-16 right-5 z-20">
					<div className="flex content-center gap-2">
						<h3 className="flex flex-wrap content-center m-1 font-semibold text-gunmetal">
							Style
						</h3>
						<div className="flex h-10 w-80 justify-around bg-neutral-0 shadow-lg p-2 gap-2 text-gunmetal rounded-md border border-primary-500">
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
					<div className="flex content-center gap-2">
						<h3 className="flex flex-wrap content-center m-1 font-semibold text-gunmetal">
							Filter
						</h3>
						<div className="flex h-fit w-80 bg-neutral-0 shadow-lg p-2 gap-2 text-gunmetal rounded-md border border-primary-500">
							<RangeSlider
								values={filterValues}
								setter={(values: number[]) =>
									setFilterValues(values)
								}
							/>
						</div>
					</div>
					<div className="flex content-center gap-2">
						<h3 className="flex flex-wrap content-center m-1 font-semibold text-gunmetal">
							Route
						</h3>
						<div>
							<Button label="Suggest Route" onClick={() => prepareAndSendToAPI()}/>
						</div>
						<div>
							<Button label="Clear Route" onClick={() => setSuggestedRoute("")}/>
						</div>
					</div>
				</div>
				{activeBin ? (
					<div className="absolute bottom-5 left-5 z-20 w-fit">
						<div className="flex flex-col h-fit w-fit bg-neutral-0 shadow-lg rounded-md border border-primary-500">
							<div className="flex justify-between pt-5 pl-5 pr-10">
								<div className="flex gap-2 m-1 font-semibold text-gunmetal">
									<div className="flex flex-wrap content-center text-primary-500 font-semibold text-lg">
										<RiDeleteBin6Line />
									</div>
									<div className="flex flex-wrap content-center text-primary-500 font-semibold text-lg">
										Active Bin
									</div>
								</div>
								<div>
									<Button
										label="Close"
										onClick={() => setActiveBin(null)}
									/>
								</div>
							</div>

							<div className="flex  p-3 ">
								<div className="flex flex-col h-fit p-4 gap-2 text-gunmetal w-fit mr-3">
									<div>
										<span className="font-bold">ID:</span>{" "}
										{activeBin?._id}
									</div>
									<div>
										<span className="font-bold">Name:</span>{" "}
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
								<div className=" h-52 w-96 z-30 bg-neutral-0">
									<LineChart data={activeBin.data} />
								</div>
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
