import React from "react";
import { Link } from "react-router-dom";
import githubIcon from "../../assets/github.svg";
import closeIcon from "../../assets/close.svg";
import telegramIcon from "../../assets/telegram.svg";
import { Slide } from "@material-ui/core";

const About = React.memo(({ handleDrawer }) => {
  return (
    <>
      <img
        onClick={() => handleDrawer()}
        className="closeIcon"
        alt="Camera menu"
        src={closeIcon}
      />
      <Slide in direction="up">
        <div className="aboutContainer">
          <ul className="about">
            <li>Does not collect or send any data.</li>
            <li>Can be used offline.</li>
            <li>
              Choose "Add to Homescreen" in browser for a more app-like
              experience.
            </li>
            <li>
              Double tap outside the viewport area to enter fullscreen, single
              tap to exit.
            </li>
            <li>
              App will present a text input field if no cameras detected or
              camera permission denied. Can also be accessed via{" "}
              <Link to="/input">/input</Link>
            </li>
          </ul>
          <div className="donate">
            This app is for demonstrative purposes only and is in no way
            affiliated with or representative of the NHS.
            <p>
              For discussion and support please join the{" "}
              <a
                href="https://t.me/joinchat/PAhGy0lzfjiogiZpVMcxOw"
                alt="Telegram chat"
              >
                Telegram chat
              </a>
              .
            </p>
          </div>
          <div>
            <p className="footerText">
              Made with{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              by{" "}
              <a alt="sick.earth" href="//sick.earth">
                sick.earth
              </a>
            </p>
            <div className="footer">
              <a
                href="https://t.me/joinchat/PAhGy0lzfjiogiZpVMcxOw"
                alt="Telegram chat"
              >
                <img
                  className="telegramIcon"
                  alt="Telegram chat"
                  src={telegramIcon}
                />{" "}
              </a>
              <a
                title="Github"
                href="https://github.com/isati/react-covid1984-app"
              >
                {" "}
                <img
                  className="githubIcon"
                  alt="GitHub"
                  src={githubIcon}
                />{" "}
              </a>
            </div>
            <div className="versionNumber">
              {`${process.env.REACT_APP_VERSION}`}
            </div>
          </div>
        </div>
      </Slide>
    </>
  );
});

export default About;
