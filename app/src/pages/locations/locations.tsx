import {Map} from "@/pages/locations/map.tsx";
import {LocationsStateManager} from "@/contexts/locations-context.tsx";

export function Locations() {
    return <LocationsStateManager><Map/></LocationsStateManager>;
}