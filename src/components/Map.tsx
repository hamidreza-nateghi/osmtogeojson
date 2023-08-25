import type { PropsWithChildren } from "react";
import {
  type GeoJSONProps,
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

type Props = {
  geojsonData?: GeoJSONProps["data"];
};

export function Map({ geojsonData, children }: PropsWithChildren<Props>) {
  return (
    <MapContainer
      center={[52.5, 13.2]}
      zoom={10}
      zoomControl={false}
      className="h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <GeoJSON data={geojsonData} /> */}
      <ZoomControl position="bottomright" />
      {children}
    </MapContainer>
  );
}
