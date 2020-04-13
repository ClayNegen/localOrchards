import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import db from "../firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [user, setUser] = React.useState({});

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("You are submitting " + user);
    db.collection("users").add(user);
  };

  const myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    setUser({ ...user, [nam]: val });
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                type="text"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={myChangeHandler}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={myChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={myChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                name="business_title"
                label="Business Title"
                id="business_title"
                autoComplete="business_title"
                onChange={myChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                type="text"
                id="address"
                autoComplete="address"
                onChange={myChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                onChange={myChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="state"
                onChange={myChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                id="country"
                label="country"
                name="country"
                autoComplete="country"
                onChange={myChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                id="website"
                label="Website"
                name="website"
                autoComplete="website"
                onChange={myChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                id="hours_from"
                label="Hours From"
                name="hours_from"
                autoComplete="hours_from"
                onChange={myChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                id="hours_to"
                label="Hours To"
                name="hours_to"
                autoComplete="hours_to"
                onChange={myChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                required
                fullWidth
                id="description"
                label="Enter a Description"
                name="description"
                autoComplete="description"
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
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
