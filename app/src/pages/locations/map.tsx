import {useMemo, useState} from "react";
import {FeatureGroup, MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {LatLng, Map as LeafletMap} from "leaflet";
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

export interface MarkerLocation {
    shapeType: "marker";
    coordinates: LatLng;
}

export interface PolygonLocation {
    shapeType: "polygon";
    coordinates: LatLng[][];
}

export type Location = (MarkerLocation | PolygonLocation) & {
    id: string;
    name?: string;
    description?: string;
};

export function Map() {
    const [map, setMap] = useState<LeafletMap | null>(null)
    const {locations, setLocations, id, setId, open, setOpen} = useLocationsStateManager();

    const handleCreate = (e: any) => {
        const type = e.layerType;
        const layer = e.layer;

        setLocations((prevState) => ([...prevState, {
            coordinates: type === "marker" ? layer.getLatLng() : layer.getLatLngs(),
            shapeType: type,
            id: layer._leaflet_id.toString()
        }]));
        setOpen(true);
        setId(layer._leaflet_id.toString());
    };

    const handleDelete = (e: any) => {
        const layers = e.layers._layers;

        Object.values(layers).forEach((layer: any) => {
            const id = (layer as any)._leaflet_id.toString();
            setLocations(locations.filter((location) => location.id !== id));
        });
    };

    const handleEdit = (e: any) => {
        const layers = e.layers._layers;
        Object.values(layers).forEach((layer: any) => {
            const id = (layer as any)._leaflet_id.toString();
            setLocations((prevState) => {
                const prevLocation = prevState.find(location => location.id === id);
                const filteredLocations = prevState.filter((location) => location.id !== id);
                const shapeType = (prevLocation as Location).shapeType;
                return [...filteredLocations, {
                    id: id,
                    shapeType: (prevLocation as Location).shapeType,
                    coordinates: shapeType === "marker" ? layer.getLatLng() : layer.getLatLngs(),
                    name: prevLocation?.name,
                    description: prevLocation?.description,
                }]
            });
        });
    };

    const displayMap = useMemo(
        () => {
            return (
                <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    style={{height: "90%", width: "100%", zIndex: 5}}
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
        <>
            <div className="w-[30%] bg-background">
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
            <div className="w-[70%]">
                {displayMap}
            </div>
        </>
    );
}
