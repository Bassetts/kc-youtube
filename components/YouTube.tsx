import React, { useState, useRef, useEffect, Suspense } from "react";
import { useDebounce } from "use-debounce";
import Downshift from "downshift";

import Input from "./Input";
import Menu from "./Menu";
import Search from "./Search";
import Result, { ResultWrapper, ResultText } from "./Result";
import Preview from "./Preview";

const YouTube = ({ isDisabled, customElementApi, initialValue, apiKey }) => {
  const [disabled, setDisabled] = useState(isDisabled);
  const [selectedVideo, setSelectedVideo] = useState(JSON.parse(initialValue));
  const [searchTerm, setSearchTerm] = useState(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const containerRef = useRef(null);

  customElementApi.onDisabledChanged(disabled => setDisabled(disabled));

  useEffect(() => {
    const height: number = containerRef.current.clientHeight;
    customElementApi.setHeight(height);
  }, [containerRef]);

  useEffect(() => {
    customElementApi.setValue(JSON.stringify(selectedVideo));
  }, [selectedVideo]);

  return (
    <div ref={containerRef}>
      <Downshift
        onChange={selection => {
          if (!selection) {
            setSelectedVideo(null);
          } else {
            const { title, videoId } = selection;
            setSelectedVideo({ title, videoId });
          }
        }}
        itemToString={item => (item ? item.title : "")}
        onInputValueChange={value => setSearchTerm(value)}
        initialSelectedItem={selectedVideo}
      >
        {({
          getInputProps,
          getMenuProps,
          getItemProps,
          isOpen,
          highlightedIndex,
          selectedItem,
          clearSelection
        }) => {
          return (
            <div>
              <Input
                clearSelection={clearSelection}
                hasSelection={!!selectedItem}
                {...getInputProps({
                  disabled,
                  placeholder: `Enter a search term, YouTube URL, or video ID`
                })}
              />
              <Menu {...getMenuProps()}>
                <Suspense
                  fallback={
                    <ResultWrapper>
                      <ResultText text="Loading..." />
                    </ResultWrapper>
                  }
                >
                  {isOpen && (
                    <Search searchTerm={debouncedSearchTerm} apiKey={apiKey}>
                      {({ items }) =>
                        items.map((item, index) => (
                          <Result
                            isActive={highlightedIndex === index}
                            isSelected={
                              selectedItem &&
                              selectedItem.videoId === item.videoId
                            }
                            item={item}
                            {...getItemProps({
                              key: item.videoId,
                              index,
                              item
                            })}
                          />
                        ))
                      }
                    </Search>
                  )}
                </Suspense>
              </Menu>
            </div>
          );
        }}
      </Downshift>
      <Preview videoId={selectedVideo && selectedVideo.videoId} />
    </div>
  );
};

export default YouTube;
