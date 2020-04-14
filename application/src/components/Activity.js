import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import Footer from "./Footer";
import Post from "./Post";
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
  title: "Local Orchard News",
  description:
    "Get the latest updates from apple orchards near you. Everything apple news and more..",
  image: "https://source.unsplash.com/random/?apples",
  imgText: "main image description",
};

export default function Blog() {
  const classes = useStyles();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("posts").onSnapshot(function (data) {
        let arr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        arr.sort((a, b) => b.sortBy - a.sortBy);
        console.log("Sorted Array: ", arr);
        setPosts(arr);
      });
    };

    fetchData();
  }, []);

  return (
    <div class="Activity">
      <React.Fragment>
        <Container maxWidth="lg">
          <Header title="Local Orchards" sections={sections} />
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
              {posts.map((post) => (
                <Post key={post.title} post={post} />
              ))}
            </Grid>
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
