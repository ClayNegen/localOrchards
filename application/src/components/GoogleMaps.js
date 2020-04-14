import React, { useEffect, useRef } from "react";

// Variables
const GOOGLE_MAP_API_KEY = "AIzaSyA8I9ttWAFKaW7E8tZ9GC2ktb21PRAGmWk";
const myLocation = {
  //Grand Rapids
  lat: 42.9634,
  lng: -85.6681,
};
// styles
const mapStyles = {
  width: "100%",
  height: "400px",
};

function GoogleMaps(props) {
  const [lat, setLat] = React.useState("");
  const [lng, setLng] = React.useState("");
  let address = props.location.address;
  address = address.replace(/\s+/g, "+");
  let city = props.location.city;
  city = city.replace(/\s+/g, "+");
  let state = props.location.state;
  let loc = address + ",+" + city + ",+" + state;
  let link = `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${GOOGLE_MAP_API_KEY}`;

  React.useEffect(() => {
    fetch(link)
      .then((res) => res.json())
      .then((response) => {
        setLat(response.results[0].geometry.location.lat);
        setLng(response.results[0].geometry.location.lng);
      })
      .catch((error) => console.log("Error: ", error));
  });

  // refs
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const marker = useRef(null);

  // helper functions
  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 14,
      center: {
        lat: lat,
        lng: lng,
      },
    });

  const createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: googleMap.current,
    });

  // useEffect Hook
  useEffect(() => {
    //Maps
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      googleMap.current = createGoogleMap();
      marker.current = createMarker();
    });
  });

  return <div id="google-map" ref={googleMapRef} style={mapStyles} />;
}

export default GoogleMaps;
