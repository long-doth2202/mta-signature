import React from "react";
import { Grid, Paper, Button, Typography } from "@mui/material";

import UserApi from "apis/UserApi";

import styles from "./ConfirmForm.modules.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ConfirmForm = (props) => {
  return (
    <Grid>
      <Paper elevation={0}></Paper>
      <h1> hello</h1>
    </Grid>
  );
};

export default ConfirmForm;
