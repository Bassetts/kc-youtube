import React, { useState, useRef, useEffect, Suspense } from "react";
import { useDebounce } from "use-debounce";
import Input from "./Input";
import Preview from "./Preview";
import Results from "./Results";
import Downshift from "downshift";
import Thumbnail from "./Thumbnail";

const YouTubePicker = ({ disabled, customElementApi }) => {
  const [videoId, setVideoId] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const containerRef = useRef(undefined);

  useEffect(() => {
    const height: number = containerRef.current.clientHeight;
    customElementApi.setHeight(height);
  }, [containerRef]);

  return (
    <div ref={containerRef}>
      <div>
        <Downshift
          onChange={selection => setVideoId(selection.videoId)}
          itemToString={item => (item ? item.title : "")}
          onInputValueChange={value => setSearchTerm(value)}
        >
          {({
            getInputProps,
            getMenuProps,
            getItemProps,
            isOpen,
            highlightedIndex,
            selectedItem
          }) => {
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
                          items.map((item, index) => (
                            <div
                              {...getItemProps({
                                key: item.videoId,
                                index,
                                item,
                                style: {
                                  backgroundColor:
                                    highlightedIndex === index
                                      ? `lightgray`
                                      : `white`,
                                  fontWeight:
                                    selectedItem &&
                                    selectedItem.videoId === item.videoId
                                      ? `bold`
                                      : `normal`
                                }
                              })}
                            >
                              <Thumbnail
                                width="120"
                                height="90"
                                src={item.thumbnail.url}
                              />
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: item.title
                                }}
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
