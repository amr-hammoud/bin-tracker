import React, { useMemo, useRef } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import pin from "../../../assets/icons/pin.svg";
import L from "leaflet";

const center = {
	lat: 34.0,
	lng: 36.0,
};

interface LocationInputProps {
	lat: string;
	lng: string;
	onLocationChange: (lat: number, lng: number) => void;
}

export default function LocationInput(props: LocationInputProps) {
	const icon = new L.Icon({
		iconUrl: pin,
		iconSize: [64, 64],
		iconAnchor: [35, 50],
	});

	const markerRef = useRef<L.Marker | null>(null);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					const latLng = marker.getLatLng();
					props.onLocationChange(latLng.lat, latLng.lng);
				}
			},
		}),
		[]
	);

	return (
		<MapContainer
			center={center}
			zoom={8}
			style={{ height: "100%", width: "100%" }}
			scrollWheelZoom={true}
		>
			<TileLayer
				url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
			/>

			<Marker
				draggable={true}
				eventHandlers={eventHandlers}
				position={[parseFloat(props.lat),parseFloat(props.lng)]}
				ref={markerRef}
				icon={icon}
			>
				<Tooltip>Drag to position</Tooltip>
			</Marker>
		</MapContainer>
	);
}
