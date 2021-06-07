import React, { useEffect } from "react";
import closeIcon from "../../assets/close.svg";
import { OutlinedInput } from "@material-ui/core";
const InputForm = React.memo(
  ({ handleDrawer, handleSubmit, handleChange, text }) => {
    useEffect(() => {
      const inputElem = document.getElementById("input");
      if (inputElem) {
        inputElem.focus();
      }
    }, []);
    return (
      <>
        <img
          onClick={() => {
            handleDrawer(true);
          }}
          className="closeIcon"
          alt="Camera menu"
          src={closeIcon}
        />
        <div className="input-box">
          {/* <h2>Venue name</h2> */}

          <form onSubmit={handleSubmit}>
            <div className="venue-box">
              <OutlinedInput
                id="input"
                placeholder="Venue name"
                autoFocus={true}
                value={text}
                name="text"
                color="primary"
                required
                onChange={handleChange}
              />
            </div>
          </form>
          <p className="permissionWarning">
            Unexpectedly seeing this screen? Check your camera permissions.
          </p>
        </div>
      </>
    );
  }
);

export default InputForm;
