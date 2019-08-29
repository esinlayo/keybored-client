import React from "react";

import background_img from "../../img/cartoon-road-background.png";
import cartoon_car from "../../img/cartoon-car.png";

const ProgressContainer = props => {
  return (
    <div
      id="progressContainer"
      className={"" + props.className}
      style={{
        backgroundImage: `url(${background_img})`
      }}
    >
      <img
        alt="a cool car"
        width="100"
        src={cartoon_car}
        style={{ position: "relative", left: 100 * props.progress + "%" }}
      />
    </div>
  );
};

export default ProgressContainer;
