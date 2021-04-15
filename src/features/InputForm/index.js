import React from "react";
import { Link } from "react-router-dom";
import infoIcon from "../../assets/info.svg";
import shareIcon from "../../assets/share.svg";
import { RWebShare } from "react-web-share";

const InputForm = React.memo(({ handleSubmit, handleChange, text }) => (
  <div className="input-box">
    <h2>Venue name</h2>

    <form onSubmit={handleSubmit}>
      <div className="venue-box">
        <input
          value={text}
          type="text"
          name="text"
          required
          onChange={handleChange}
        />
        <div>
          <Link to="/about" title="About">
            <img className="infoIcon" alt="About" src={infoIcon} />
          </Link>
          <span className="divider"></span>
          <RWebShare
            data={{
              text: document.title,
              url: ".",
              title: document.title,
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
    <p className="permissionWarning">
      Unexpectedly seeing this screen? Check your camera permissions.
    </p>
  </div>
));

export default InputForm;
