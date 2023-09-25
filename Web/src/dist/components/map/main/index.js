"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_leaflet_1 = require("react-leaflet");
const leaflet_1 = __importDefault(require("leaflet"));
require("leaflet/dist/leaflet.css");
const pin_svg_1 = __importDefault(require("../../../assets/icons/pin.svg"));
const selected_pin_svg_1 = __importDefault(require("../../../assets/icons/selected-pin.svg"));
const icon = new leaflet_1.default.Icon({
    iconUrl: pin_svg_1.default,
    iconSize: [64, 64],
    iconAnchor: [35, 50],
});
const selectedIcon = new leaflet_1.default.Icon({
    iconUrl: selected_pin_svg_1.default,
    iconSize: [64, 64],
    iconAnchor: [35, 50],
});
const mapTileLayers = [
    "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=e5e9ad4420d04a2d8efe2bcfe069c5d4",
    "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",
    "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-lines/{z}/{x}/{y}.png",
];
function MapComponent(props) {
    return (react_1.default.createElement(react_leaflet_1.MapContainer, { center: props.center, zoom: props.zoom, style: { height: "100%", width: "100%" } },
        react_1.default.createElement(react_leaflet_1.TileLayer, { url: props.layerStyle
                ? mapTileLayers[props.layerStyle]
                : mapTileLayers[0] }),
        props.bins.map((bin, index) => {
            var _a;
            return (react_1.default.createElement(react_leaflet_1.Marker, { position: [parseFloat(bin.latitude), parseFloat(bin.longitude)], icon: icon, key: index },
                react_1.default.createElement(react_leaflet_1.Tooltip, null, ((_a = bin.data[0]) === null || _a === void 0 ? void 0 : _a.record) ? `${bin.data[0].record}%` : "unavailable")));
        })));
}
exports.default = MapComponent;
