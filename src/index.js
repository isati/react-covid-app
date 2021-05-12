import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./features/App";
import * as serviceWorker from "./serviceWorker";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserHistory } from "history";
// import { defineCustomElements } from "@ionic/pwa-elements/loader";
const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <App history={history} />
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

// defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
serviceWorker.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      const Covid1984App = "Covid1984";
      const assets = ["/index.html", "/favicon.ico"];

      waitingServiceWorker.addEventListener("install", (installEvent) => {
        installEvent.waitUntil(
          caches.open(Covid1984App).then((cache) => {
            cache.addAll(assets);
          })
        );
      });

      waitingServiceWorker.addEventListener("fetch", function (event) {
        event.respondWith(
          caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          })
        );
      });

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
