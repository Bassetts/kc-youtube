import useFetch from "fetch-suspense";
import config from "../config";

const Search = ({ searchTerm, ...props }) => {
  if (!searchTerm) {
    return null;
  }

  const results = useFetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&videoEmbeddable=true&q=${searchTerm}&key=${
      config.youTubeApiKey
    }`
  );
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
      return { videoId, title, thumbnail };
    }
  );

  return props.children({ items });
};

export default Search;
