import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import UploadImage from "components/UploadImage";
import UserInfor from "components/UserInfor";

import styles from "./SigIdentification.modules.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SigIdentification() {
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState(new Array(1).fill(undefined));
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
    address: "",
  });
  // const user = {
  //   name: "Do Thanh Long",
  //   email: "long.doth2202@gmail.com",
  //   phoneNumber: "0915373964",
  //   idNumber: "026200002301",
  //   address: "Bac Giang",
  // };

  const postData = (event) => {
    setUser({
      name: "",
      email: "",
      phoneNumber: "",
      idNumber: "",
      address: "",
    });
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    let formdata = new FormData();
    formdata.append("uploadedImage", file[0]);

    xhr.open("POST", "/identification", true);
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.warn(xhr.responseText);
        let res = JSON.parse(xhr.responseText);
        if (res.error == true) {
          console.log(res);
        } else {
          setUser({
            name: res.data.name,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            idNumber: res.data.idNumber,
            address: res.data.address,
          });
          // setThreshold(res.threshold);
          // setDistance(res.distance);
          console.log(res);
        }
      }
    };
    xhr.send(formdata);
  };

  return (
    <div className={cx("veri-box")}>
      <div className={cx("veri-container")}>
        <UploadImage
          fileUrl={fileUrl}
          setFileUrl={setFileUrl}
          file={file}
          setFile={setFile}
          setUser={setUser}
        />

        <div>
          <Button
            variant="contained"
            component="label"
            color="success"
            onClick={postData}
            className={cx("veri-button")}
          >
            Query
          </Button>
        </div>

        <UserInfor user={user} />
      </div>
    </div>
  );
}

export default SigIdentification;
