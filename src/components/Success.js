import React from "react";
import { Link } from "react-router-dom";
import TickIcon from "../assets/tick.png";
import Slide from "react-reveal/Slide";
import moment from "moment";

const Success = ({ ...props }) => {
  const { venue, handleBack } = props;
  if (!venue) {
    window.location.replace("/");
  }
  return (
    <Slide bottom duration={300}>
      <div className="successContainer">
        <div className="successWrapper">
          <p>
            <img alt="Success" id="tickImg" src={TickIcon} />
          </p>

          <p className="success">Successful check-in</p>
          <p className="venue" id="venueText">
            {venue}
          </p>
          <p className="time" id="time">
            {moment(new Date()).format("DD MMM YYYY, HH:mm")}
          </p>
          <p className="blurb">
            Thank you for scanning. You have now checked in! You'll be
            automatically checked out at midnight or when you scan another
            official NHS QR code.
          </p>
          <div onClick={handleBack}>
            <p>
              <button className="fakeButton" id="setText">
                Back to home
              </button>
            </p>
            <p className="cancel" id="fullscreen">
              Cancel this check-in
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Success;
