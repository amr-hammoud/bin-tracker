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
const leaflet_1 = __importDefault(require("leaflet"));
require("leaflet/dist/leaflet.css");
const pin_svg_1 = __importDefault(require("../../../assets/icons/pin.svg"));
const selected_pin_svg_1 = __importDefault(require("../../../assets/icons/selected-pin.svg"));
const polyline_1 = __importDefault(require("@mapbox/polyline"));
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
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=e5e9ad4420d04a2d8efe2bcfe069c5d4",
    "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",
    "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-lines/{z}/{x}/{y}.png",
];
function MapComponent(props) {
    const [decodedRoute, setDecodedRoute] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const decodedGeometry = decodeOSRMGeometry(props.routeString ? props.routeString : "");
        setDecodedRoute(decodedGeometry);
    }, [props.routeString]);
    function decodeOSRMGeometry(encodedGeometry) {
        return polyline_1.default
            .decode(encodedGeometry)
            .map((coord) => [coord[1], coord[0]]);
    }
    const mapRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d;
        try {
            let selectedBinCoordinates;
            props.activeBin && props.activeBin !== null
                ? (selectedBinCoordinates = {
                    lat: parseFloat((_a = props.activeBin) === null || _a === void 0 ? void 0 : _a.latitude),
                    lng: parseFloat((_b = props.activeBin) === null || _b === void 0 ? void 0 : _b.longitude),
                })
                : console.log("");
            mapRef.current
                ? mapRef.current.flyTo([(_c = props.activeBin) === null || _c === void 0 ? void 0 : _c.latitude, (_d = props.activeBin) === null || _d === void 0 ? void 0 : _d.longitude], 17)
                : console.log("");
        }
        catch (error) {
            console.log(error);
        }
    }, [props.activeBin]);
    return (react_1.default.createElement(react_leaflet_1.MapContainer, { center: props.center, zoom: props.zoom, style: { height: "100%", width: "100%" }, ref: mapRef },
        react_1.default.createElement(react_leaflet_1.TileLayer, { url: props.layerStyle
                ? mapTileLayers[props.layerStyle]
                : mapTileLayers[0] }),
        props.bins.map((bin, index) => {
            var _a, _b;
            return (react_1.default.createElement(react_leaflet_1.Marker, { position: [
                    parseFloat(bin.latitude),
                    parseFloat(bin.longitude),
                ], icon: bin._id === ((_a = props.activeBin) === null || _a === void 0 ? void 0 : _a._id)
                    ? selectedIcon
                    : icon, key: bin._id, eventHandlers: {
                    click: () => props.activeBinSetter(bin),
                } },
                react_1.default.createElement(react_leaflet_1.Tooltip, null, ((_b = bin.data[0]) === null || _b === void 0 ? void 0 : _b.record)
                    ? `${bin.data[0].record}%`
                    : "unavailable")));
        }),
        react_1.default.createElement(react_leaflet_1.Polyline, { positions: decodedRoute, color: "blue" })));
}
exports.default = MapComponent;
