import { render } from "react-dom";
import React from "react";
import { App } from "./app/App";
import exampleHtml from "./examples/example.html?raw";


render(
  (<App exampleHtml={exampleHtml} />),
  document.getElementById("root")
);