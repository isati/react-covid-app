import React from "react";

const QRDescription = React.memo(() => (
  <div className="qrReaderDescription">
    <div className="descriptionText">
      <h2 style={{ marginBottom: "2rem" }}>
        Scan an official NHS QR code to check in
      </h2>
      <h3>How it helps us stay safe</h3>
      <p style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
        Checking in makes sure that people are alerted of potential exposure to
        coronavirus at a venue.
      </p>
      <div className="infoButton">
        <p style={{ opacity: 1 }}>More information</p>
      </div>
    </div>
  </div>
));

export default QRDescription;
