import React from "react";

import background_img from "../../img/background-original.png";
import cartoon_car from "../../img/cartoon-car2.png";

import { getCharacterClassName } from "./characters"
import "./icons-style.css"

export const Character = props => {
  return (
    <React.Fragment>
      <div style={{ width: 100, position: "relative", left: 100 * props.progress + "%", bottom: 0 }}>
        {props.character === "single-player" ?
          <img src={cartoon_car} alt="a cool car" width="100" />
          : <span className={"icon-" + getCharacterClassName(props.character)}
            style={{ color: props.color }} />}
      </div>
      {props.character === "single-player" ? null :
        <div style={{
          position: "absolute", left: 100 * props.progress + "%", bottom: 0,
          background: "rgba(255, 255, 255, 0.5)",
          whiteSpace: "nowrap"
        }}>
          {props.displayName}
        </div>}
    </React.Fragment>
  );
}

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
        <Character
          progress={props.progress}
          displayName={props.displayName}
          character={props.character}
          color={props.color}
        />
      </div>
    </div >
  );
};

export default ProgressContainer;