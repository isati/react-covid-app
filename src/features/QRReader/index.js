import React, { useEffect, useState } from "react";
import QrReader from "../../modules/react-camera-qr/lib";
import QRDescription from "./Description";
import CloseIcon from "../../assets/close.svg";
import platform from "platform";

const previewStyle = {
  height: "100%",
  position: "absolute",
  right: 0,
  bottom: 0,
  minWidth: "100%",
  minHeight: "100%",
};

const handleError = (err) => {
  console.error(err);
};

const options = {
  resolution: 800,
  delay: 300,
};

const QRReader = React.memo(
  ({
    history,
    cameraId,
    handleScan,
    handleDrawer,
    onLoad,
    setDevices,
    scanning,
  }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (platform.name !== "Firefox" && navigator.permissions) {
        navigator.permissions.query({ name: "camera" }).then((result) => {
          if (result.state === "granted") {
          } else if (result.state === "prompt") {
          } else if (result.state === "denied") {
            history.push("/input");
          }
        });
      }

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            if (!devices) return history.push("/input");
            setDevices(devices);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        alert("getUserMedia() is not supported by your browser");
        return history.push("/input");
      }
    }, []);

    if (!loading) {
      return (
        <>
          <img
            onClick={() => {
              handleDrawer(true);
            }}
            className="closeIcon"
            alt="Camera menu"
            src={CloseIcon}
          />
          <QrReader
            chosenCamera={cameraId}
            delay={options.delay}
            style={previewStyle}
            onError={handleError}
            facingMode="environment"
            onScan={handleScan}
            onLoad={onLoad}
            resolution={options.resolution}
            showViewFinder={false}
          />
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="overlay"
          />
          <QRDescription scanning={scanning} />
        </>
      );
    }
    return "";
  },
  (prevState, nextState) => {}
);

export default QRReader;
