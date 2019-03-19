import React from "react";

import useFetch from 'fetch-suspense';
import config from '../config';

const Results = ({ searctTerm }) => {
  const results = useFetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&videoEmbeddable=true&q=${searctTerm}&key=${config.youTubeApiKey}`);
  const mappedResults = results && results.items.map(
    ({
      id: { videoId },
      snippet: {
        title,
        thumbnails: { default: thumbnail }
      }
    }) => {
      return { videoId, title, thumbnail };
    }
  );
  return (
    mappedResults && (
      <div className="search-results">
        {mappedResults.map(result => (
          <div key={result.videoId}>
            <img src={result.thumbnail.url} />
            <span dangerouslySetInnerHTML={{ __html: result.title }} />
          </div>
        ))}
      </div>
    )
  );
};

export default Results;