"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_leaflet_1 = require("react-leaflet");
const pin_svg_1 = __importDefault(require("../../../assets/icons/pin.svg"));
const leaflet_1 = __importDefault(require("leaflet"));
const center = {
    lat: 34.0,
    lng: 36.0,
};
function LocationInput(props) {
    const icon = new leaflet_1.default.Icon({
        iconUrl: pin_svg_1.default,
        iconSize: [64, 64],
        iconAnchor: [35, 50],
    });
    const markerRef = (0, react_1.useRef)(null);
    const eventHandlers = (0, react_1.useMemo)(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker != null) {
                const latLng = marker.getLatLng();
                props.onLocationChange(latLng.lat, latLng.lng);
            }
        },
    }), []);
    return (react_1.default.createElement(react_leaflet_1.MapContainer, { center: center, zoom: 8, style: { height: "100%", width: "100%" }, scrollWheelZoom: true },
        react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
        react_1.default.createElement(react_leaflet_1.Marker, { draggable: true, eventHandlers: eventHandlers, position: [parseFloat(props.lat), parseFloat(props.lng)], ref: markerRef, icon: icon },
            react_1.default.createElement(react_leaflet_1.Tooltip, null, "Drag to position"))));
}
exports.default = LocationInput;
