import React from "react";
import ReactDOM from "react-dom";
import { init } from "contentful-ui-extensions-sdk";
import App from "./app/app";

init((sdk) => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById("root"));
});
