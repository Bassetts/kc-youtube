import React from "react";

import ResultWrapper from "./ResultWrapper";
import Thumbnail from "../Thumbnail";
import ResultText from "./ResultText";

const Result = ({ item: { thumbnail, title }, ...props }) => {
  return (
    <ResultWrapper {...props}>
      <Thumbnail image={thumbnail} alt={title} />
      <ResultText text={title} />
    </ResultWrapper>
  );
};

export default Result;
