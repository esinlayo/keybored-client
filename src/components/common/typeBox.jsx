import React from "react";
import Typography from "@material-ui/core/Typography";

/**************************************************************
Use TypeBox with a higher order component **typeArea***. 
See src/singlePlayer/typeArea and src/withFriends/typeArea 
**************************************************************/
const TypeBox = props => {
  return (
    <div id="typeboxContainer">
      <Typography
        variant="h6"
        component={TypeMeBox} id="typeMeBox"
        className="typeBox typeBoxWrapping"
        textToType={props.textToType}
        lastErrorIdx={props.lastErrorIdx}
        error={props.error} />
      <Typography
        variant="h6"
        component="textarea" id="typedInputBox"
        ref={props.typedInputBox}
        className="typeBox typeBoxWrapping form-control transparent-input"
        type="text"
        spellCheck="false"
        autoFocus autoComplete="off" autoCorrect="off" autoCapitalize="off"
        onPaste={e => e.preventDefault()}
        onKeyPress={e => { if (e.keyCode === 13 || e.which === 13) e.preventDefault() }} // disable return(enter) key
        onChange={props.handleChange}
        value={props.textTyped} />
    </div>
  );
};

function TypeMeBox(props) {
  return (
    <div
      id={props.id} className={"form-control " + props.className}
      style={{ position: "relative" }}>
      {(() => {
        const { textToType, lastErrorIdx, error } = props;
        if (lastErrorIdx !== null) {
          return (
            <React.Fragment>
              <span>{textToType.substring(0, lastErrorIdx)}</span>
              <span className="highlightError typeBoxWrapping">{error}</span>
              <span>{textToType.substring(lastErrorIdx)}</span>
            </React.Fragment>
          );
        } else { return <React.Fragment>{textToType}</React.Fragment> }
      })()}
    </div>
  );
}

export default TypeBox;
