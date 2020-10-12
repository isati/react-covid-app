import React, { PureComponent } from "react";
import Drawer from "react-motion-drawer";
import infoIcon from "../assets/info.svg";
import shareIcon from "../assets/share.svg";
import { RWebShare } from "react-web-share";

class CameraDrawer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      drawerStyle: `
            {
              "background": "#000000",
              "boxShadow": "rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"
            }`,
      noTouchOpen: false,
      noTouchClose: false,
      width: "70%",
    };
  }

  componentDidMount() {
    // Refresh device enumartion to get labels if we don't have them - this happens on first run after getting camera permission. Should be a better way to do this.
    if (this.props.devices.length && !this.props.devices[0].label) {
      this.props.refreshDevices();
    }
  }

  render() {
    const {
      noTouchClose,
      noTouchOpen,
      width,
      drawerStyle: stringDrawerStyle,
    } = this.state;
    const {
      devices,
      selectCamera,
      openLeft,
      handleDrawer,
      handleAbout,
      cameraLabel,
    } = this.props;

    let drawerStyle = {};
    try {
      drawerStyle = JSON.parse(stringDrawerStyle);
    } catch (err) {
      console.error("Error parsing JSON: ", err);
    }

    const listItem = (device) => (
      <li
        key={device.deviceId}
        className={cameraLabel === device.label ? "selectedCamera" : "camera"}
        onClick={() => {
          if (cameraLabel !== device.label) {
            selectCamera(device.deviceId, devices);
          }
          handleDrawer(false);
        }}
      >
        {device.label}
      </li>
    );

    const drawerProps = {
      overlayColor: "rgba(0,0,0,0.6)",
      drawerStyle,
    };

    return (
      <Drawer
        {...drawerProps}
        width={width}
        fadeOut
        open={openLeft}
        onChange={(open) => handleDrawer(open)}
        noTouchOpen={noTouchOpen}
        noTouchClose={noTouchClose}
        drawerStyle={drawerStyle}
      >
        <div className="drawer">
          <h3>Camera</h3>
          <div className="container">
            <ul className="item">
              {devices.length && devices.map((device) => listItem(device))}
            </ul>
            <ul className="menuFooter">
              <li onClick={() => handleDrawer(false)}>
                <RWebShare
                  data={{
                    text: "NHS Covid-19",
                    url: window.location.href,
                    title: "NHS Covid-19",
                  }}
                >
                  <img alt="Share" className="shareIcon" src={shareIcon} />
                </RWebShare>
              </li>
              <li onClick={handleAbout}>
                <img className="aboutIcon" alt="About" src={infoIcon} />
              </li>
            </ul>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default CameraDrawer;
