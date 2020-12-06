import React from "react";
import { Link } from "react-router-dom";
import githubIcon from "../assets/github.svg";
import closeIcon from "../assets/close.svg";
import telegramIcon from "../assets/telegram.svg";
import Bounce from "react-reveal/Bounce";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleManifest = () => {
  const dynamicManifest = {
    name: "NHS Covid-19",
    short_name: "NHS Covid-19",
    description: "NHS Covid-19",
    start_url: window.location.origin,
    background_color: "#000000",
    display: "standalone",
    theme_color: "#0f4a73",
    icons: [
      {
        src: `${window.location.origin}/logo-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    permissions: {
      "video-capture": {
        description: "Required to capture video using getUserMedia()",
      },
    },
  };
  const stringManifest = JSON.stringify(dynamicManifest);
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  document.querySelector("#manifest").setAttribute("href", manifestURL);
  document.title = "NHS Covid-19";
  toast.dark(`Now choose "Add to homescreen"`, {
    containerId: "manifest",
  });
};

const About = React.memo((props) => {
  return (
    <React.Fragment>
      <Link to="/" title="Menu">
        <img className="closeIcon" alt="Camera menu" src={closeIcon} />
      </Link>
      <Bounce bottom>
        <div className="aboutContainer">
          <ul className="about">
            <li>Does not collect or send any data.</li>
            <li>Can be used offline.</li>
            <li>
              Choose "Add to Homescreen" in browser for a more app-like
              experience.
            </li>
            <li>Double tap outside the viewport area to enter fullscreen.</li>
            <li>
              App will present a text input field if no cameras detected or
              camera permission denied. Can also be accessed via{" "}
              <Link to="/input">/input</Link>
            </li>
          </ul>
          <div className="donate">
            This app is for demonstrative purposes only and is in no way
            affiliated with or a representative of the NHS.
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
            <div onClick={handleManifest} className="versionNumber">
              {`${process.env.REACT_APP_VERSION}`}
            </div>
          </div>
          <ToastContainer
            style={{ opacity: "0.5" }}
            enableMultiContainer
            containerId={"manifest"}
            position="bottom-center"
            autoClose={3000}
            hideProgressBar
            closeOnClick
            transition={Flip}
            closeButton={false}
            limit={1}
          />
        </div>
      </Bounce>
    </React.Fragment>
  );
});

export default About;
