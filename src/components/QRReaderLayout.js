import React from "react";
import QrReader from "../modules/react-camera-qr/lib";
import QRDescription from "./QRDescription";
import CameraDrawer from "./CameraDrawer";
import CloseIcon from "../assets/close.svg";

const previewStyle = {
  height: "100%",
  position: "absolute",
  right: 0,
  bottom: 0,
  minWidth: "100%",
  minHeight: "100%",
};

const options = {
  resolution: 800,
  delay: 300,
};

const QRReader = React.memo(
  ({
    cameraId,
    cameraLabel,
    handleError,
    handleScan,
    devices,
    openLeft,
    selectCamera,
    handleDrawer,
    setDevices,
    onLoadQRScanner,
    refreshDevices,
  }) => (
    <React.Fragment>
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
        onScan={handleScan}
        resolution={options.resolution}
        onLoad={onLoadQRScanner}
        setDevices={setDevices}
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
      <CameraDrawer
        openLeft={openLeft}
        cameraId={cameraId}
        cameraLabel={cameraLabel}
        devices={devices}
        selectCamera={selectCamera}
        handleDrawer={handleDrawer}
        refreshDevices={refreshDevices}
      />
    </React.Fragment>
  )
);

export default QRReader;
