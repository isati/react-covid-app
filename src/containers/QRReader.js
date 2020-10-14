import React, { PureComponent } from "react";
import urlRegexSafe from "url-regex-safe";
import jwt_decode from "jwt-decode";
import QRReaderLayout from "../components/QRReaderLayout";

class QRReader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cameraId: "",
      devices: null,
      loading: false,
      openLeft: false,
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleDrawer = this.handleDrawer.bind(this);
    this.selectCamera = this.selectCamera.bind(this);
    this.setDevices = this.setDevices.bind(this);
    // this.onLoadQRScanner = this.onLoadQRScanner.bind(this);
  }

  componentDidMount() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      this.setDevices(devices);
    });
  }

  selectCamera(cameraId) {
    this.setState({ cameraId: "", loading: true }, () => {
      this.setState({
        cameraId: cameraId,
        loading: false,
        openLeft: false,
      });
    });
  }

  setDevices(devices) {
    const videoSelect = [];

    devices.forEach((device, index) => {
      if (device.kind === "videoinput") {
        videoSelect.push(device);
      }
    });
    videoSelect.sort(function (a, b) {
      if (a.label > b.label) {
        return 1;
      }
      if (b.label > a.label) {
        return -1;
      }
      return 0;
    });

    this.setState({ devices: videoSelect });
  }

  handleDrawer(open) {
    this.setState({ openLeft: open });
  }

  handleScan(result) {
    if (result && !result.startsWith("UKC19TRACING:")) {
      const urls = result.match(urlRegexSafe());
      if (urls.length) {
        const confirm = window.confirm(
          `This is not an official NHS QR code, do you want to redirect to ${urls[0]}?`
        );
        if (confirm === true) {
          return (window.location.href = urls[0]);
        } else {
          return;
        }
      }
      return window.alert(
        "This is not an official NHS QR code, please try again."
      );
    }
    if (result) {
      this.props.handleVenue(jwt_decode(result).opn);
    }
  }
  handleError(err) {
    console.error(err);
  }

  // onLoadQRScanner(args) {
  //   this.setState({ cameraId: args.deviceId });
  // }

  render() {
    const { cameraId, devices, openLeft, loading } = this.state;

    if (loading) {
      return "";
    }

    if (!loading) {
      return (
        <QRReaderLayout
          cameraId={cameraId}
          handleError={this.handleError}
          handleDrawer={this.handleDrawer}
          handleScan={this.handleScan}
          selectCamera={this.selectCamera}
          setDevices={this.setDevices}
          devices={devices}
          openLeft={openLeft}
          // onLoadQRScanner={this.onLoadQRScanner}
        />
      );
    }
  }
}

export default QRReader;
