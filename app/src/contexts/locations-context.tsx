import React, {createContext, ReactNode, useContext, useState} from "react";
import {Location, ShapeData} from "@/pages/locations/map.tsx";

export interface LocationsStateManagerContextProps {
    locations: Location[];
    setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
    shapes: ShapeData[];
    setShapes: React.Dispatch<React.SetStateAction<ShapeData[]>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string | null;
    setId: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface LocationsStateManagerProps {
    children: ReactNode;
}

const LocationsStateManagerContext = createContext<LocationsStateManagerContextProps | undefined>(undefined);

export const LocationsStateManager: React.FC<LocationsStateManagerProps> = ({
                                                                          children,
                                                                      }) => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [shapes, setShapes] = useState<ShapeData[]>([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState<string | null>(null);
    return (
        <LocationsStateManagerContext.Provider
            value={{
                locations,
                setLocations,
                shapes,
                setShapes,
                open,
                setOpen,
                id,
                setId,
            }}
        >
            {children}
        </LocationsStateManagerContext.Provider>
    );
};

export const useLocationsStateManager = (): LocationsStateManagerContextProps => {
    const context = useContext(LocationsStateManagerContext);

    if (!context) {
        throw new Error("Locations must be used within a FatStateManagerProvider");
    }

    return context;
};