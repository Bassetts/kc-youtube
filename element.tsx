import "../../shared/custom-module.css";

import React from "react";
import ReactDom from "react-dom";

import YouTube from "./components/YouTube";
import Error from "./components/Error";

CustomElement.init((element, _context) => {
  ReactDom.render(
    element.config.apiKey ? (
      <YouTube
        isDisabled={element.disabled}
        customElementApi={CustomElement}
        initialValue={element.value}
        apiKey={element.config.apiKey}
      />
    ) : (
      <Error text="Please specify an apiKey in the custom element configuration." />
    ),
    document.querySelector("#reactapp")
  );
});
