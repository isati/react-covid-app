import React from "react";
import QrReader from "../modules/react-qr-reader2";

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
  delay: 600,
};

const QRReader = ({
  cameraId,
  handleError,
  handleScan,
  onLoadQRCodeScanner,
}) => (
  <QrReader
    chosenCamera={cameraId}
    className="qrReader"
    delay={options.delay}
    style={previewStyle}
    onError={handleError}
    onScan={handleScan}
    resolution={options.resolution}
    onLoad={onLoadQRCodeScanner}
    showViewFinder={false}
  />
);

export default QRReader;
