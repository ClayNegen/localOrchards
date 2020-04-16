import React from "react";
import { Credentials } from "../config";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import "./components.css";
import GoogleMaps from "./GoogleMaps";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import firebase from "../firebase";

const sections = [
  { title: "U-Pick", url: "/upick" },
  { title: "Activity", url: "/activity" },
  { title: "Maps", url: "/maps" },
  { title: "Profile", url: "/profile" },
];

const useStyles = makeStyles((theme) => ({
  map: {
    marginBottom: theme.spacing(2),
  },
}));

const GOOGLE_MAP_API_KEY = Credentials[0].GoogleMapKey;

export default function Maps() {
  const classes = useStyles();
  const [lat, setLat] = React.useState(42.963421);
  const [lng, setLng] = React.useState(-85.68013);
  const [places, setPlaces] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      firebase.db.collection("users").onSnapshot(function (data) {
        setPlaces(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };

    fetchData();
  }, []);

  const clicked = (item) => {
    let address = item.address;
    let city = item.city;
    let state = item.state;
    let loc = address + ",+" + city + ",+" + state;
    let link = `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${GOOGLE_MAP_API_KEY}`;
    fetch(link)
      .then((res) => res.json())
      .then((response) => {
        setLat(response.results[0].geometry.location.lat);
        setLng(response.results[0].geometry.location.lng);
      })
      .catch((error) => console.log("Error: ", error));
  };

  return (
    <div className="Maps">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Local Orchards" sections={sections} />
          <main>
            <Card className={classes.map}>
              <GoogleMaps lat={lat} lng={lng} />
            </Card>
            {places.map((item, index) => (
              <Place
                key={index}
                title={item.business_title}
                url={item.website}
                des={item.description}
                value={item.address}
                callback={() => clicked(item)}
              />
            ))}
          </main>
        </Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </React.Fragment>
    </div>
  );
}

function Place(props) {
  const classes = useStyles();
  return (
    <Card className={classes.map}>
      <CardActionArea onClick={props.callback}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.des}
          </Typography>
          <a href={props.url}>{props.url}</a>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
