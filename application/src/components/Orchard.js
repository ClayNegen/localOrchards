import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import db from "../firebase";
import Post from "./Post";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";

const sections = [
  { title: "U-Pick", url: "/upick" },
  { title: "Activity", url: "/activity" },
  { title: "Maps", url: "/maps" },
  { title: "Profile", url: "/profile" },
];

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage:
      "url(https://github.com/ClayNegen/localOrchards/blob/master/application/src/components/apples/10.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  header: {
    marginLeft: "0.5em",
  },
}));

function BigCard(props) {
  const classes = useStyles();
  const { item } = props;

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{
        backgroundImage: `url(${"https://source.unsplash.com/random/?apples"})`,
      }}
    >
      {
        <img
          style={{ display: "none" }}
          src={"https://source.unsplash.com/random/?apples"}
          alt={item.imageText}
        />
      }
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {item.business_title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Address: {item.address}, {item.city}, {item.state}, {item.country}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Hours: {item.hours_from} - {item.hours_to}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {item.description}
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              Visit us at...
            </Typography>
            <a
              style={{ fontSize: "1.5rem", color: "white" }}
              href={item.website}
            >
              {item.website}
            </a>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

BigCard.propTypes = {
  post: PropTypes.object,
};

export default function Orchard({ match }) {
  const classes = useStyles();

  React.useEffect(() => {
    fetchOrchards();
    fetchPosts();
  }, []);

  const [orchard, setOrchard] = React.useState({});
  const [posts, setPosts] = React.useState([]);

  const fetchOrchards = async () => {
    db.collection("users")
      .doc(match.params.id)
      .get()
      .then((doc) => {
        setOrchard(doc.data());
      });
  };

  const fetchPosts = async () => {
    db.collection("posts").onSnapshot(function (data) {
      let id = match.params.id;
      let arr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let p = arr.filter((post) => post.user === id);
      setPosts(p);
    });
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Local Orchards" sections={sections} />
          <main>
            <BigCard item={orchard} />
            <h1 className={classes.header}>Posts</h1>
            <Grid container spacing={4}>
              {posts.map((post, index) => (
                <Post key={index} post={post} />
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
