import React, { useReducer, useEffect } from "react";
import "./ToggleSwitch.scss";

/**
 * Toggles the boolean state if there is not an action passed in
 * else it sets the state to the action's passed value
 * @param {boolean} state - The current state of the reducer
 * @param {boolean} action - The dispatched action
 * @returns {boolean} - The nextState of the reducer
 */

const toggleBooleanReducer = (state, action) =>
  typeof action === "boolean" ? action : !state;

const ToggleSwitch = ({ on, onChange }) => {
  const [onState, toggleOnState] = useReducer(toggleBooleanReducer, on);

  useEffect(() => {
    if (onChange instanceof Function) {
      onChange(onState);
    }
  }, [onState]);

  return (
    <div
      className={`toggle-switch ${onState ? "active" : ""}`}
      onClick={toggleOnState}
    >
      <div className="toggle-track" />
      <div className="toggle-circle" />
    </div>
  );
};

ToggleSwitch.defaultProps = {
  on: false,
};

export default ToggleSwitch;
