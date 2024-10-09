import {useCallback, useState, useMemo} from 'react';
import {MapContainer, useMap, useMapEvent, TileLayer, Rectangle} from 'react-leaflet';
import {LatLngBounds, Map as LeafletMap} from 'leaflet';
import {useEventHandlers, useLeafletContext} from '@react-leaflet/core';

const POSITION_CLASSES: Record<string, string> = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
};

const BOUNDS_STYLE = {weight: 1};

interface MinimapBoundsProps {
    parentMap: LeafletMap;
    zoom: number;
}

function MinimapBounds({parentMap, zoom}: MinimapBoundsProps) {
    const minimap = useMap();
    const context = useLeafletContext();
    const onClick = useCallback(
        (e: any) => {
            parentMap.setView(e.latlng, parentMap.getZoom());
        },
        [parentMap],
    );

    useMapEvent('click', onClick);

    const [bounds, setBounds] = useState<LatLngBounds>(parentMap.getBounds());

    const onChange = useCallback(() => {
        setBounds(parentMap.getBounds());
        // Update the minimap's view to match the parent map's center and zoom
        minimap.setView(parentMap.getCenter(), zoom);
    }, [minimap, parentMap, zoom]);

    // Listen to events on the parent map
    const handlers = useMemo(() => ({move: onChange, zoom: onChange}), [onChange]);

    useEventHandlers({instance: parentMap, context}, handlers);

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE}/>;
}

interface MinimapControlProps {
    position?: keyof typeof POSITION_CLASSES;
    zoom?: number;
}

function MinimapControl({position, zoom = 0}: MinimapControlProps) {
    const parentMap = useMap();

    const minimap = useMemo(
        () => (
            <MapContainer
                style={{height: 80, width: 80}}
                center={parentMap.getCenter()}
                zoom={zoom}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                attributionControl={false}
                zoomControl={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <MinimapBounds parentMap={parentMap} zoom={zoom}/>
            </MapContainer>
        ),
        [parentMap, zoom],
    );

    const positionClass = POSITION_CLASSES[position || 'topright'];

    return (
        <div className={positionClass}>
            <div className="leaflet-control leaflet-bar">{minimap}</div>
        </div>
    );
}

export default MinimapControl;
