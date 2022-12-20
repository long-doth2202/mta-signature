import React from "react";

import styles from "./ResultVerify.modules.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ResultVerify(props) {
  let resultDiv = <div></div>;
  let statusVerify =
    props.distance >= 0 && props.distance <= props.threshold
      ? "Matched"
      : "Not Matched";

  if (props.distance >= 0) {
    resultDiv = (
      <div className={cx("result-container")}>
        <p className={cx("result-header")}>Result</p>
        <div>
          <p
            className={cx("result-body", {
              "result-body-red": statusVerify !== "Matched",
              "result-body-green": statusVerify === "Matched",
            })}
          >
            Status: {statusVerify}
          </p>
        </div>
      </div>
    );
  }

  return resultDiv;
}

export default ResultVerify;
