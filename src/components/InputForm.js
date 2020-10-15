import React from "react";
import { Link } from "react-router-dom";
import infoIcon from "../assets/info.svg";
import shareIcon from "../assets/share.svg";
import { RWebShare } from "react-web-share";

const InputForm = React.memo(({ handleSubmit, handleChange, text }) => (
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
          <Link to="/about" title="About">
            <img className="infoIcon" alt="About" src={infoIcon} />
          </Link>
          <span className="divider"></span>
          <RWebShare
            data={{
              text: "NHS Covid-19",
              url: window.location.href,
              title: "NHS Covid-19",
            }}
          >
            <img
              alt="Share"
              title="Share"
              className="shareIcon"
              src={shareIcon}
            />
          </RWebShare>
        </div>
      </div>
    </form>
  </div>
));

export default InputForm;
