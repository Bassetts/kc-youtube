import React from "react";
import useFetch from "fetch-suspense";

import Error from "./Error";
import { decodeHtml } from "../utils";

const Search = ({ searchTerm, apiKey, ...props }) => {
  if (!searchTerm) {
    return null;
  }

  const results = useFetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&videoEmbeddable=true&q=${searchTerm}&key=${apiKey}`
  );

  if (results && results.error) {
    const {
      code,
      message,
      errors: [{ reason }]
    } = results.error;
    return <Error text={`Error: ${code} - ${message} (${reason})`} />;
  }

  if (!results || !results.items) {
    return null;
  }

  const items = results.items.map(
    ({
      id: { videoId },
      snippet: {
        title,
        thumbnails: { default: thumbnail }
      }
    }) => {
      return { videoId, title: decodeHtml(title), thumbnail };
    }
  );

  return props.children({ items });
};

export default Search;
