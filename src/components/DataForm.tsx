import osmtogeojson from "osmtogeojson";
import { useState } from "react";
import { useMap } from "react-leaflet";

import { type BBox, fetchOSMData } from "../utils";
import { TextField } from "./TextField";

export function DataForm() {
  const map = useMap();
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const isValid = formElement.checkValidity();

    if (isValid) {
      const formData = new FormData(formElement);
      const bbox = Object.fromEntries(formData.entries()) as unknown as BBox;
      const { minLon, minLat } = bbox;

      try {
        const data = await fetchOSMData(bbox);
        const geojson = osmtogeojson(data);

        console.info(geojson);

        map.flyTo([minLon, minLat], 10, {
          duration: 2,
        });
      } catch (e) {
        setError((e as { message: string }).message);
      }
    }
  };

  return (
    <form noValidate className="absolute form-wrapper" onSubmit={onSubmit}>
      <TextField
        required
        id="min_lon"
        name="minLon"
        label="Min Longitude"
        type="number"
        step="0.01"
        min="-180"
        max="180"
      />
      <TextField
        required
        id="min_lat"
        name="minLat"
        label="Min Latitude"
        type="number"
        step="0.01"
        min="-90"
        max="90"
      />
      <TextField
        required
        id="max_lon"
        name="maxLon"
        label="Max Longitude"
        type="number"
        step="0.01"
        min="-180"
        max="180"
      />
      <TextField
        required
        id="max_lat"
        name="maxLat"
        label="Max Latitude"
        type="number"
        step="0.01"
        min="-90"
        max="90"
      />
      <p className="error">{error}</p>
      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
}
