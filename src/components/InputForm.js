import React from "react";
import { Link } from "react-router-dom";
import infoIcon from "../assets/info.svg";
import shareIcon from "../assets/share.svg";
const InputForm = ({ handleSubmit, handleChange, text }) => (
  <div className="input-box">
    <h2>Venue name</h2>
    <form onSubmit={handleSubmit}>
      <div className="venue-box">
        <input
          value={text}
          type="text"
          name=""
          required=""
          onChange={handleChange}
        />
        <div>
          <Link to="/about">
            <img className="infoIcon" alt="About" src={infoIcon} />
          </Link>
        </div>
      </div>
    </form>
  </div>
);

export default InputForm;
