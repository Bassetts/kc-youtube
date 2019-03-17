import "../../shared/custom-module.css";
import "./style.less";

import React from "react";
import ReactDom from "react-dom";

import YouTubePicker from "./components/YouTubePicker";

CustomElement.init((element, _context) => {
  ReactDom.render(
    <YouTubePicker
      disabled={element.disabled}
      customElementApi={CustomElement}
    />,
    document.querySelector("#reactapp")
  );
});
