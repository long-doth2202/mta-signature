import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Card, CardMedia } from "@mui/material";

import styles from "./UserInfor.modules.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function UserInfor(props) {
  return (
    <div className={cx("iden-box")}>
      <TextField
        sx={{ width: 250 }}
        id="standard-basic"
        label="name"
        variant="standard"
        value={props.user.name}
      />
      <TextField
        sx={{ width: 250 }}
        id="standard-basic"
        label="email"
        variant="standard"
        value={props.user.email}
      />
      <TextField
        sx={{ width: 250 }}
        id="standard-basic"
        label="id number"
        variant="standard"
        value={props.user.idNumber}
      />
      <TextField
        sx={{ width: 250 }}
        id="standard-basic"
        label="phone number"
        variant="standard"
        value={props.user.phoneNumber}
      />
      <TextField
        sx={{ width: 250 }}
        id="standard-basic"
        label="address"
        variant="standard"
        value={props.user.address}
      />
    </div>
  );
}
export default UserInfor;
