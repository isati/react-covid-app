import React, { PureComponent } from "react";
import "../assets/App.css";
import CloseIcon from "../assets/close.svg";
import QRDescription from "../components/QRDescription";
import jwt_decode from "jwt-decode";
import QRReader from "../components/QRReader";
import CameraDrawer from "../components/CameraDrawer";
import Success from "../components/Success";
import About from "../components/About";
import urlRegexSafe from "url-regex-safe";
import InputForm from "../components/InputForm";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      decoded: null,
      cameraId: "",
      cameraLabel: null,
      devices: null,
      loading: true,
      openLeft: false,
      about: false,
      venueName: "",
      noDevices: false,
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleDrawer = this.handleDrawer.bind(this);
    this.selectCamera = this.selectCamera.bind(this);
    this.handleAbout = this.handleAbout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLoadQRCodeScanner = this.onLoadQRCodeScanner.bind(this);
    this.refreshDevices = this.refreshDevices.bind(this);
  }

  componentDidMount() {
    if (navigator) {
      this.setState({ loading: true });
    }
    this.enumerateDevices().then((devices) => {
      // Check for devices on component mount but before QR Reader so we can display text input.
      if (!devices.length) {
        this.setState({ noDevices: true });
      }
      this.setState({
        devices: devices,
        loading: false,
      });
    });

    navigator.permissions.query({ name: "camera" }).then((result) => {
      if (result.state === "granted") {
      } else if (result.state === "prompt") {
      } else if (result.state === "denied") {
        this.setState({ noDevices: true });
      }
    });
  }

  async onLoadQRCodeScanner(args) {
    if (!args) {
      return;
    }
    const { streamTrack } = args;

    // Set camera label to sync menu
    await this.state.devices.map((device, index, devices) => {
      if (device.label === streamTrack.label) {
        return this.setCameraLabel(device.label, devices);
      }
      return device.label;
    });
  }

  selectCamera(cameraId, devices) {
    this.setState({ cameraId: "", loading: true }, () => {
      this.setState({
        cameraId: cameraId,
        devices,
        openLeft: false,
      });
    });
  }

  setCameraLabel(label, devices) {
    this.setState({
      devices: devices,
      cameraLabel: label || devices[0].label,
    });
  }

  handleDrawer(open) {
    this.setState({ openLeft: open });
  }

  handleAbout() {
    this.setState({ about: !this.state.about, openLeft: false });
  }

  refreshDevices() {
    this.setState({ devices: null, loading: true }, () => {
      this.enumerateDevices().then((devices) =>
        this.setState({ devices: devices, loading: false })
      );
    });
  }

  async enumerateDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const videoSelect = [];
    devices.forEach((device) => {
      if (device.kind === "videoinput") {
        videoSelect.push(device);
      }
    });
    return videoSelect.sort(function (a, b) {
      if (a.label > b.label) {
        return 1;
      }
      if (b.label > a.label) {
        return -1;
      }
      return 0;
    });
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
      this.setState({
        result: result,
        decoded: { ...jwt_decode(result) },
      });
    }
  }
  handleError(err) {
    console.error(err);
  }

  handleBack() {
    this.setState({ decoded: null, venueName: "" });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      decoded: {
        opn: this.state.venueName,
      },
    });
  }

  handleChange(e) {
    this.setState({ venueName: e.target.value });
  }

  render() {
    const {
      openLeft,
      devices,
      cameraId,
      cameraLabel,
      loading,
      decoded,
      venueName,
      about,
      noDevices,
    } = this.state;

    if (about) {
      return <About handleAbout={this.handleAbout} />;
    }

    if (decoded) {
      return <Success venue={decoded} handleBack={this.handleBack} />;
    }

    if (noDevices && !decoded) {
      return (
        <InputForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          venueName={venueName}
          handleAbout={this.handleAbout}
        />
      );
    }

    if (loading) {
      return "";
    }

    if (!loading) {
      return (
        <React.Fragment>
          <img
            onClick={() => {
              this.handleDrawer(true);
            }}
            className="closeIcon"
            alt="Camera menu"
            src={CloseIcon}
          />
          <QRReader
            cameraId={cameraId}
            handleScan={this.handleScan}
            handleError={this.handleError}
            onLoadQRCodeScanner={this.onLoadQRCodeScanner}
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
            cameraLabel={cameraLabel}
            devices={devices}
            selectCamera={this.selectCamera}
            handleDrawer={this.handleDrawer}
            handleAbout={this.handleAbout}
            refreshDevices={this.refreshDevices}
          />
        </React.Fragment>
      );
    }
  }
}
export default App;
