import {useMemo, useState} from "react";
import {FeatureGroup, MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, {LatLngExpression, Map as LeafletMap} from "leaflet";
import {EditControl} from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import MiniMapControl from "@/pages/locations/mini-map-control.tsx";
import {MapRestitution} from "@/pages/locations/map-restitution.tsx";
import {LocationForm} from "@/forms/location-form.tsx";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import {useLocationsStateManager} from "@/contexts/locations-context.tsx";


export interface ShapeData {
    name?: string;
    description?: string;
    id: string;
    shapeType: string;
    coordinates: LatLngExpression[][];
}

export interface Location {
    name?: string;
    description?: string;
    lat: number;
    lng: number;
    id: string;
}

export function Map() {
    const [map, setMap] = useState<LeafletMap | null>(null)
    const {locations, setLocations, shapes, setShapes, id, setId, open, setOpen} = useLocationsStateManager();
    const handleCreate = (e: any) => {
        console.log(locations);
        const type = e.layerType;
        const layer = e.layer;

        if (type === "marker") {
            const {lat, lng} = layer.getLatLng();
            setLocations((prevState) => ([...prevState, {
                lat: lat,
                lng: lng,
                id: layer._leaflet_id.toString()
            }]))
        } else if (type === "polygon") {
            setShapes((prevState) => ([...prevState, {
                id: layer._leaflet_id.toString(),
                shapeType: type,
                coordinates: layer.getLatLngs() as LatLngExpression[][]
            }]));
        }
        setOpen(true);
        setId(layer._leaflet_id.toString());
    };

    const handleDelete = (e: any) => {
        const layers = e.layers._layers;

        Object.values(layers).forEach((layer: any) => {
            const id = (layer as any)._leaflet_id.toString();
            if (layer instanceof L.Marker) {
                setLocations(locations.filter((location) => location.id !== id));
            } else if (layer instanceof L.Polygon) {
                setShapes(shapes.filter((shape) => shape.id !== id));
            }
        });
    };

    const handleEdit = (e: any) => {
        const layers = e.layers._layers;
        Object.values(layers).forEach((layer: any) => {
            const id = (layer as any)._leaflet_id.toString();
            if (layer instanceof L.Marker) {
                const {lat, lng} = layer.getLatLng();
                setLocations((prevState) => {
                    const prevLocation = prevState.find(location => location.id === id);
                    const filteredLocations = prevState.filter((location) => location.id !== id);
                    return [...filteredLocations, {
                        lat: lat,
                        lng: lng,
                        id: id,
                        name: prevLocation?.name,
                        description: prevLocation?.description,
                    }]
                });
            } else if (layer instanceof L.Polygon) {
                setShapes((prevState) => {
                    const prevShape = prevState.find(shape => shape.id === id);
                    const filteredShapes = prevState.filter((shape) => shape.id !== id);
                    return [...filteredShapes, {
                        id: id,
                        shapeType: "polygon",
                        coordinates: layer.getLatLngs() as LatLngExpression[][],
                        name: prevShape?.name,
                        description: prevShape?.description,
                    }]
                });
            }
        });
    };


    const displayMap = useMemo(
        () => {
            return (
                <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    style={{height: "60%", width: "100%"}}
                    ref={setMap}
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
                    <MiniMapControl position={"topleft"}/>
                </MapContainer>)
        },
        [],
    )
    return (
        <div className={"grid grid-flow-row-dense grid-cols-3 lg:container lg:mx-auto"}>
            <div className={`col-span-2 ${open ? 'invisible' : 'visible'}`}>
                {displayMap}
            </div>
            <div>
                {map ? <MapRestitution
                    map={map}
                /> : null}
                <Dialog open={open} onOpenChange={() => {
                    setOpen(false);
                    setId(null);
                }}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Name and description</DialogTitle>
                            <DialogDescription>
                                Please provide a name and a short description.
                            </DialogDescription>
                        </DialogHeader>
                        {id ? <LocationForm/> : null}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
