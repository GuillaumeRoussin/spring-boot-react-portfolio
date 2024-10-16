import {MapPin, Pencil, ChevronDown, ChevronUp} from "lucide-react";
import {LatLng, Map as LeafletMap} from "leaflet";
import {useLocationsStateManager} from "@/contexts/locations-context.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ScrollArea} from "@radix-ui/react-scroll-area";
import {Button} from "@/components/ui/button"
import {useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"

export function MapRestitution({map}: {
    map: LeafletMap;
}) {
    const {locations, setOpen, setId} = useLocationsStateManager();
    const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
    const toggleOpen = (id: string) => {
        setOpenStates(prev => ({...prev, [id]: !prev[id]}))
    }
    const handleFlyTo = (latlng: LatLng) => {
        map.flyTo(latlng);
    }
    const handleEdit = (id: string) => {
        setOpen(true);
        setId(id);
    }
    return (
        <Card className="h-full rounded-none border-r">
            <CardHeader className="p-4">
                <CardTitle>Locations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[calc(100%-4rem)] px-4">
                    {locations.map((location) => (
                        <Collapsible
                            key={location.id}
                            open={openStates[location.id]}
                            onOpenChange={() => toggleOpen(location.id)}
                        >
                            <div className="mb-4 p-2 border rounded-md">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold">{location.name}</h3>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(location.id)}>
                                            <Pencil className="h-4 w-4"/>
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button variant="ghost" size="icon"
                                                onClick={() => handleFlyTo(location.shapeType === "marker" ? location.coordinates : location.coordinates[0][0])}>
                                            <MapPin className="h-4 w-4"/>
                                            <span className="sr-only">Go to location</span>
                                        </Button>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                {openStates[location.id] ? (
                                                    <ChevronUp className="h-4 w-4"/>
                                                ) : (
                                                    <ChevronDown className="h-4 w-4"/>
                                                )}
                                                <span className="sr-only">Toggle coordinates</span>
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{location.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    ID: {location.id}
                                </p>
                                <CollapsibleContent>
                                    <div className="mt-2 text-xs">
                                        <h4 className="font-semibold">Coordinates:</h4>
                                        {location.shapeType === "polygon" ? (
                                            <ul className="list-disc list-inside">
                                                {location.coordinates[0].map((coord, coordIndex) => (
                                                    <li key={coordIndex}>
                                                        {`lat: ${coord.lat}, lng: ${coord.lng}`}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <ul className="list-disc list-inside">
                                                <li key={`coord-${location.id}`}>
                                                    {`lat: ${location.coordinates.lat}, lng: ${location.coordinates.lng}`}
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </CollapsibleContent>
                            </div>
                        </Collapsible>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}