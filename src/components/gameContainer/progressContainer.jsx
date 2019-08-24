import React from "react";

const ProgressContainer = props => {
  return (
    <div className="progressContainer">
      <img
        alt="a cool car"
        width="100"
        src="https://easydrawingguides-7512.kxcdn.com/wp-content/uploads/2017/01/How-to-Draw-a-cartoon-car-20.png"
        style={{ position: "relative", left: 90 * props.progress + "%" }}
      />
    </div>
  );
};

export default ProgressContainer;
