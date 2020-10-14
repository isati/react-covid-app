import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FullScreenWrapper from "./components/FullScreenWrapper";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <FullScreenWrapper />
  </React.StrictMode>,
  document.getElementById("root")
);

// serviceWorker.register({
//   onUpdate: (registration) => {
//     const waitingServiceWorker = registration.waiting;

//     if (waitingServiceWorker) {
//       waitingServiceWorker.addEventListener("statechange", (event) => {
//         if (event.target.state === "activated") {
//           if (
//             window.confirm(
//               "There is a new version of the app ready. Please reload to update."
//             )
//           ) {
//             window.location.reload();
//           }
//         }
//       });
//       waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
//     }
//   },
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
