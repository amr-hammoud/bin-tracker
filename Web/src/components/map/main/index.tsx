import React, { useEffect, useState, useRef } from "react";
import {
	MapContainer,
	Marker,
	Polyline,
	TileLayer,
	Tooltip,
} from "react-leaflet";
import L, { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import pin from "../../../assets/icons/pin.svg";
import selectedPin from "../../../assets/icons/selected-pin.svg";
import { Bin } from "../../../store/interfaces";
import polyline from "@mapbox/polyline";

interface MapProps {
	center: LatLngLiteral | undefined;
	zoom: number;
	layerStyle: number;
	bins: Array<Bin>;
	activeBin?: Bin | null;
	positionSetter: (position: LatLngLiteral) => void;
	activeBinSetter: (bin: Bin | null) => void;
	onbinClick: (e: any) => void;
	routeString?: string;
}

const icon = new L.Icon({
	iconUrl: pin,
	iconSize: [64, 64],
	iconAnchor: [35, 50],
});

const selectedIcon = new L.Icon({
	iconUrl: selectedPin,
	iconSize: [64, 64],
	iconAnchor: [35, 50],
});

const mapTileLayers = [
	"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	"https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=e5e9ad4420d04a2d8efe2bcfe069c5d4",
	"https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",
	"https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-lines/{z}/{x}/{y}.png",
];

export default function MapComponent(props: MapProps) {
	const [decodedRoute, setDecodedRoute] = useState<[number, number][]>([]);

	useEffect(() => {
		const decodedGeometry = decodeOSRMGeometry(
			props.routeString ? props.routeString : ""
		);

		setDecodedRoute(decodedGeometry);
	}, [props.routeString]);

	function decodeOSRMGeometry(encodedGeometry: string): [number, number][] {
		return polyline
			.decode(encodedGeometry)
			.map((coord: [number, number]) => [coord[1], coord[0]]);
	}

	const mapRef = useRef<any | null>(null);

	useEffect(() => {
		try {
			let selectedBinCoordinates: LatLngLiteral;
			props.activeBin && props.activeBin !== null
				? (selectedBinCoordinates = {
						lat: parseFloat(props.activeBin?.latitude),
						lng: parseFloat(props.activeBin?.longitude),
				  })
				: console.log("");

			mapRef.current
				? mapRef.current.flyTo(
						[props.activeBin?.latitude, props.activeBin?.longitude],
						17
				  )
				: console.log("");
		} catch (error) {
			console.log(error);
		}
	}, [props.activeBin]);

	return (
		<MapContainer
			center={props.center}
			zoom={props.zoom}
			style={{ height: "100%", width: "100%" }}
			ref={mapRef}
		>
				<TileLayer
					url={
						props.layerStyle
							? mapTileLayers[props.layerStyle]
							: mapTileLayers[0]
					}
				/>
			{props.bins.map((bin, index) => {
				return (
					<Marker
						position={[
							parseFloat(bin.latitude),
							parseFloat(bin.longitude),
						]}
						icon={
							bin._id === props.activeBin?._id
								? selectedIcon
								: icon
						}
						key={bin._id}
						eventHandlers={{
							click: () => props.activeBinSetter(bin),
						}}
					>
						<Tooltip>
							{bin.data[0]?.record
								? `${bin.data[0].record}%`
								: "unavailable"}
						</Tooltip>
					</Marker>
				);
			})}
			<Polyline positions={decodedRoute} color="blue" />
		</MapContainer>
	);
}
