const decodeHtml = (html: string) => {
  var doc = document.createElement("div");
  doc.innerHTML = html;
  return doc.innerHTML;
};

export { decodeHtml };
