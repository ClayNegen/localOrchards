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
}));

export default function Profile() {
  const id = "y8BdSU9uzH3T9Yriw1tF";
  const classes = useStyles();
  const date = new Date();
  const [post, setPost] = React.useState({
    user: id,
    date: date.toDateString(),
  });
  const [currentUser, setCurrentUser] = React.useState({});

  const onSubmit = (event) => {
    event.preventDefault();
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
    const fetchData = async () => {
      db.collection("users")
        .doc(id)
        .get()
        .then((doc) => {
          setCurrentUser(doc.data());
          setPost({ ...post, business: doc.data().business_title });
        });
    };
    fetchData();
  }, []);

  return (
    <div>
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
                  autoComplete="post"
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
        Hours: {props.item.hours_from} {props.item.hours_to}
      </p>
      <p>Description: {props.item.description}</p>
    </div>
  );
}
