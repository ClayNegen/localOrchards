import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import db from "../firebase";

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
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

BigCard.propTypes = {
  post: PropTypes.object,
};

export default function Orchard() {
  const id = "OQubaub4DVunHUDc75hg";
  const [orchard, setOrchard] = React.useState({});
  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("users")
        .doc(id)
        .get()
        .then((doc) => {
          setOrchard(doc.data());
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <BigCard item={orchard} />
    </div>
  );
}
