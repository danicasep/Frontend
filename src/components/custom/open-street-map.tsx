import { useCustomState } from "@/core/helper/state.helper";
import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import React from "react";
import { NextPage } from "next";
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { Autocomplete, Button, TextField } from "@mui/material";

const icon = L.icon({ iconUrl: "/marker-icon.png" });

export interface IMap {
  x: number, // lon,
  y: number, // lat,
  label: string, // formatted address
  bounds: [
    [number, number], // s, w - lat, lon
    [number, number], // n, e - lat, lon
  ],
  raw: any, // raw provider result
}

const OpenStreetMap: NextPage<{ 
  loading?: boolean, 
  longitude?: number, 
  latitude?: number, 
  onChange: (lat: number, lng: number) => void 
}> = ({
  latitude, longitude, onChange, loading
}) => {

  const { state, setState } = useCustomState<{
    longitude?: number,
    latitude?: number,
    mapState?: L.Map,
    maps?: IMap[];
    map?: IMap;
  }>({
    latitude: latitude ?? -7.0319601,
    longitude: longitude ?? 109.5229989,
    maps: [],
    map: null
  });
  
  const markerRef = useRef(null)

  const eventDraggable = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const {lat, lng} = marker.getLatLng();
          setState({
            latitude: lat,
            longitude: lng
          })
        }
      },
    }),
    [],
  )

  const ZOOM_LEVEL = 12;

  useEffect(() => {
    if(!state?.latitude && !state?.longitude) navigator.geolocation.getCurrentPosition(function (position) {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
      state?.mapState?.flyTo([position.coords.latitude, position.coords.longitude]);
    })
  }, []);

  const OtherComponent = () => {
    const map = useMap();
    if (!state?.mapState) {
      setState({
        mapState: map
      })
    }
    return null;
  }

  useEffect(() => {
    if(state?.mapState) {
      onChange(state?.latitude, state?.longitude);
    }
  }, [state?.latitude, state?.longitude])

  useEffect(() => {
    if(state?.mapState) {
      state?.mapState?.flyTo([latitude, longitude]);

      setState({
        latitude: latitude,
        longitude: longitude,
      })
      onChange(latitude, longitude);
    }
  }, [latitude ?? null, longitude ?? null])

  return <>
    <Autocomplete
      sx={{ marginY: 2 }}
      options={state?.maps}
      disabled={loading ?? false}
      onChange={(evt, map) => {
        if(!map) return;
        state?.mapState?.flyTo([map.raw.lat, map.raw.lon])
        setState({ latitude: map.raw.lat, longitude: map.raw.lon, map: map})
      }}
      getOptionLabel={(map) => map.label}
      renderInput={(params) => <TextField {...params} label="Cari ..." onChange={async (evt) => {
        const provider = new OpenStreetMapProvider();
        const results = await provider.search({ query: evt.currentTarget.value });
        setState({
          maps: results
        })
      }}
      />}
    />
    { (longitude && latitude) && (longitude != state?.longitude && latitude != state?.latitude) ? <Button onClick={() => {
      setState({longitude: longitude, latitude: latitude})
      state?.mapState?.flyTo([latitude, longitude])
    }}>Reset</Button> : null}
    <MapContainer center={[state?.latitude, state?.longitude]} zoom={ZOOM_LEVEL} style={{ width: "100%", height: 400 }}>
      <OtherComponent />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        draggable={typeof loading === 'undefined' ? true : !loading}
        eventHandlers={eventDraggable}
        icon={icon}
        position={[
          state?.latitude,
          state?.longitude,
        ]}
        ref={markerRef}
      >
        {state?.map ? <Popup>{state?.map?.label}</Popup> : null}
      </Marker>
    </MapContainer>
  </>
}

export default OpenStreetMap;