import React from "react";

import background_img from "../../img/background-original.png";
import cartoon_car from "../../img/cartoon-car2.png";

const ProgressContainer = props => {
  return (
    <div
      id="progressContainer"
      className={"" + props.className}
      style={{
        backgroundImage: `url(${background_img})`,
        backgroundSize: "auto 100%"
      }}
    >
      <div style={{ width: "100%", position: "absolute", bottom: 0 }}>
        <img
          alt="a cool car"
          width="100"
          src={cartoon_car}
          style={{
            position: "relative",
            left: 100 * props.progress + "%"
          }}
        />
      </div>
    </div>
  );
};

export default ProgressContainer;
