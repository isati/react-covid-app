import React, { useEffect } from "react";
import tickAnimation from "../../assets/tickanimtrans.gif";
import { Slide } from "@material-ui/core";
import dayjs from "dayjs";
import platform from "platform";

const Success = ({ venue, handleBack, history }) => {
  const textWrapper = document.getElementsByClassName("textWrapper");
  const cancelText = document.getElementsByClassName("cancel");
  const fakeButton = document.getElementsByClassName("fakeButton");
  const { state } = history.location;

  const restartGif = (imgElement) => {
    let element = document.getElementById(imgElement);
    if (element) {
      let imgSrc = element.src;
      element.src = imgSrc;
    }
  };

  useEffect(() => {
    // if (!state?.venue || !venue) {
    //   history.push("/");
    //   return;
    // }
    return () => {
      restartGif("tick");
    };
  }, []);

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
    <Slide
      unmountOnExit
      in
      direction={platform.manufacturer === "Apple" ? "left" : "up"}
    >
      <div className="successContainer">
        <div className="successWrapper">
          <div style={{ display: "flex", flexGrow: 1 }} />
          <img
            id="tick"
            alt="Success"
            className="successIcon"
            src={tickAnimation}
          />
          <div className="textWrapper">
            <p className="success">
              Thank you for checking in to{" "}
              <span style={{ fontWeight: 500, wordBreak: "break-word" }}>
                {state?.venue || venue}
              </span>{" "}
            </p>

            <p className="time" id="time">
              {state?.time || dayjs(new Date()).format("DD MMM YYYY, HH:mm")}
            </p>
            <p className="blurb">
              The app is the fastest way to be alerted of potential exposure to
              coronavirus at a venue.
            </p>
          </div>
          <span onClick={history.goBack} className="cancel">
            Wrong check-in? Tap to cancel.
          </span>
          <div style={{ display: "flex", flexGrow: 1 }} />
          <div className="bottomButtons" onClick={handleBack}>
            <button className="fakeButton" id="setText">
              Back to home
            </button>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Success;
