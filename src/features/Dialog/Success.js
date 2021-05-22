import React, { useEffect } from "react";
import TickIcon from "../../assets/tick.svg";
import { Slide } from "@material-ui/core";
import dayjs from "dayjs";
import platform from "platform";

const Success = ({ venue, handleBack, history }) => {
  const textWrapper = document.getElementsByClassName("textWrapper");
  const cancelText = document.getElementsByClassName("cancel");
  const fakeButton = document.getElementsByClassName("fakeButton");
  const { state } = history.location;

  useEffect(() => {
    if (platform.name === "Samsung Internet") {
      // Hacky workaround for Samsung Browser in dark mode
      if (textWrapper && cancelText) {
        setTimeout(() => {
          textWrapper[0].style.color = "hsla(0, 0%, 0%, 1)";
          textWrapper[0].style.filter = "invert(1)";
          cancelText[0].style.color = "hsla(207, 100%, 40%, 1)";
          fakeButton[0].style.background = " hsla(207, 100%, 40%, 1)";
        }, 500);
      }
    }
  }, [textWrapper, cancelText, fakeButton]);

  return (
    <Slide in direction="up">
      <div className="successContainer">
        <div className="successWrapper">
          <p>
            <img alt="Success" className="successIcon" src={TickIcon} />
          </p>

          <div className="textWrapper">
            <p className="success">
              Thank you for checking in to {state?.venue || venue}{" "}
            </p>

            <p className="time" id="time">
              {state?.time || dayjs(new Date()).format("DD MMM YYYY, HH:mm")}
            </p>
            <p className="blurb">
              The app is the fastest way to be alerted of potential exposure to
              coronavirus at a venue.
            </p>
          </div>
          <p onClick={history.goBack} className="cancel">
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
