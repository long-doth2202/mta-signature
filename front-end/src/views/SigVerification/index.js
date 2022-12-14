import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import UploadImage from "components/UploadImage";

const styles = {
  divContainer: {
    display: "flex",
  },
};

const useStyles = makeStyles(styles);

function SigVerification() {
  const classes = useStyles();

  const [fileUrlL, setFileUrlL] = useState("");
  const [fileL, setFileL] = useState("");

  const [fileUrlR, setFileUrlR] = useState("");
  const [fileR, setFileR] = useState("");

  return (
    <div className={classes.divContainer}>
      <UploadImage
        fileUrl={fileUrlL}
        setFileUrl={setFileUrlL}
        file={fileL}
        setFile={setFileL}
      />

      <UploadImage
        fileUrl={fileUrlR}
        setFileUrl={setFileUrlR}
        file={fileR}
        setFile={setFileR}
      />
    </div>
  );
}

export default SigVerification;
