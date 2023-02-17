import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import UploadImage from "components/UploadImage";
import ResultVerify from "components/ResultVerify";

import styles from "./SigVerification.modules.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SigVerification() {
  const [fileUrlL, setFileUrlL] = useState("");
  const [fileL, setFileL] = useState(new Array(1).fill(undefined));

  const [fileUrlR, setFileUrlR] = useState("");
  const [fileR, setFileR] = useState(new Array(1).fill(undefined));

  const [threshold, setThreshold] = useState(undefined);
  const [distance, setDistance] = useState(-2);

  const postData = (event) => {
    setDistance(-1);

    event.preventDefault();
    const xhr = new XMLHttpRequest();
    let formdata = new FormData();
    formdata.append("uploadedImageL", fileL[0]);
    formdata.append("uploadedImageR", fileR[0]);

    xhr.open("POST", "/verify", true);
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.warn(xhr.responseText);
        let res = JSON.parse(xhr.responseText);
        if (res.error == true) {
          console.log(res);
        } else {
          setThreshold(res.threshold);
          setDistance(res.distance);
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

      {distance !== -1 ? (
        <ResultVerify distance={distance} threshold={threshold} />
      ) : (
        <Skeleton animation="wave" variant="rounded" width={320} height={96} />
      )}
    </div>
  );
}

export default SigVerification;
