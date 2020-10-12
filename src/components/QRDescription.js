import React from "react";
import InfoIcon from "../assets/info.svg";

const QRDescription = () => (
  <div className="qrReaderDescription">
    <h2>Check in to a venue by scanning an official NHS QR code</h2>
    <p>
      <img alt="Info icon" className="infoIcon" src={InfoIcon} /> More info
      about venue check-in
    </p>
    <p>How to scan an official NHS QR code</p>
    <p>
      Hold your phone so that the official NHS QR code appears in the box above.
      When your phone recognises the QR code, it will show that you have
      successfully checked in.
    </p>
  </div>
);

export default QRDescription;
