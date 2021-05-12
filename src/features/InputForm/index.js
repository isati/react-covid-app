import React from "react";
import closeIcon from "../../assets/close.svg";

const InputForm = React.memo(
  ({ handleDrawer, handleSubmit, handleChange, text }) => (
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
        <h2>Venue name</h2>

        <form onSubmit={handleSubmit}>
          <div className="venue-box">
            <input
              autoFocus={true}
              value={text}
              type="text"
              name="text"
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
  )
);

export default InputForm;
