import React from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import L, { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import pin from "../../../assets/icons/pin.svg";
import selectedPin from "../../../assets/icons/selected-pin.svg";
import { Bin } from "../../../store/interfaces";

interface MapProps {
	center: LatLngLiteral | undefined;
	zoom: number;
	layerStyle?: number;
	bins: Array<Bin>;
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
	"https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=e5e9ad4420d04a2d8efe2bcfe069c5d4",
	"https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",
	"https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-lines/{z}/{x}/{y}.png",
];

export default function MapComponent(props: MapProps) {
	return (
		<MapContainer
			center={props.center}
			zoom={props.zoom}
			style={{ height: "100%", width: "100%" }}
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
					<Marker position={[parseFloat(bin.latitude), parseFloat(bin.longitude)]} icon={icon} key={index}>
						<Tooltip>{bin.data[0]?.record ? `${bin.data[0].record}%` : "unavailable"}</Tooltip>
					</Marker>
				);
			})}
		</MapContainer>
	);
}
