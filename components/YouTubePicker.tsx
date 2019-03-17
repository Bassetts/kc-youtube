import React, { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import config from "../config.js";

const YouTubePicker = ({ disabled, customElementApi }) => {
  const videoIdRegex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)?([a-zA-Z0-9_-]{11})/;

  const [videoId, setVideoId] = useState(null);
  const [debouncedCallback] = useDebouncedCallback(
    value => {
      testSearch(value);
    },
    500,
    []
  );
  const [results, setResults] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const height: number = containerRef.current.clientHeight;
    customElementApi.setHeight(height);
  });

  const handleInput = e => {
    const searchTerm = e.target.value;
    // testSearch(searchTerm);
    debouncedCallback(searchTerm);
    let matches = videoIdRegex.exec(searchTerm);

    if (matches && matches.length > 1) {
      const videoId = matches[1];
      setVideoId(videoId);
      customElementApi.setValue(videoId);
    } else {
      setVideoId(null);
    }
  };

  const testSearch = videoId => {
    if (!videoId) {
      setResults(null);
      return;
    }

    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&videoEmbeddable=true&q=${videoId}&key=${
        config.youTubeApiKey
      }`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        const json = JSON.stringify(myJson);
        console.log(myJson);
        setResults(myJson);
      });
  };

  return (
    <div ref={containerRef}>
      <YouTubeInput
        disabled={disabled}
        handleInput={handleInput}
        results={results}
      />
      <YouTubePreview videoId={videoId} />
    </div>
  );
};

const YouTubeInput = ({ disabled, handleInput, results }) => {
  console.log(results && results.items);
  return (
    <>
      <input
        type="text"
        placeholder="YouTube URL or Video ID"
        disabled={disabled}
        onChange={handleInput}
      />
      {results && results.items && (
        <div className="search-results">
          {results.items.map(
            ({
              id: { videoId },
              snippet: {
                title,
                thumbnails: { default: thumbnail }
              }
            }) => (
              <div key={videoId}>
                <img src={thumbnail.url} />
                <span dangerouslySetInnerHTML={{ __html: title }} />
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

const YouTubePreview = ({ videoId }) => {
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

export default YouTubePicker;
