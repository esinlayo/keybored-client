import React from "react";

import background_img from "../../img/background-original.png";
import cartoon_car from "../../img/cartoon-car2.png";

import "./icons-style.css"

export const characters = ["Car", "Truck", "Monster Truck", "Helicopter", "Fighter Jet", "Motorcycle", "Airplane", "Bicycle", "Wheelchair", "Baby Carriage", "Horse", "Shopping Cart"]
export const colors = ["Red", "Green", "Blue", "Yellow", "Orange", "Purple"]
export function getCharacterClassName(idx) { return characters[idx].toLowerCase().replace(" ", "-") }
export function getCharacterColor(idx) { return colors[idx] }

export const Character = props => {
  const renderCharacter = () => {
    return (props.character === "single-player" ?
      <img src={cartoon_car} alt="a cool car" width="100" /> :
      <span className={"icon-" + getCharacterClassName(props.character)}
        style={{ color: getCharacterColor(props.color) }} />
    );
  }
  const renderDisplayName = () => {
    return (<div style={{
      position: "absolute", left: 100 * props.progress + "%", bottom: 0,
      background: "rgba(255, 255, 255, 0.5)", whiteSpace: "nowrap"
    }}>{props.displayName}</div>)
  }

  return (<React.Fragment>
    <div style={{ width: 100, position: "relative", left: (props.progress * 100) + "%" }}>
      {renderCharacter()}
    </div>
    {props.character === "single-player" ? null : renderDisplayName()}
  </React.Fragment>);
}

const ProgressCharacter = props => {
  return (
    <div id="progressContainer" className={"" + props.className}
      style={{ backgroundImage: `url(${background_img})`, backgroundSize: "auto 100%" }}    >
      <div style={{ width: "100%", position: "absolute", bottom: 0, overflow: "hidden" }}>
        <Character progress={props.progress} displayName={props.displayName}
          character={props.character} color={props.color} />
      </div>
    </div >
  );
};

export default ProgressCharacter;