import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import MarkersPopup from "./MarkersPopup";


function Maps({data, configuration}) {
    return (
        <div>
            <MapContainer center={configuration.center} zoom={configuration.zoom} scrollWheelZoom={configuration.scrollWheelZoom} style={configuration.style}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">ResCity</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    data.map((item,index) => {
                        return (
                            <MarkersPopup lat={item.lat} lon={item.lon}/>
                        )
                    })
                }
            </MapContainer>
        </div>
    )
}

export default Maps
