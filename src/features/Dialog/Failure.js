import React from "react";
import crossIcon from "../../assets/cross.svg";
import { Slide } from "@material-ui/core";
import platform from "platform";

const Failure = React.memo((props) => {
  return (
    <Slide
      unmountOnExit
      in
      direction={platform.manufacturer === "Apple" ? "left" : "up"}
    >
      <div className="successContainer">
        <div className="failureWrapper">
          <img alt="Failure" style={{ height: 100 }} src={crossIcon} />

          <div className="textWrapper">
            <p className="success">QR code not recognised</p>

            <p className="blurb">
              It could be that you didn't scan an official NHS QR code or the
              code is damaged.
            </p>
          </div>
          <span className="fakeLink" style={{ marginBottom: "1rem" }}>
            Help with venue check-in
          </span>
          <div className="textWrapper">
            <p className="blurb">
              You may be trying to scan an invalid official NHS QR code or maybe
              this venue isn't recognised.
            </p>
            <p className="blurb">
              Please find another way to check in. Speak to a member of staff
              for help.
            </p>
          </div>
          <div style={{ display: "flex", flexGrow: 1 }} />
          <div className="bottomButtons">
            <button
              onClick={() => props.history.goBack()}
              className="fakeButton"
              id="setText"
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </Slide>
  );
});

export default Failure;
