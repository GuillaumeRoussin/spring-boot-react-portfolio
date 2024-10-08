import {useState} from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    MarkerProps,
    FeatureGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {LatLngExpression} from "leaflet";
import {EditControl} from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";

//TODO marker polygon editing
type Polygon = LatLngExpression[][];

interface ShapeData {
    id: string;
    shapeType: string;
    coordinates: Polygon;
}

interface Location {
    lat: number;
    lng: number;
    id: string;
}

export function Map() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [shapes, setShapes] = useState<ShapeData[]>([]);

    const handleCreate = (e: any) => {
        const type = e.layerType;
        const layer = e.layer;

        if (type === "marker") {
            const {lat, lng} = layer.getLatLng();
            setLocations((prevState) => ([...prevState, {lat: lat, lng: lng, id: layer._leaflet_id.toString()}]))
        } else if (type === "polygon") {
            setShapes((prevState) => ([...prevState, {
                id: layer._leaflet_id.toString(),
                shapeType: type,
                coordinates: layer.getLatLngs() as Polygon
            }]));
        }
    };

    const handleDelete = (e: any) => {
        const layers = e.layers._layers;

        Object.values(layers).forEach((layer: any) => {
            if (layer instanceof L.Marker) {
                const id = (layer as any)._leaflet_id.toString();
                setLocations(locations.filter((location) => location.id !== id));
            } else if (layer instanceof L.Polygon) {
                const id = (layer as any)._leaflet_id.toString();
                setShapes(shapes.filter((shape) => shape.id !== id));
            }
        });
    };

    const handleEdit = (e: any) => {
        const layers = e.layers._layers;

        Object.values(layers).forEach((layer: any) => {
            if (layer instanceof L.Polygon) {
                const id = (layer as any)._leaflet_id.toString();
                const coordinates = layer.getLatLngs() as Polygon;
                setShapes(shapes.map((shape) => (shape.id === id ? {...shape, coordinates} : shape)));
            }
        });
    };

    return (
        <div>
            <h1>Submit and Remove Locations and Shapes on Map</h1>
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{height: "500px", width: "500px"}}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={handleCreate}
                        onDeleted={handleDelete}
                        onEdited={handleEdit}
                        draw={{
                            rectangle: false,
                            polygon: true,
                            circle: false,
                            marker: true,
                            polyline: false,
                            circlemarker: false,
                        }}
                    />
                </FeatureGroup>
                {locations.map((location, idx) => (
                    <Marker
                        key={idx}
                        position={location as MarkerProps["position"]}
                    />
                ))}
            </MapContainer>
            <div>
                <h3>Submitted Locations:</h3>
                <ul>
                    {locations.map((location) => (
                        <li key={location.id}>
                            Latitude: {location.lat}, Longitude: {location.lng}, Id : {location.id}
                            <button onClick={() => setLocations(locations.filter((l) => l.id !== location.id))}
                                    style={{marginLeft: '10px'}}>Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Submitted Shapes:</h3>
                <ul>
                    {shapes.map((shape) => (
                        <li key={shape.id}>
                            Polygon ID: {shape.id}, coordinates : {shape.coordinates.toString()}
                            <button onClick={() => setShapes(shapes.filter((s) => s.id !== shape.id))}
                                    style={{marginLeft: '10px'}}>Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
