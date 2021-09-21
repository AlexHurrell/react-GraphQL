import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  grid: {
    padding: "1em",
    margin: "3em",
    maxWidth: "550px",
    backgroundColor: "lightBlue",
    borderRadius: "4px",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  caption: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "end",
  },
  title: {
    marginRight: "2em",
  },
}));

export const BlogPost = (props) => {
  const classes = useStyles();

  const { title, text, author } = props.data;

  return (
    <div>
      <Grid spacing={2} container className={classes.grid}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1"> {text}</Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.caption}>
          <Typography variant="caption">Written by {author}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};
