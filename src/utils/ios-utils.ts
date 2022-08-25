export const isIos = () => {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

export const iosCopyToClipboard = (
  el: HTMLInputElement | HTMLTextAreaElement
) => {
  const oldContentEditable = el.contentEditable,
    oldReadOnly = el.readOnly,
    range = document.createRange();

  el.readOnly = false;
  range.selectNodeContents(el);

  const s = window.getSelection();
  if (s) {
    s.removeAllRanges();
    s.addRange(range);
  }

  el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

  el.contentEditable = oldContentEditable;
  el.readOnly = oldReadOnly;

  document.execCommand("copy");
};
