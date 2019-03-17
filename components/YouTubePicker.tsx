import React, { useState, useEffect, useRef } from "react";

const YouTubePicker = ({ disabled, customElementApi }) => {
  const videoIdRegex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)?([a-zA-Z0-9_-]{11})/;

  const [videoId, setVideoId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const height: number = containerRef.current.clientHeight;
    customElementApi.setHeight(height);
  }, [videoId]);

  const handleInput = e => {
    let matches = videoIdRegex.exec(e.target.value);

    if (matches && matches.length > 1) {
      const videoId = matches[1];
      setVideoId(videoId);
      customElementApi.setValue(videoId);
    } else {
      setVideoId(null);
    }
  };

  return (
    <div ref={containerRef}>
      <YouTubeInput disabled={disabled} handleInput={handleInput} />
      <YouTubePreview videoId={videoId} />
    </div>
  );
};

const YouTubeInput = ({ disabled, handleInput }) => {
  return (
    <input
      type="text"
      placeholder="YouTube URL or Video ID"
      disabled={disabled}
      onChange={handleInput}
    />
  );
};

const YouTubePreview = ({ videoId }) => {
  return (
    videoId && (
      <div>
        <iframe
          width="848"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    )
  );
};

export default YouTubePicker;
