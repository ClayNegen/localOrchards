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

const sections = [
  { title: "Posts", url: "/blog" },
  { title: "Activity", url: "#" },
  { title: "Maps", url: "/maps" },
  { title: "Profile", url: "#" },
];

export default function Maps() {
  return (
    <div className="Maps">
      <React.Fragment>
        <Container maxWidth="lg">
          <Header title="Local Orchards" sections={sections} />
          <main>
            <Card>
              <GoogleMaps />
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard{" "}
                  </Typography>{" "}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6, 000 species, ranging across all continents except
                    Antarctica{" "}
                  </Typography>{" "}
                </CardContent>{" "}
              </CardActionArea>{" "}
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
