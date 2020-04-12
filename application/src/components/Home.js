import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import "./components.css";
import Typography from "@material-ui/core/Typography";

const sections = [
  { title: "Posts", url: "#" },
  { title: "Activity", url: "#" },
  { title: "Maps", url: "/maps" },
  { title: "Profile", url: "#" },
];

export default function Home() {
  return (
    <div class="Home">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Local Orchards" sections={sections} />
          <main>
            <div class="cover">
              <Typography class="middle">U-Pick Apples Near Me</Typography>
            </div>
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
