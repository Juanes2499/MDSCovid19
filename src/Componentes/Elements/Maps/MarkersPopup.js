import React from 'react'
import { Marker, Popup, Tooltip } from "react-leaflet";
import {IconLocation} from "./IconLocation";


const MarkersPopup = ({lat,lon}) => {
    return (
        <div>
            <Marker position={[lat,lon]} icon={IconLocation}>
                <Popup>Popup for Marker</Popup>
                <Tooltip>Tooltip for Marker</Tooltip>
            </Marker>
        </div>
    )
}

export default MarkersPopup
