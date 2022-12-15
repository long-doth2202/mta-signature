import React from "react";
import { Button, Card, CardMedia } from "@mui/material";

import styles from "./UploadImage.modules.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function UploadImage(props) {
  const handleChange = (event) => {
    const fileArr = Array.from(event.target.files);
    Promise.all(
      fileArr.map((f) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", (ev) => {
            resolve(ev.target.result);
          });
          reader.addEventListener("error", reject);
          reader.readAsDataURL(f);
        });
      })
    ).then((images) => {
      console.log(images[0]);
      props.setFileUrl(images[0]);
    });
    props.setFile(event.target.files);
  };

  return (
    <div className={cx("upload-container")}>
      <Button
        variant="contained"
        component="label"
        color="primary"
        className={cx("button")}
      >
        <input type="file" hidden onChange={handleChange} accept="image/*" />
        Upload Image
      </Button>

      <Card className={cx("card")}>
        <CardMedia
          component="img"
          image={
            props.fileUrl === ""
              ? "https://apps.onestop.ai/signature-analytics-api/assets/images/imagePlaceholder.png"
              : props.fileUrl
          }
          className={cx("card-media")}
        />
      </Card>
    </div>
  );
}
export default UploadImage;
