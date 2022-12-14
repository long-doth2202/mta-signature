import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardMedia } from "@mui/material";

const styles = {
  cardMediaStyle: {
    height: "100%",
    width: "80%",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "background-position": "50%",
    "background-repeat": "no-repeat",
    "background-size": "cover",
  },
};

const useStyles = makeStyles(styles);

function UploadImage(props) {
  const classes = useStyles();

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
      props.setFileUrl(images);
    });
    props.setFile(event.target.files);
  };

  return (
    <div>
      <Button variant="contained" component="label" color="primary">
        <input type="file" hidden onChange={handleChange} accept="image/*" />
        Upload Image
      </Button>

      <Card className={classes.cardMediaStyle}>
        <CardMedia
          component="img"
          image={
            props.fileUrl === ""
              ? "https://apps.onestop.ai/signature-analytics-api/assets/images/imagePlaceholder.png"
              : props.fileUrl
          }
        />
      </Card>
    </div>
  );
}
export default UploadImage;
