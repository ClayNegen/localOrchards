import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import "./components.css";
import db from "../firebase";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Post from "./Post";

const sections = [
  { title: "U-Pick", url: "/upick" },
  { title: "Activity", url: "/activity" },
  { title: "Maps", url: "/maps" },
  { title: "Profile", url: "/profile" },
];

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default function Profile() {
  const id = "ETuJfpm1TinVG6bQ4c3x";
  const classes = useStyles();
  const date = new Date();
  const [post, setPost] = React.useState({
    user: id,
    date: date.toDateString(),
    sortBy: date.getTime(),
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [posts, setPosts] = React.useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    document.getElementById("post").value = "";
    if (post.content) {
      console.log("You are submitting " + post);
      db.collection("posts").add(post);
    } else {
      console.log("Enter a post!");
    }
  };

  const myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    setPost({ ...post, [nam]: val });
  };

  React.useEffect(() => {
    fetchData();
    fetchPosts();
  }, []);

  const fetchData = async () => {
    db.collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        setCurrentUser(doc.data());
        setPost({ ...post, business: doc.data().business_title });
      });
  };

  const fetchPosts = async () => {
    db.collection("posts").onSnapshot(function (data) {
      let id = "ETuJfpm1TinVG6bQ4c3x";
      let arr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let p = arr.filter((post) => post.user === id);
      setPosts(p);
    });
  };

  return (
    <div class="Profile">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Local Orchards" sections={sections} />
          <main>
            <h1>Your Profile</h1>
            <ProfileList item={currentUser} />
            <h1>Business</h1>
            <BusinessList item={currentUser} />
          </main>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="text"
                  fullWidth
                  id="post"
                  label="Write a post..."
                  name="content"
                  onChange={myChangeHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit Post
            </Button>
          </form>
          <h1>Your Posts</h1>
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Post key={post.title} post={post} />
            ))}
          </Grid>
        </Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </React.Fragment>
    </div>
  );
}

function ProfileList(props) {
  return (
    <div>
      <p>
        Name: {props.item.firstName} {props.item.lastName}
      </p>
      <p>Email: {props.item.email}</p>
    </div>
  );
}

function BusinessList(props) {
  return (
    <div>
      <p>Name: {props.item.business_title}</p>
      <p>
        Address: {props.item.address}, {props.item.city}, {props.item.state},{" "}
        {props.item.country}
      </p>
      <p>
        Hours: {props.item.hours_from} - {props.item.hours_to}
      </p>
      <p>Webiste: {props.item.website}</p>
      <p>Description: {props.item.description}</p>
    </div>
  );
}
