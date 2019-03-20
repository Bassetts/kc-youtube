import React from "react";

const Preview = ({ videoId }) => {
  return (
    <div className="preview">
      {(videoId && (
        <iframe
          width="848"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      )) || (
        <img
          src="https://img.youtube.com/vi/preview/1.jpg"
          width="848"
          height="480"
        />
      )}
    </div>
  );
};

export default Preview;
