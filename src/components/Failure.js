import React from "react";
import crossIcon from "../assets/cross.svg";
import Slide from "react-reveal/Slide";

const Failure = ({ ...props }) => {
  return (
    <Slide bottom duration={300}>
      <div className="successContainer">
        <div className="successWrapper">
          <p>
            <img alt="Failure" className="successIcon" src={crossIcon} />
          </p>

          <p className="success">QR code not recognised</p>

          <p className="blurb">
            It could be that you didn't scan an official NHS QR code or the code
            is damaged.
          </p>
          <p className="fakeLink">Help with venue check-in</p>
          <p className="blurb">
            You may be trying to scan an invalid official NHS QR code or maybe
            this venue isn't recognised.
          </p>
          <p className="blurb">
            Please find another way to check in.
            <br />
            Speak to a member of staff for help.
          </p>
          <div className="bottomButtons">
            <p>
              <button
                onClick={() => props.history.goBack()}
                className="fakeButton"
                id="setText"
              >
                Back to home
              </button>
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Failure;
