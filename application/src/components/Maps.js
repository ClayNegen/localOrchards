import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import "./components.css";
import GoogleMaps from "./GoogleMaps";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import db from "../firebase";

const sections = [
  { title: "Posts", url: "/blog" },
  { title: "Activity", url: "#" },
  { title: "Maps", url: "/maps" },
  { title: "Profile", url: "#" },
];

export default function Maps() {
  const [location, setLocation] = React.useState(null);
  const [places, setPlaces] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("users").onSnapshot(function (data) {
        setPlaces(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLocation(data.docs.map((doc) => ({ ...doc.data() })));
      });
    };

    fetchData();
  }, []);

  console.log("Places: ", places);

  const clicked = (item) => {
    console.log("clicked: ", item);
    let l = [
      {
        address: item.address,
        city: item.city,
        state: item.state,
      },
    ];
    setLocation(l);
    console.log("LocoLoco: ", l);
  };

  const GoogooMap = location ? <GoogleMaps location={location[0]} /> : null;
  console.log("Location: ", location);

  return (
    <div className="Maps">
      <React.Fragment>
        <Container maxWidth="lg">
          <Header title="Local Orchards" sections={sections} />
          <main>
            <Card>
              {GoogooMap}
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
            </Card>
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
  return (
    <CardActionArea onClick={props.callback}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2"></Typography>
        {props.title}
        <Typography variant="body2" color="textSecondary" component="p">
          {props.des}
        </Typography>
        <a href={props.url}>{props.url}</a>
      </CardContent>
    </CardActionArea>
  );
}
