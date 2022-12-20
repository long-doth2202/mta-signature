import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";

import UploadImage from "components/UploadImage";

import styles from "./SigVerification.modules.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SigVerification() {
  const [fileUrlL, setFileUrlL] = useState("");
  const [fileL, setFileL] = useState(new Array(1).fill(undefined));

  const [fileUrlR, setFileUrlR] = useState("");
  const [fileR, setFileR] = useState(new Array(1).fill(undefined));

  const postData = (event) => {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    let formdata = new FormData();
    formdata.append("uploadedImageL", fileL[0]);
    formdata.append("uploadedImageR", fileR[0]);
    console.log(fileL);
    console.log(fileR);

    xhr.open("POST", "/verify", true);
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.warn(xhr.responseText);
        let res = JSON.parse(xhr.responseText);
        if (res.error == true) {
          console.log(res);
        } else {
          console.log(res);
          console.log(res.distance);
          console.log(res.threshold);
          console.log(res.match);
        }
      }
    };
    xhr.send(formdata);
  };

  return (
    <div>
      <div className={cx("veri-container")}>
        <UploadImage
          fileUrl={fileUrlL}
          setFileUrl={setFileUrlL}
          file={fileL}
          setFile={setFileL}
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

        <UploadImage
          fileUrl={fileUrlR}
          setFileUrl={setFileUrlR}
          file={fileR}
          setFile={setFileR}
        />
      </div>
    </div>
  );
}

export default SigVerification;
