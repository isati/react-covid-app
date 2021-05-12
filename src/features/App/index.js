import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, Router } from "react-router-dom";
import urlRegexSafe from "url-regex-safe";
import jwt_decode from "jwt-decode";
import QRReader from "../QRReader";
import "../../assets/App.css";
import Success from "../Dialog/Success";
import About from "../About";
import Failure from "../Dialog/Failure";
import InputForm from "../InputForm";
import FullScreen from "../Fullscreen";
import Drawer from "../Drawer";
import platform from "platform";
import dayjs from "dayjs";
import { useBeforeunload } from "react-beforeunload";

const App = ({ history }) => {
  const defaultCamera = localStorage.getItem("defaultCamera");
  const lastCheckIn = JSON.parse(localStorage.getItem("lastCheckIn"));

  const [state, setState] = useState({
    devices: null,
    loading: true,
    cameraLabel: null,
    cameraId: defaultCamera || "",
    venue: null,
    text: null,
    permission: null,
    menuOpen: false,
  });
  const [video, setVideo] = useState(document.querySelector("video"));

  const constraints = {
    video: true,
    audio: false,
  };

  // useBeforeunload((event) => {
  //   localStorage.removeItem("lastCheckIn");
  // });

  const { cameraId, cameraLabel, devices, menuOpen, loading } = state;

  // const streamVideo = () => {
  //   if (video) {
  //     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  //       video.srcObject = stream;
  //     });
  //   }
  // };
  // useEffect(streamVideo);

  const refreshDevices = async () => {
    return navigator.mediaDevices.enumerateDevices().then((devices) => {
      setDevices(devices);
    });
  };

  const handleScan = (result) => {
    if (result && !result.startsWith("UKC19TRACING:")) {
      const urls = result.match(urlRegexSafe());
      if (urls && urls.length) {
        const confirm = window.confirm(
          `This is not an official NHS QR code, do you want to redirect to ${urls[0]}?`
        );
        if (confirm === true) {
          return (window.location.href = urls[0]);
        } else {
          return history.push("/failure");
        }
      }
      return history.push("/failure");
    }
    if (result) {
      const { opn } = jwt_decode(result);
      handleVenue(opn);
    }
  };

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
        // loading: false,
      }));
    },
    [history]
  );

  const selectCamera = (cameraId) => {
    document.querySelector("video").srcObject = null;
    setState((prevState) => ({ ...prevState, cameraId }));
  };

  const onLoadQRScanner = (args) => {
    const { streamTrack } = args;

    if (!devices[0].label) {
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
      setState((prevState) => ({ ...prevState, cameraLabel: device[0].label }));
    }
  };

  useEffect(() => {
    if (platform.name !== "Firefox" && navigator.permissions) {
      navigator.permissions.query({ name: "camera" }).then((result) => {
        if (result.state === "granted") {
          // setState((prevState) => ({ ...prevState, loading: false }));
        } else if (result.state === "prompt") {
        } else if (result.state === "denied") {
          history.push("/input");
        }
      });
    }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        setDevices(devices);
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          setVideo(document.querySelector("video"));
          if (video) {
            video.srcObject = stream;
          }
          setState((prevState) => ({ ...prevState, loading: false }));
        });
      });
    } else {
      alert("getUserMedia() is not supported by your browser");
    }

    return () => {
      // Work around bug in Chrome on Android 11: https://github.com/twilio/twilio-video-app-react/issues/355
      document.querySelector("video").srcObject = null;
      localStorage.removeItem("lastCheckIn");
      // stream.getTracks().forEach((track) => track.stop());
    };
  }, [setDevices]);

  const handleDrawer = (open) => {
    if (open) {
      return setState((prevState) => ({ ...prevState, menuOpen: open }));
    }

    if (menuOpen) {
      return setState((prevState) => ({ ...prevState, menuOpen: false }));
    }

    setState((prevState) => ({ ...prevState, menuOpen: true }));
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

  if (!loading) {
    return (
      <FullScreen>
        <Router history={history}>
          <Drawer
            menuOpen={state.menuOpen}
            devices={devices}
            lastCheckIn={lastCheckIn}
            cameraLabel={cameraLabel}
            selectCamera={selectCamera}
            handleDrawer={handleDrawer}
          />
          <Switch>
            <Route exact path="/about">
              <About handleDrawer={handleDrawer} />
            </Route>
            <Route exact path="/success">
              <Success
                venue={state.venue}
                handleBack={handleBack}
                history={history}
              />
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
                devices={devices}
                video={video}
                onLoad={onLoadQRScanner}
                handleScan={handleScan}
                cameraId={cameraId}
                handleDrawer={handleDrawer}
                handleVenue={handleVenue}
                history={history}
              />
            </Route>
          </Switch>
        </Router>
      </FullScreen>
    );
  }
  return "";
};

export default App;
