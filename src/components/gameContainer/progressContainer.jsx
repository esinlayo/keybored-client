import React from "react";

const ProgressContainer = props => {
  return (
    <div id="progressContainer" className={"" + props.className}>
      <img
        alt="a cool car"
        width="100"
        src="https://easydrawingguides-7512.kxcdn.com/wp-content/uploads/2017/01/How-to-Draw-a-cartoon-car-20.png"
        style={{ position: "relative", left: 100 * props.progress + "%" }}
      />
    </div>
  );
};

export default ProgressContainer;
