import React from "react";
import { useState, useEffect } from "react";

import { Stack, ImageList, ImageListItem } from "@mui/material";
import { Button, Card, CardMedia } from "@mui/material";

import styles from "./SigImageList.modules.scss";
import classNames from "classnames/bind";

import ImageApi from "apis/ImageApi";

const cx = classNames.bind(styles);

function SigImageList(props) {
  console.log(props._id);

  const handleChangeReal = (event) => {
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
      const payload = {
        userId: props._id,
        data: images[0],
        type: true,
      };
      ImageApi.postSigImage(props._id, payload);
      // console.log(JSON.stringify(payload));
    });
  };

  const handleChangeForge = (event) => {
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
      const payload = {
        userId: props._id,
        data: images[0],
        type: false,
      };
      ImageApi.postSigImage(props._id, payload);
      // console.log(JSON.stringify(payload));
    });
  };

  const [signatureList, setSignatureList] = useState([]);

  useEffect(() => {
    const getSignatureList = async () => {
      try {
        const apiRes = await ImageApi.getSignatureList(props._id);
        if (apiRes.status === 200) {
          setSignatureList(apiRes.data);
          console.log(apiRes.data);
        } else {
          // setState(0);
        }
      } catch (error) {
        // setState(0);
      }
    };
    getSignatureList();
  }, []);

  return (
    <div>
      <div>
        <div className={cx("header-upload")}>
          <h4>Real signature</h4>

          <Button
            variant="contained"
            component="label"
            color="primary"
            className={cx("button")}
          >
            <input
              type="file"
              hidden
              onChange={handleChangeReal}
              accept="image/*"
            />
            Upload Image
          </Button>
        </div>

        <ImageList sx={{ width: 500, height: 350 }} cols={3} rowHeight={164}>
          {signatureList
            .filter((item) => {
              return item.type === true;
            })
            .map((item) => (
              <ImageListItem key={item._id}>
                <img
                  src={item.data}
                  // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item._id}
                  loading="lazy"
                  className={cx("image-element")}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </div>

      <div>
        <div className={cx("header-upload")}>
          <h4>Forge signature</h4>

          <Button
            variant="contained"
            component="label"
            color="primary"
            className={cx("button")}
          >
            <input
              type="file"
              hidden
              onChange={handleChangeForge}
              accept="image/*"
            />
            Upload Image
          </Button>
        </div>
        <ImageList sx={{ width: 500, height: 350 }} cols={3} rowHeight={164}>
          {signatureList
            .filter((item) => {
              return item.type === false;
            })
            .map((item) => (
              <ImageListItem key={item._id}>
                <img
                  src={item.data}
                  // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item._id}
                  loading="lazy"
                  className={cx("image-element")}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </div>
    </div>
  );
}

export default SigImageList;
