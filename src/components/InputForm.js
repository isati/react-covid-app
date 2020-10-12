import React from "react";
import infoIcon from "../assets/info.svg";
import shareIcon from "../assets/share.svg";
const InputForm = ({ handleSubmit, handleChange, venueName, handleAbout }) => (
  <div className="input-box">
    <h2>Venue name</h2>
    <form onSubmit={handleSubmit}>
      <div className="venue-box">
        <input
          value={venueName}
          type="text"
          name=""
          required=""
          onChange={handleChange}
        />
        <div>
          <img
            className="infoIcon"
            onClick={handleAbout}
            alt="About"
            src={infoIcon}
          />
        </div>
      </div>
    </form>
  </div>
);

export default InputForm;
