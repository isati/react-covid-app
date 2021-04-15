import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Drawer from "react-motion-drawer";
import infoIcon from "../../assets/info.svg";
import shareIcon from "../../assets/share.svg";
import reloadIcon from "../../assets/reload.svg";
import favouriteIcon from "../../assets/favorite.svg";
import { RWebShare } from "react-web-share";
import { toast } from "react-toastify";
import { ReactComponent as FavouriteIcon } from "../../assets/favorite.svg";

const CameraDrawer = React.memo(
  ({
    devices,
    selectCamera,
    openLeft,
    handleDrawer,
    cameraLabel,
    refreshDevices,
  }) => {
    const state = {
      drawerStyle: `
                  {
                    "background": "#000000",
                    "boxShadow": "rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"
                  }`,
      noTouchOpen: false,
      noTouchClose: false,
      width: "90%",
    };

    const {
      noTouchClose,
      noTouchOpen,
      width,
      drawerStyle: stringDrawerStyle,
    } = state;

    let drawerStyle = {};
    try {
      drawerStyle = JSON.parse(stringDrawerStyle);
    } catch (err) {
      console.error("Error parsing JSON: ", err);
    }

    const defaultCamera = localStorage.getItem("defaultCamera");
    const listItem = (device, index) => (
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
        {device.label || `Camera ${index}`}{" "}
        {console.log(device.deviceId === defaultCamera)}
        <FavouriteIcon
          onClick={(e) => {
            // e.stopPropagation();
            localStorage.setItem("defaultCamera", device.deviceId);
            toast.dark(`${device.label} selected as default camera`, {
              containerId: "update",
            });
            handleDrawer(false);
          }}
          className="favouriteIcon"
          fill={device.deviceId === defaultCamera ? "orange" : "grey"}
          style={{
            height: "15px",
            verticalAlign: "middle",
            padding: "0.5rem",
          }}
        />
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
        <div className="drawer" style={{ padding: "1rem" }}>
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
              <span className="enumeration">
                Press the favourite icon to select camera as default
              </span>
            </ul>

            <ul className="menuFooter">
              <li
                onClick={() => {
                  handleDrawer(false);
                }}
              >
                <RWebShare
                  data={{
                    text: document.title,
                    url: ".",
                    title: document.title,
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
);

export default CameraDrawer;
