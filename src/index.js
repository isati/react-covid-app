import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FullScreenWrapper from "./components/FullScreenWrapper";
import * as serviceWorker from "./serviceWorker";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dynamicManifest = {
  name: "Covid1984",
  short_name: "Covid1984",
  description: "Covid1984",
  background_color: "#000000",
  start_url: window.location.origin,
  theme_color: "#0f4a73",
  display: "standalone",
  icons: [
    {
      src: `${window.location.origin}/android-chrome-512x512.png`,
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

ReactDOM.render(
  <React.StrictMode>
    <FullScreenWrapper />
    <ToastContainer
      enableMultiContainer
      containerId={"update"}
      position="bottom-center"
      autoClose={5000}
      hideProgressBar
      closeOnClick
      transition={Flip}
      closeButton={false}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

serviceWorker.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener("statechange", (event) => {
        if (event.target.state === "activated") {
          toast.dark(
            `🔄 There is a new version of the app ready. Please reload to update.`,
            {
              containerId: "update",
              onClose: () => window.location.reload(),
            }
          );
        }
      });
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    }
  },
});
