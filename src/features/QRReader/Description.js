import React from "react";

const QRDescription = React.memo(() => (
  <div className="qrReaderDescription">
    <div
      style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
      className="descriptionText"
    >
      <h2 style={{ marginBottom: "2rem" }}>
        Scan an official NHS QR code to check in
      </h2>
      <h3>How it helps us stay safe</h3>
      <p style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        Checking in helps notify people who might have been exposed to
        coronavirus (COVID-19) at a venue they visited.
      </p>
      <p>Nobody will know the notification is linked to you.</p>
      {/* <div className="infoButton">
        <p style={{ opacity: 1 }}>More information</p>
      </div> */}
    </div>
  </div>
));

export default QRDescription;
