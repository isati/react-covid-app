import React, { useState } from "react";
import { Switch, Route, Router } from "react-router-dom";
import QRReader from "../QRReader";
import "../../assets/App.css";
import Success from "../Dialog/Success";
import About from "../About";
import Failure from "../Dialog/Failure";
import InputForm from "../InputForm";
import FullScreen from "../Fullscreen";

const App = ({ history }) => {
  const [state, setState] = useState({
    venue: null,
    text: null,
    permission: null,
    loading: false,
  });

  const handleVenue = (venue) => {
    setState((prevState) => ({ ...prevState, venue }));
    history.push("/success");
  };

  const handleBack = () => {
    history.push("/");
    setState((prevState) => ({ ...prevState, venue: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, venue: state.text }));
    history.push("/success");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <FullScreen>
      <Router history={history}>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/success">
            <Success
              venue={state.venue}
              handleBack={handleBack}
              history={history}
            />
          </Route>
          <Route exact path="/failure" component={Failure} />
          <Route exact path="/input">
            <InputForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleVenue={handleVenue}
            />
          </Route>

          <Route path="/">
            <QRReader handleVenue={handleVenue} history={history} />
          </Route>
        </Switch>
      </Router>
    </FullScreen>
  );
};

export default App;
