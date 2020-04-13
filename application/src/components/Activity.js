import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import post1 from "./blog-post.1.md";
import post2 from "./blog-post.2.md";
import post3 from "./blog-post.3.md";
import Business from "./Business";
import Post from "./Post";
import db from "../firebase";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: "Posts", url: "#" },
  { title: "Activity", url: "/blog" },
  { title: "Maps", url: "/maps" },
  { title: "Profile", url: "#" },
];

const mainFeaturedPost = {
  title: "U-Pick Apples Near Me",
  description:
    "Find out which businesses near you have U-Pick apples available, click on a business to see location, time, and details",
  image: "https://source.unsplash.com/random/?apples",
  imgText: "main image description",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random/?apples",
    imageText: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random/?apples",
    imageText: "Image Text",
  },
  {
    title: "Post title 2",
    date: "Nov 1",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random/?apples",
    imageText: "Image Text",
  },
];

export default function Blog() {
  const classes = useStyles();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("posts").onSnapshot(function (data) {
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
  );
}
