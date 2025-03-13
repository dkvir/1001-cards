export const useReasonsHover = {
  mouseEnter(e) {
    let elemBounding = e.target.getBoundingClientRect();
    let elementTopEdge = elemBounding.top;
    let elementBottomEdge = elemBounding.bottom;
    let mouseY = e.pageY;
    let topEdgeDist = Math.abs(elementTopEdge - mouseY);
    let bottomEdgeDist = Math.abs(elementBottomEdge - mouseY);
    let min = Math.min(topEdgeDist, bottomEdgeDist);

    if (min == topEdgeDist) {
      e.target.style.setProperty("--item-link-transform-start", "-105%");
      e.target.style.setProperty("--item-link-transform-end", "0");
    } else if (min == bottomEdgeDist) {
      e.target.style.setProperty("--item-link-transform-start", "105%");
      e.target.style.setProperty("--item-link-transform-end", "0");
    }
  },

  mouseLeave(e) {
    let elemBounding = e.target.getBoundingClientRect();

    let elementTopEdge = elemBounding.top;
    let elementBottomEdge = elemBounding.bottom;

    let mouseY = e.pageY;

    let topEdgeDist = Math.abs(elementTopEdge - mouseY);
    let bottomEdgeDist = Math.abs(elementBottomEdge - mouseY);

    let min = Math.min(topEdgeDist, bottomEdgeDist);

    if (min == topEdgeDist) {
      // e.target.style.setProperty("--item-link-transform-start", "-100%");
      e.target.style.setProperty("--item-link-transform-end", "-105%");
    } else if (min == bottomEdgeDist) {
      // e.target.style.setProperty("--item-link-transform-start", "100%");
      e.target.style.setProperty("--item-link-transform-end", "105%");
    }
  },
};
