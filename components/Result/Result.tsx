import React from "react";

import ResultWrapper from "./ResultWrapper";
import Thumbnail from "../Thumbnail";
import ResultText from "./ResultText";

const Result = ({ item, ...props }) => {
  return (
    <ResultWrapper {...props}>
      <Thumbnail image={item.thumbnail} />
      <ResultText>{item.title}</ResultText>
    </ResultWrapper>
  );
};

export default Result;
