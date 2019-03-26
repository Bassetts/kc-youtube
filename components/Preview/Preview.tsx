import React from "react";

import Wrapper from "./Wrapper";
import IFrame from "./IFrame";
import Placeholder from "./Placeholder";

const Preview = ({ videoId }) => {
  return (
    <Wrapper>
      {videoId ? (
        <IFrame
          width="848"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <Placeholder />
      )}
    </Wrapper>
  );
};

export default Preview;
