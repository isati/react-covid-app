import React, { PureComponent } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import { createBrowserHistory } from "history";
import "../assets/App.css";

import QRReader from "../containers/QRReader";
import Success from "../components/Success";
import About from "../components/About";

import InputForm from "../components/InputForm";

const history = createBrowserHistory();

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      venue: null,
      text: null,
      permission: null,
      loading: false,
    };

    this.handleVenue = this.handleVenue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Check for navigator.permissions as not supported on Safari
    if (navigator.permissions) {
      navigator.permissions.query({ name: "camera" }).then((result) => {
        if (result.state === "granted") {
        } else if (result.state === "prompt") {
        } else if (result.state === "denied") {
        }
        this.setState({ permission: result.state, loading: false });
      });
    }
  }

  handleVenue(venue) {
    this.setState({ venue: venue });
  }

  handleBack() {
    window.location.replace("/");
    this.setState({ venue: null });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      venue: this.state.text,
    });
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    if (!this.state.loading) {
      return (
        <Router history={history}>
          <Switch>
            <Route path="/about" component={About} />

            {this.state.venue && (
              <React.Fragment>
                <Redirect from={"/input"} to="/success" />
                <Redirect from={"/"} to="/success" />

                <Route
                  path="/success"
                  render={(props) => (
                    <Success
                      {...props}
                      venue={this.state.venue}
                      handleBack={this.handleBack}
                    />
                  )}
                />
              </React.Fragment>
            )}

            <Route
              path="/input"
              render={(props) => (
                <InputForm
                  {...props}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handleVenue={this.handleVenue}
                />
              )}
            />

            {this.state.permission === "denied" && !this.state.venue && (
              <Redirect from={"/"} to="/input" />
            )}

            <Route
              path="/"
              render={(props) => (
                <QRReader {...props} handleVenue={this.handleVenue} />
              )}
            />
          </Switch>
        </Router>
      );
    }
    return "";
  }
}
export default App;
