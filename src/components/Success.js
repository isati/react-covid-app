import React from "react";
import TickIcon from "../assets/tick.png";
// import Slide from "react-reveal/Slide";
import moment from "moment";

const Success = ({ venue, handleBack }) => {
  return (
    // <Slide bottom duration={300}>
    <div className="successContainer">
      <div className="successWrapper">
        <p>
          <img alt="Success" id="tickImg" src={TickIcon} />
        </p>

        <p className="success">Successful check-in</p>
        <p className="venue" id="venueText">
          {venue.opn}
        </p>
        <p className="time" id="time">
          {moment(new Date()).format("DD MMM YYYY, HH:mm")}
        </p>
        <p className="blurb">
          Thank you for scanning. You have now checked in! You'll be
          automatically checked out at midnight or when you scan another
          official NHS QR code.
        </p>
        <p>
          <button onClick={handleBack} className="fakeButton" id="setText">
            Back to home
          </button>
        </p>
        <p onClick={handleBack} className="cancel" id="fullscreen">
          Cancel this check-in
        </p>
      </div>
    </div>
    // </Slide>
  );
};

export default Success;
