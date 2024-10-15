import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {MapPin, Pen} from "lucide-react";
import {latLng, LatLngExpression, Map as LeafletMap} from "leaflet";
import {useLocationsStateManager} from "@/contexts/locations-context.tsx";

export function MapRestitution({map}: {
    map: LeafletMap;
}) {
    const {locations, shapes, setOpen, setId} = useLocationsStateManager();
    const handleFlyTo = (latlng: LatLngExpression) => {
        map.flyTo(latlng);
    }
    const handleEdit = (id: string) => {
        setOpen(true);
        setId(id);
    }
    return (
        <div>
            <h1>Submit and Remove Locations and Shapes on Map</h1>
            <Accordion type="single" collapsible className="w-full">
                {locations.map((location) => (
                    <AccordionItem value={location.id} key={location.id}>
                        <AccordionTrigger className={"flex items-center space-x-2"}>
                            <span>Id : {location.id}, Name : {location.name}</span>
                            <Pen size={12} className={"cursor-pointer"} onClick={() => handleEdit(location.id)}/>
                            <MapPin size={12} className={"cursor-pointer"}
                                    onClick={() => handleFlyTo(latLng(location.lat, location.lng))}/>
                        </AccordionTrigger>
                        <AccordionContent className={"cursor-default"}>
                            <span>Latitude: {location.lat}, Longitude: {location.lng}, description : {location.description}</span>
                        </AccordionContent>
                    </AccordionItem>
                ))}
                {shapes.map((shape) => (
                    <AccordionItem value={shape.id} key={shape.id}>
                        <AccordionTrigger className={"flex items-center space-x-2"}>
                            <span>Id : {shape.id}, Name : {shape.name}</span>
                            <Pen size={12} className={"cursor-pointer"} onClick={() => handleEdit(shape.id)}/>
                            <MapPin size={12} className={"cursor-pointer"}
                                    onClick={() => handleFlyTo(shape.coordinates[0][0])}/>
                        </AccordionTrigger>
                        <AccordionContent className={"cursor-default"}>
                            <span>Polygon ID: {shape.id}, type : {shape.shapeType}, coordinates
                                : {shape.coordinates.toString()}, description : {shape.description}</span>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}