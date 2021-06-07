import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./features/App";
import { createBrowserHistory } from "history";
import { SnackbarProvider } from "notistack";

const history = createBrowserHistory();

const notistackRef = React.createRef();

const AlertProvider = ({ children }) => (
  <SnackbarProvider
    ref={notistackRef}
    autoHideDuration={2500}
    preventDuplicate
    onClose={(event, reason, key) => {
      if (reason === "clickaway") {
        notistackRef.current.closeSnackbar(key);
      }
    }}
  >
    {children}
  </SnackbarProvider>
);

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider preventDuplicate>
      <App history={history} />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
