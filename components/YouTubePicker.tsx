import React, { useState, useRef, useEffect, Suspense } from "react";
import { useDebounce } from "use-debounce";
import Input from "./Input";
import Preview from "./Preview";
import Results from "./Results";
import Downshift from "downshift";

import config from "../config";

const YouTubePicker = ({ disabled, customElementApi }) => {
  const [videoId, setVideoId] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 200);
  const containerRef = useRef(null);

  useEffect(() => {
    const height: number = containerRef.current.clientHeight;
    customElementApi.setHeight(height);
  });

  return (
    <div ref={containerRef}>
      <div>
        <Downshift onInputValueChange={value => setSearchTerm(value)}>
          {({ getInputProps, getMenuProps, getItemProps, isOpen }) => {
            return (
              <div>
                <Input
                  {...getInputProps({
                    disabled,
                    placeholder: `YouTube URL or Video ID`
                  })}
                />
                <Suspense fallback="Loading...">
                  <div {...getMenuProps()}>
                    {isOpen ? (
                      <Results searchTerm={debouncedSearchTerm}>
                        {({ items }) =>
                          items.map(item => (
                            <div key={item.videoId} {...getItemProps({ item })}>
                              <img src={item.thumbnail.url} />
                              <span
                                dangerouslySetInnerHTML={{ __html: item.title }}
                              />
                            </div>
                          ))
                        }
                      </Results>
                    ) : null}
                  </div>
                </Suspense>
              </div>
            );
          }}
        </Downshift>
        <Preview videoId={videoId} />
      </div>
    </div>
  );
};

export default YouTubePicker;
