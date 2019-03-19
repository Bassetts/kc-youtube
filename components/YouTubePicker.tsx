import React, { useState, useRef, useEffect, Suspense } from "react";
import { useDebounce } from "use-debounce";
import Input from "./Input";
import Preview from "./Preview";
import Results from "./Results";

const YouTubePicker = ({ disabled, customElementApi }) => {
  const videoIdRegex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)?([a-zA-Z0-9_-]{11})/;

  const [videoId, setVideoId] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);
  const containerRef = useRef(null);

  useEffect(() => {
    const height: number = containerRef.current.clientHeight;
    customElementApi.setHeight(height);
  });

  const handleInput = e => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    let matches = videoIdRegex.exec(searchTerm);

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
      <div>
        <Input disabled={disabled} handleInput={handleInput} />
        <Suspense fallback="Loading...">
          {debouncedSearchTerm && <Results searctTerm={debouncedSearchTerm} />}
        </Suspense>
        <Preview videoId={videoId} />
      </div>
    </div>
  );
};

export default YouTubePicker;