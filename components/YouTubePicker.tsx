import React, { useState, useRef, useEffect, Suspense } from "react";
import { useDebounce } from "use-debounce";
import Downshift from "downshift";

import Input from "./Input";
import Menu from "./Menu";
import Search from "./Search";
import Result from "./Result";
import Preview from "./Preview";

const YouTubePicker = ({ disabled, customElementApi }) => {
  const [videoId, setVideoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const containerRef = useRef(null);

  useEffect(() => {
    const height: number = containerRef.current.clientHeight;
    customElementApi.setHeight(height);
  }, [containerRef]);

  useEffect(() => {
    customElementApi.setValue(videoId);
  }, [videoId]);

  return (
    <div ref={containerRef}>
      <div>
        <Downshift
          onChange={selection =>
            setVideoId(selection ? selection.videoId : null)
          }
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
                    placeholder: `YouTube URL or Video ID`
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
    </div>
  );
};

export default YouTubePicker;
