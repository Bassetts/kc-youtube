import React, { useState, useRef, useEffect, Suspense } from "react";
import { useDebounce } from "use-debounce";
import Downshift from "downshift";

import Input from "./Input";
import Menu from "./Menu";
import Search from "./Search";
import Result from "./Result";
import Preview from "./Preview";

const YouTubePicker = ({ isDisabled, customElementApi, initialVideoId }) => {
  const [disabled, setDisabled] = useState(isDisabled);
  const [videoId, setVideoId] = useState(initialVideoId);
  const [searchTerm, setSearchTerm] = useState(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const containerRef = useRef(null);

  customElementApi.onDisabledChanged(disabled => setDisabled(disabled));

  useEffect(() => {
    const height: number = containerRef.current.clientHeight;
    customElementApi.setHeight(height);
  }, [containerRef]);

  useEffect(() => {
    customElementApi.setValue(videoId);
  }, [videoId]);

  return (
    <div ref={containerRef}>
      <Downshift
        onChange={selection => setVideoId(selection ? selection.videoId : null)}
        itemToString={item => (item ? item.title : "")}
        onInputValueChange={value => setSearchTerm(value)}
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
                {...getInputProps({
                  disabled,
                  placeholder: `Enter a search term, YouTube URL, or video ID`
                })}
              />
              <Suspense fallback="Loading...">
                <Menu {...getMenuProps()}>
                  {isOpen ? (
                    <Search searchTerm={debouncedSearchTerm}>
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
                  ) : null}
                </Menu>
              </Suspense>
            </div>
          );
        }}
      </Downshift>
      <Preview videoId={videoId} />
    </div>
  );
};

export default YouTubePicker;
