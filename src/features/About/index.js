import React from "react";
import { Link } from "react-router-dom";
import githubIcon from "../../assets/github.svg";
import closeIcon from "../../assets/close.svg";
import telegramIcon from "../../assets/telegram.svg";
import androidApp from "../../assets/android.svg";
import { Slide, Typography } from "@material-ui/core";
import covid1984Logo from "../../assets/covid1984logo.svg";
import platform from "platform";

const About = React.memo(({ handleDrawer, handleBack }) => {
  return (
    <>
      <img
        onClick={() => handleDrawer()}
        className="closeIcon"
        alt="Camera menu"
        src={closeIcon}
      />
      <Slide
        in
        unmountOnExit
        direction={platform.manufacturer === "Apple" ? "left" : "up"}
      >
        <div className="aboutContainer">
          <div style={{ display: "flex", flexGrow: 1 }} />
          <img
            style={{ width: "25%", alignSelf: "center", marginBottom: "3rem" }}
            alt="Telegram chat"
            src={covid1984Logo}
          />{" "}
          <ul
            className="about"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* <li>Does not collect or send any data.</li> */}
            <li>Works offline - does not download or send data anywhere.</li>
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
            <li>
              Access success screen directly - {window.location.hostname}
              ?v=venue_name
            </li>
          </ul>
          <div style={{ display: "flex", flexGrow: 1 }} />
          <div className="donate">
            {/* This app is for demonstrative purposes only and is in no way
            affiliated with or representative of the NHS. */}

            <Typography>
              Join the{" "}
              <a
                href="https://t.me/joinchat/PAhGy0lzfjiogiZpVMcxOw"
                alt="Telegram chat"
              >
                Telegram chat
              </a>{" "}
              for updates, support, discussion, donations, etc..
            </Typography>
          </div>
          <div style={{ display: "flex", flexGrow: 2 }} />
          <a
            onClick={(e) => e.stopPropagation()}
            style={{ width: "250px", alignSelf: "center" }}
            href="https://cv1984.xyz/covid1984-latest.apk"
          >
            <img
              style={{ height: "100%", maxHeight: "8vh", margin: "1rem" }}
              src={androidApp}
            />
          </a>
          <div style={{ display: "flex", flexGrow: 2 }} />
          <div>
            <Typography className="footerText">
              Made with{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              by{" "}
              <a alt="sick.earth" href="//sick.earth">
                sick.earth
              </a>
            </Typography>
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
            <Typography className="versionNumber">
              {`${process.env.REACT_APP_VERSION}`}
            </Typography>
            <div
              className="bottomButtons"
              style={{ marginBottom: "3rem", marginTop: "1.5rem" }}
              onClick={handleBack}
            >
              <button className="fakeButton">Back to home</button>
            </div>
          </div>
        </div>
      </Slide>
    </>
  );
});

export default About;
