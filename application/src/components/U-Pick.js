import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import Footer from "./Footer";
import Business from "./Business";
import { Link } from "react-router-dom";
import db from "../firebase";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: "U-Pick", url: "/upick" },
  { title: "Activity", url: "/activity" },
  { title: "Maps", url: "/maps" },
  { title: "Profile", url: "/profile" },
];

const mainFeaturedPost = {
  title: "U-Pick Apples Near Me",
  description:
    "Find out which businesses near you have U-Pick apples available, click on a business to see location, time, and details",
  image: "https://source.unsplash.com/random/?apples",
  imgText: "main image description",
};

export default function Upick() {
  const classes = useStyles();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("users").onSnapshot(function (data) {
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };

    fetchData();
  }, []);

  console.log("Posts", posts);

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title="Local Orchards" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={2}>
            {posts.map((post, index) => (
              <Business key={index} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
}
