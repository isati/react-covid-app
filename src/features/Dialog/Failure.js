import React, { useEffect } from "react";
import crossIcon from "../../assets/cross.svg";
import Slide from "react-reveal/Slide";
import platform from "platform";

const Failure = React.memo((props) => {
  const textWrapper = document.getElementsByClassName("textWrapper");
  const cancelText = document.getElementsByClassName("cancel");
  const fakeButton = document.getElementsByClassName("fakeButton");

  useEffect(() => {
    if (platform.name === "Samsung Internet") {
      if (textWrapper && cancelText) {
        setTimeout(() => {
          textWrapper[0].style.color = "unset";
          cancelText[0].style.color = "hsla(207, 100%, 40%, 1)";
          fakeButton[0].style.background = " hsla(207, 100%, 40%, 1)";
        }, 400);
      }
    }
  }, [textWrapper, cancelText, fakeButton]);

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
});

export default Failure;
