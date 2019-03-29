import "../../shared/custom-module.css";

import React from "react";
import ReactDom from "react-dom";

import YouTubePicker from "./components/YouTubePicker";

CustomElement.init((element, _context) => {
  ReactDom.render(
    <YouTubePicker
      isDisabled={element.disabled}
      customElementApi={CustomElement}
      initialVideoId={element.value}
      apiKey={element.config.apiKey}
    />,
    document.querySelector("#reactapp")
  );
});
