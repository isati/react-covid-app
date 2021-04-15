import React, { useEffect, useState } from "react";
import urlRegexSafe from "url-regex-safe";
import jwt_decode from "jwt-decode";
import QRReaderLayout from "./Layout";
import platform from "platform";

const QRReader = React.memo(({ history, handleVenue }) => {
  const defaultCamera = localStorage.getItem("defaultCamera");

  const [state, setState] = useState({
    cameraId: defaultCamera || "",
    cameraLabel: null,
    devices: null,
    loading: true,
    openLeft: false,
    venue: null,
    stream: null,
  });
  const constraints = {
    video: true,
    audio: false,
  };
  const [video, setVideo] = useState(document.querySelector("video"));

  const { cameraId, cameraLabel, devices, openLeft, loading } = state;
  useEffect(() => {
    if (navigator.permissions && platform.name === "Chrome") {
      navigator.permissions.query({ name: "camera" }).then((result) => {
        if (result.state === "granted") {
        } else if (result.state === "prompt") {
        } else if (result.state === "denied") {
          history.push("/input");
        }
      });
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Good to go!
      // setVideo(document.querySelector("video"));
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => setDevices(devices));
    } else {
      setCameraIsSupported(false);
      alert("getUserMedia() is not supported by your browser");
    }

    return () => {
      // Work around bug in Chrome on Android 11: https://github.com/twilio/twilio-video-app-react/issues/355
      document.querySelector("video").srcObject = null;
      // stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const streamVideo = () => {
    if (video) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
      });
    }
  };
  useEffect(streamVideo);

  const setDevices = (devices) => {
    const videoSelect = [];

    devices.map((device, index) => {
      if (device.kind === "videoinput") {
        videoSelect.push(device);
      }
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
      loading: false,
    }));
  };

  const refreshDevices = async () => {
    return await navigator.mediaDevices.enumerateDevices().then((devices) => {
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

  const handleError = (err) => {
    console.error(err);
  };

  const handleDrawer = (open) => {
    setState((prevState) => ({ ...prevState, openLeft: open }));
  };

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

  return (
    <>
      <QRReaderLayout
        cameraId={cameraId}
        cameraLabel={cameraLabel}
        handleError={handleError}
        handleDrawer={handleDrawer}
        handleScan={handleScan}
        setState={setState}
        selectCamera={selectCamera}
        devices={devices}
        onLoad={onLoadQRScanner}
        openLeft={openLeft}
        refreshDevices={refreshDevices}
      />
    </>
  );
});

export default QRReader;
