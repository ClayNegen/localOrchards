import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import "./components.css";
import firebase from "../firebase";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
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
  paper: {
    backgroundColor: "white",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const date = new Date();
  const [Id, setId] = React.useState("ETuJfpm1TinVG6bQ4c3x");
  const [post, setPost] = React.useState({
    user: Id,
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
      firebase.db.collection("posts").add(post);
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
    fetchUsers();
    fetchData();
    fetchPosts();
  }, []);

  const checkId = async (email, id) => {
    console.log("Email:", email);
    if (email === firebase.app.auth().currentUser.email) {
      setId(id);
    }
  };

  const fetchUsers = async () => {
    firebase.db
      .collection("users")
      .get()
      .then((data) => {
        data.docs.forEach((doc) => {
          checkId(doc.data().email, doc.id);
        });
      });
  };

  const fetchData = async () => {
    firebase.db
      .collection("users")
      .doc(Id)
      .get()
      .then((doc) => {
        setCurrentUser(doc.data());
        setPost({ ...post, business: doc.data().business_title });
      });
  };

  const fetchPosts = async () => {
    firebase.db.collection("posts").onSnapshot(function (data) {
      let id = "ETuJfpm1TinVG6bQ4c3x";
      let arr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let p = arr.filter((post) => post.user === id);
      p.sort((a, b) => b.sortBy - a.sortBy);
      setPosts(p);
    });
  };

  const signOut = () => {
    firebase.app.auth().signOut();
    console.log("Signed Out");
  };

  console.log("id: ", Id);
  return (
    <div class="Profile">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Local Orchards" sections={sections} />
          <main>
            <h1>Your Profile</h1>
            <ProfileList item={currentUser} />
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Card>
                  <CardActionArea onClick={signOut}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      style={{ textAlign: "center" }}
                    >
                      Log Out
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
            <h1>Business</h1>
            <BusinessList item={currentUser} />
          </main>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <Paper className={classes.pape}>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                id="post"
                label="Write a post..."
                name="content"
                onChange={myChangeHandler}
              />
            </Paper>
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
          <Grid container spacing={2}>
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
