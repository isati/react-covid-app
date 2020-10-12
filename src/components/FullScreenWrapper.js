import React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import App from "../containers/App";

const FullScreenWrapper = () => {
  const handle = useFullScreenHandle();
  let clicks = [];
  let timeout;

  const handleClick = () => {
    handle.exit();
  };

  const handleDoubleClick = () => {
    handle.enter();
  };

  const clickHandler = (event) => {
    clicks.push(new Date().getTime());
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (
        clicks.length > 1 &&
        clicks[clicks.length - 1] - clicks[clicks.length - 2] < 300
      ) {
        handleDoubleClick(event);
      } else {
        handleClick();
      }
    }, 300);
  };

  return (
    <FullScreen handle={handle}>
      <div onClick={clickHandler}>
        <App />
      </div>
    </FullScreen>
  );
};

export default FullScreenWrapper;
