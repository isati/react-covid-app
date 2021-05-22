import React, { useEffect } from "react";
import crossIcon from "../../assets/cross.svg";
import { Slide } from "@material-ui/core";
import platform from "platform";

const Failure = React.memo((props) => {
  const textWrapper = document.getElementsByClassName("textWrapper");
  const fakeLink = document.getElementsByClassName("fakeLink");
  const fakeButton = document.getElementsByClassName("fakeButton");

  useEffect(() => {
    if (platform.name === "Samsung Internet") {
      if (textWrapper && fakeLink) {
        console.log(fakeLink);
        setTimeout(() => {
          textWrapper[0].style.color = "hsla(0, 0%, 0%, 1)";
          fakeLink[0].style.color = "hsla(206, 99%, 38%, 1) !important";
          // fakeLink[0].style.filter = "invert(100%)";
          fakeLink[0].style.mixBlendMode = "darken";
          fakeButton[0].style.background = " hsla(207, 100%, 40%, 1)";
        }, 600);
      }
    }
  }, [textWrapper, fakeLink, fakeButton]);

  return (
    <Slide in direction="up">
      <div className="successContainer">
        <div className="successWrapper">
          <p>
            <img alt="Failure" className="successIcon" src={crossIcon} />
          </p>

          <div className="textWrapper">
            <p className="success">QR code not recognised</p>

            <p className="blurb">
              It could be that you didn't scan an official NHS QR code or the
              code is damaged.
            </p>
          </div>
          <p className="fakeLink">Help with venue check-in</p>
          <div className="textWrapper">
            <p className="blurb">
              You may be trying to scan an invalid official NHS QR code or maybe
              this venue isn't recognised.
            </p>
            <p className="blurb">
              Please find another way to check in.
              <br />
              Speak to a member of staff for help.
            </p>
          </div>
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
