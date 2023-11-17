import React from "react";
import "../style/chkbox.css";

const CheckBox = (props) => {
  return (
    <label className="checkBox" style={props.style}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e)}
        name={props.name}
      />
      <span data-on={props.dataOn} data-off={props.dataOff}></span>
    </label>
  );
};

export default CheckBox;
