import React from "react";
import { Link } from "react-router-dom";
import infoIcon from "../../assets/info.svg";
import shareIcon from "../../assets/share.svg";
import reloadIcon from "../../assets/reload.svg";
import scannerIcon from "../../assets/scanner.svg";
import textInputIcon from "../../assets/textinput.svg";
import historyIcon from "../../assets/history.svg";
import deleteIcon from "../../assets/delete.svg";
import CameraIcon from "../../assets/camera.svg";

import { RWebShare } from "react-web-share";
import { toast } from "react-toastify";
import {
  MenuItem,
  MenuList,
  ListItemIcon,
  Typography,
  SwipeableDrawer,
  Divider,
} from "@material-ui/core";
import { ReactComponent as FavouriteIcon } from "../../assets/favorite.svg";
const CameraDrawer = React.memo(
  ({
    lastCheckIn,
    devices,
    selectCamera,
    menuOpen,
    handleDrawer,
    cameraLabel,
    refreshDevices,
  }) => {
    const defaultCamera = localStorage.getItem("defaultCamera");
    const listItem = (device, index) => (
      <Link key={device.deviceId} to="/">
        <MenuItem
          style={{ color: "white" }}
          className={cameraLabel === device.label ? "selectedCamera" : "camera"}
          onClick={() => {
            if (cameraLabel !== device.label) {
              selectCamera(device.deviceId, devices);
            }
            handleDrawer(false);
          }}
        >
          <ListItemIcon>
            <FavouriteIcon
              onClick={(e) => {
                localStorage.setItem("defaultCamera", device.deviceId);
                toast.dark(`${device.label} selected as default camera`, {
                  containerId: "update",
                });
                handleDrawer(false);
              }}
              className="favouriteIcon"
              fill={device.deviceId === defaultCamera ? "orange" : "grey"}
              style={{
                height: 25,
                verticalAlign: "middle",
              }}
            />
          </ListItemIcon>
          {device.label || `Camera ${index}`}{" "}
        </MenuItem>
      </Link>
    );

    const menuItemStyle = {
      color: "white",
    };

    return (
      <SwipeableDrawer
        PaperProps={{
          style: {
            borderRight: 0,
            boxShadow: "10px 0px 20px rgba(0, 0, 0, 0.5)",
          },
        }}
        anchor="left"
        open={menuOpen}
        onOpen={() => handleDrawer(true)}
        onClose={() => handleDrawer(false)}
      >
        <MenuList
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
            backgroundColor: "black",
            paddingRight: "1rem",
          }}
        >
          <div style={{ marginBottom: "0.5rem" }}>
            <MenuItem style={menuItemStyle}>
              <ListItemIcon>
                <img
                  style={{ height: 25, verticalAlign: "sub" }}
                  alt="About"
                  src={CameraIcon}
                />
              </ListItemIcon>
              <Typography>
                <strong>Camera select</strong>
              </Typography>
            </MenuItem>
          </div>
          {devices && devices.map((device, index) => listItem(device, index))}
          {devices && !devices[0].label && (
            <span onClick={refreshDevices} className="enumeration">
              Please reload or press here to enumerate cameras correctly.
              <br />
              <img className="reloadIcon" src={reloadIcon} alt="reload" />
            </span>
          )}
          <div style={{ flexGrow: 1 }} />
          {lastCheckIn && (
            <div>
              <Link
                to={{
                  pathname: "/success",
                  state: lastCheckIn,
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleDrawer(false);
                  }}
                  style={menuItemStyle}
                >
                  <ListItemIcon>
                    <img
                      style={{ height: 25, verticalAlign: "sub" }}
                      alt="Last check-in"
                      src={historyIcon}
                    />
                  </ListItemIcon>
                  <Typography>Last Check-in</Typography>
                  <div style={{ flexGrow: 1 }} />
                  <ListItemIcon
                    style={{ justifyContent: "flex-end" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toast.dark(`Deleted last check-in`, {
                        containerId: "update",
                      });
                      handleDrawer(false);
                      localStorage.removeItem("lastCheckIn");
                    }}
                  >
                    <img
                      style={{ height: 20, verticalAlign: "middle" }}
                      alt="Delete"
                      src={deleteIcon}
                    />
                  </ListItemIcon>
                </MenuItem>
              </Link>

              <Divider
                variant="inset"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  marginBottom: "0.5rem",
                  marginTop: "0.5rem",
                }}
              />
            </div>
          )}
          <Link to="/">
            <MenuItem
              onClick={() => {
                handleDrawer(false);
              }}
              style={menuItemStyle}
            >
              <ListItemIcon>
                <img
                  style={{ height: 25, verticalAlign: "sub" }}
                  alt="About"
                  src={scannerIcon}
                />
              </ListItemIcon>
              <Typography>Scanner</Typography>
            </MenuItem>
          </Link>
          <Link to="/input">
            <MenuItem
              onClick={() => {
                handleDrawer(false);
              }}
              style={menuItemStyle}
            >
              <ListItemIcon>
                <img
                  style={{ height: 25, verticalAlign: "sub" }}
                  alt="About"
                  src={textInputIcon}
                />
              </ListItemIcon>
              <Typography>Text Input</Typography>
            </MenuItem>
          </Link>
          {/* 
          <MenuItem
            onClick={() => {
              toggleTorch();
              handleDrawer(false);
            }}
            style={menuItemStyle}
          >
            <ListItemIcon>
              <img
                style={{ height: 25, verticalAlign: "sub" }}
                alt="About"
                src={torchIcon}
              />
            </ListItemIcon>
            <Typography>Torch</Typography>
          </MenuItem> */}
          <RWebShare
            data={{
              text: document.title,
              url: ".",
              title: document.title,
            }}
          >
            <MenuItem
              // onClick={() => handleDrawer(false)}
              style={menuItemStyle}
            >
              <ListItemIcon>
                <img
                  style={{ height: 25, verticalAlign: "sub" }}
                  alt="About"
                  src={shareIcon}
                />
              </ListItemIcon>
              <Typography>Share</Typography>
            </MenuItem>
          </RWebShare>
          <Link to="/about">
            <MenuItem
              onClick={() => {
                handleDrawer(false);
              }}
              style={{
                color: "white",
              }}
            >
              <ListItemIcon>
                <img
                  style={{ height: 25, verticalAlign: "sub" }}
                  alt="About"
                  src={infoIcon}
                />
              </ListItemIcon>
              <Typography>About</Typography>
            </MenuItem>
          </Link>
        </MenuList>
      </SwipeableDrawer>
    );
  }
);

export default CameraDrawer;
