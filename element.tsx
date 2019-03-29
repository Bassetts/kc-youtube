import "../../shared/custom-module.css";

import React from "react";
import ReactDom from "react-dom";

import YouTube from "./components/YouTube";

CustomElement.init((element, _context) => {
  ReactDom.render(
    <YouTube
      isDisabled={element.disabled}
      customElementApi={CustomElement}
      initialVideoId={element.value}
      apiKey={element.config.apiKey}
    />,
    document.querySelector("#reactapp")
  );
});
