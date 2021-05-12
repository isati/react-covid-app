import React from "react";
import QrReader from "../../modules/react-camera-qr/lib";
import QRDescription from "./Description";
import CloseIcon from "../../assets/close.svg";

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
  ({ cameraId, handleScan, selectCamera, handleDrawer, onLoad, devices }) => {
    if (devices) {
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
            chooseDeviceId={cameraId}
            onLoad={onLoad}
            resolution={options.resolution}
            showViewFinder={false}
            selectCamera={selectCamera}
          />
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="overlay"
          ></div>
          <QRDescription />
        </>
      );
    }
    return "";
  }
);

export default QRReader;
