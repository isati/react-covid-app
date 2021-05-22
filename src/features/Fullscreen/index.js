import React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const FullScreenWrapper = React.memo(({ children }) => {
  const handle = useFullScreenHandle();
  let clicks = [];
  let timeout;

  const handleClick = () => {
    handle.exit();
  };

  const handleDoubleClick = () => {
    handle.enter();
  };

  const clickHandler = (e) => {
    clicks.push(new Date().getTime());
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (
        clicks.length > 1 &&
        clicks[clicks.length - 1] - clicks[clicks.length - 2] < 300
      ) {
        handleDoubleClick(e);
      } else {
        handleClick();
      }
    }, 300);
  };

  return (
    <FullScreen handle={handle}>
      <div onClick={clickHandler}>{children}</div>
    </FullScreen>
  );
});

export default FullScreenWrapper;
