import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
// import urlRegexSafe from "url-regex-safe";
import jwt_decode from "jwt-decode";
import QRReader from "../QRReader";
import Success from "../Dialog/Success";
import About from "../About";
import Failure from "../Dialog/Failure";
import InputForm from "../InputForm";
import FullScreen from "../Fullscreen";
import Drawer from "../Drawer";
import dayjs from "dayjs";
import "../../assets/App.css";
import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import * as serviceWorker from "../../serviceWorker";
const queryString = require("query-string");

const App = React.memo(
  ({ history }) => {
    const defaultCamera = localStorage.getItem("defaultCamera");
    const lastCheckIn = JSON.parse(localStorage.getItem("lastCheckIn"));
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState({
      devices: null,
      loading: true,
      cameraLabel: null,
      cameraId: defaultCamera || "",
      venue: null,
      text: null,
      permission: null,
      menuOpen: false,
      newVersionAvailable: false,
      waitingWorker: {},
      scanning: false,
    });

    const { cameraId, cameraLabel, devices, menuOpen, scanning } = state;
    const { v } = queryString.parse(history?.location?.search);

    const onServiceWorkerUpdate = (registration) => {
      const waitingServiceWorker = registration.waiting;

      if (waitingServiceWorker) {
        const Covid1984App = "Covid1984";
        const assets = ["index.html", "favicon.ico"];

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
            enqueueSnackbar("A new version was released", {
              persist: true,
              variant: "info",
              action: refreshAction(),
            });
          }
        });
        waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
      }

      setState((prevState) => ({
        ...prevState,
        waitingWorker: registration && registration.waiting,
        newVersionAvailable: true,
      }));
    };

    const updateServiceWorker = () => {
      const { waitingWorker } = state;
      setState((prevState) => ({ ...prevState, newVersionAvailable: false }));
      window.location.reload();
      waitingWorker && waitingWorker.postMessage({ type: "SKIP_WAITING" });
    };

    const refreshAction = (key) => {
      //render the snackbar button
      return (
        <Fragment>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={updateServiceWorker}
          >
            {"refresh"}
          </Button>
        </Fragment>
      );
    };

    const refreshDevices = async () => {
      return navigator.mediaDevices.enumerateDevices().then((devices) => {
        setDevices(devices);
      });
    };

    const handleVenue = (venue) => {
      const checkin = {
        venue,
        time: dayjs(new Date()).format("DD MMM YYYY, HH:mm"),
      };
      setState((prevState) => ({ ...prevState, venue }));
      localStorage.setItem("lastCheckIn", JSON.stringify(checkin));
      history.push("/success");
    };

    const handleScan = (result) => {
      if (result) {
        setState((prevState) => ({ ...prevState, scanning: true }));

        setTimeout(() => {
          if (result.startsWith("UKC19TRACING:")) {
            const { opn } = jwt_decode(result);
            setState((prevState) => ({ ...prevState, scanning: false }));
            return handleVenue(opn);
          }

          setState((prevState) => ({ ...prevState, scanning: false }));
          return history.push("/failure");
        }, [800]);
      }
    };

    useEffect(() => {
      const { newVersionAvailable } = state;

      if (process.env.NODE_ENV === "production") {
        serviceWorker.register({ onUpdate: onServiceWorkerUpdate });
      }

      if (newVersionAvailable)
        //show snackbar with refresh button
        enqueueSnackbar("A new version was released", {
          persist: true,
          variant: "info",
          action: refreshAction(),
        });

      if (v) {
        handleVenue(v);
      }
    }, []);

    useEffect(() => {
      window.onpopstate = (e) => {
        // Close drawer on back button
        if (menuOpen) {
          handleDrawer();
        }
        return;
      };
    }, [menuOpen]);

    const setDevices = useCallback(
      (devices) => {
        const videoSelect = [];

        devices.map((device, index) => {
          if (device.kind === "videoinput") {
            videoSelect.push(device);
          }
          return device;
        });

        // Go to text input if no video devices detected
        if (!videoSelect.length) {
          history.push("/input");
        }

        videoSelect.sort(function (a, b) {
          if (a.label > b.label) {
            return 1;
          }
          if (b.label > a.label) {
            return -1;
          }
          return 0;
        });

        setState((prevState) => ({
          ...prevState,
          devices: videoSelect,
          // cameraId: videoSelect[0].id,
          loading: false,
        }));
      },
      [history]
    );

    const selectCamera = async (cameraId) => {
      try {
        setState((prevState) => ({ ...prevState, cameraId }));
      } catch (err) {
        console.log(err);
      }
    };

    const onLoadQRScanner = (args) => {
      const { streamTrack } = args;

      if (!devices[0]?.label) {
        refreshDevices().then((devices) => {
          setState((prevState) => ({
            ...prevState,
            cameraLabel: streamTrack.label,
          }));
        });
      }

      if (devices?.[0]?.label) {
        const device = state.devices.filter(
          (device) => device.label === streamTrack.label
        );
        setState((prevState) => ({
          ...prevState,
          cameraLabel: device[0].label,
        }));
      }
    };

    const handleDrawer = (open) => {
      return setState((prevState) => ({
        ...prevState,
        menuOpen: !prevState.menuOpen,
      }));
    };

    const handleBack = () => {
      history.push("/");
      setState((prevState) => ({ ...prevState, venue: null }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const checkin = {
        venue: state.text,
        time: dayjs(new Date()).format("DD MMM YYYY, HH:mm"),
      };
      setState((prevState) => ({ ...prevState, venue: state.text }));
      localStorage.setItem("lastCheckIn", JSON.stringify(checkin));
      history.push("/success");
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setState((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
      <FullScreen>
        <HashRouter history={history}>
          <Drawer
            defaultCamera={defaultCamera}
            cameraId={cameraId}
            menuOpen={state.menuOpen}
            devices={devices}
            lastCheckIn={lastCheckIn}
            cameraLabel={cameraLabel}
            selectCamera={selectCamera}
            handleDrawer={handleDrawer}
          />
          <Switch>
            <Route exact path="/about">
              <About handleDrawer={handleDrawer} handleBack={handleBack} />
            </Route>
            <Route exact path="/success">
              <Success
                venue={state.venue}
                handleBack={handleBack}
                history={history}
              />
            </Route>
            <Route path="/success/:venue">
                <Success handleBack={handleBack} history={history} />
            </Route>
            <Route exact path="/failure" component={Failure} />
            <Route exact path="/input">
              <InputForm
                handleDrawer={handleDrawer}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleVenue={handleVenue}
              />
            </Route>

            <Route path="/">
              <QRReader
                setDevices={setDevices}
                devices={devices}
                onLoad={onLoadQRScanner}
                handleScan={handleScan}
                cameraId={cameraId}
                handleDrawer={handleDrawer}
                handleVenue={handleVenue}
                history={history}
                scanning={scanning}
              />
            </Route>
          </Switch>
        </HashRouter>
      </FullScreen>
    );
  },
  (prevState, nextState) => {
    // if (
    //   prevState.history.location.pathname !==
    //   nextState.history.location.pathname
    // )
    //   return false;
    // return true;
  }
);

export default App;
