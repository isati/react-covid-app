import React from "react";
import { Button } from "@material-ui/core";

const QRDescription = React.memo(({ scanning }) => {
  return (
    <div className="qrReaderDescription" style={{ overflow: "auto" }}>
      <div
        // style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
        className="descriptionText"
      >
        <h2 style={{ marginBottom: "2rem" }}>
          Scan an official NHS QR code to check in
        </h2>

        {!scanning ? (
          <>
            <h3>How it helps us stay safe</h3>
            <p style={{ marginBottom: "2rem" }}>
              Checking in helps notify people who might have been exposed to
              coronavirus (COVID-19) at a venue they visited.
            </p>
            <p>Nobody will know the notification is linked to you.</p>
          </>
        ) : (
          <h3>Scanning for an official NHS QR code</h3>
        )}

        <Button
          style={{
            marginTop: "1rem",
            color: "white",
            borderColor: "#666",
            borderRadius: "10px",
            textTransform: "unset",
            fontSize: "1.1rem",
          }}
          title="More information"
          variant="outlined"
        >
          More information
        </Button>
        {/* <div className="infoButton">
        <p style={{ opacity: 1 }}>More information</p>
      </div> */}
      </div>
    </div>
  );
});

export default QRDescription;
