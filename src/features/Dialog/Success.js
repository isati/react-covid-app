import React from "react";
import TickIcon from "../../assets/tick.svg";
import Slide from "react-reveal/Slide";
import dayjs from "dayjs";

const Success = ({ venue, handleBack, history }) => {
  return (
    <Slide bottom duration={300}>
      <div className="successContainer">
        <div className="successWrapper">
          <p>
            <img alt="Success" className="successIcon" src={TickIcon} />
          </p>

          <p className="success">Thank you for checking in to {venue} </p>

          <p className="time" id="time">
            {dayjs(new Date()).format("DD MMM YYYY, HH:mm")}
          </p>
          <p className="blurb">
            The app is the fastest way to be alerted of potential exposure to
            coronavirus at a venue.
          </p>
          <p onClick={() => history.goBack()} className="cancel">
            Wrong check-in? Tap to cancel.
          </p>

          <div className="bottomButtons" onClick={handleBack}>
            <p>
              <button className="fakeButton" id="setText">
                Back to home
              </button>
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Success;
