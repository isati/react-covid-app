import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Drawer from "react-motion-drawer";
import infoIcon from "../assets/info.svg";
import shareIcon from "../assets/share.svg";
import reloadIcon from "../assets/reload.svg";
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
      cameraLabel,
      refreshDevices,
    } = this.props;

    let drawerStyle = {};
    try {
      drawerStyle = JSON.parse(stringDrawerStyle);
    } catch (err) {
      console.error("Error parsing JSON: ", err);
    }

    const listItem = (device, index) => (
      <li
        key={device.deviceId}
        className={cameraLabel === device.label ? "selectedCamera" : "camera"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (cameraLabel !== device.label) {
            selectCamera(device.deviceId, devices);
          }
          handleDrawer(false);
        }}
      >
        {device.label || `camera0 ${index}`}
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
              {devices &&
                devices.map((device, index) => listItem(device, index))}

              {devices && !devices[0].label && (
                <span onClick={refreshDevices} className="enumeration">
                  Please reload or press here to enumerate cameras correctly.
                  <br />
                  <img className="reloadIcon" src={reloadIcon} alt="reload" />
                </span>
              )}
            </ul>
            <ul className="menuFooter">
              <li
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDrawer(false);
                }}
              >
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
              <Link to="/about">
                <li>
                  <img className="aboutIcon" alt="About" src={infoIcon} />
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default CameraDrawer;
