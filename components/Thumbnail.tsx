import React, { useState } from "react";
import LazyLoad from "react-lazy-load";

const Thumbnail = props => {
  const [loaded, setLoaded] = useState(false);

  return (
    <LazyLoad className="lazy-load img-container">
      <img
        {...props}
        className={loaded ? `loaded` : `loading`}
        onLoad={() => setLoaded(true)}
      />
    </LazyLoad>
  );
};

export default Thumbnail;
