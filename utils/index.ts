const parser = new DOMParser();

const decodeHtml = (html: string) => {
  const dom = parser.parseFromString(
    "<!doctype html><body>" + html,
    "text/html"
  );
  return dom.body.textContent;
};

export { decodeHtml };
