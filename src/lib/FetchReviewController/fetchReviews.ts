import { getText, getAttr, getHtml, handleRes } from "../util";
import { ReviewResponse, Review } from "../../types";
/**
 * Gets JS object based on HTML widget
 * @param doc parsed document
 */

const $ = (querySelector: string, item: Document | Element) =>
  item.querySelector(querySelector);

export const fetchReviews = (query: string): Promise<ReviewResponse | null> =>
  fetch(`https://judge.me/reviews/reviews_for_widget?${query}`)
    .then((res) => handleRes(res))
    .then((res) => (res?.html ? getDataFromHTML(res.html) : null));

export const getDataFromHTML = (html: string) => {
  const doc = getHtml(html);

  /** Meta */
  const $nextPage = doc.querySelector(".jdgm-paginate__next-page");
  const $lastPage = doc.querySelector(".jdgm-paginate__last-page");

  const meta = {
    lastPage: Number($lastPage?.getAttribute("data-page")) || null,
    nextPage: Number($nextPage?.getAttribute("data-page")) || null,
  };

  /** Reviews  */
  const reviews = Array.from(doc.querySelectorAll(".jdgm-rev")).map(
    getReviewFromDom
  );

  return {
    reviews,
    ...meta,
  };
};

const getReviewFromDom = (reviewDOM: Element): Review => {
  const $body = $(".jdgm-rev__body", reviewDOM);
  const $title = $(".jdgm-rev__title", reviewDOM);
  const $date = $(".jdgm-rev__timestamp", reviewDOM);

  const $formItems = reviewDOM.querySelectorAll(".jdgm-rev__cf-ans");
  const customForm =
    Array.from($formItems).map((item) => ({
      title: $(".jdgm-rev__cf-ans__title", item)?.textContent || "",
      value: $(".jdgm-rev__cf-ans__value", item)?.textContent || "",
    })) || [];

  return {
    isVerifiedBuyer: reviewDOM.getAttribute("data-verified-buyer") === "true",
    thumbsUp: Number(reviewDOM.getAttribute("data-thumb-up-count")),
    thumbsDown: Number(reviewDOM.getAttribute("data-thumb-down-count")),
    body: getText($body),
    title: getText($title),
    score: Number(getAttr(reviewDOM, "data-score")),
    date: $date ? $date.getAttribute("data-content") : "",
    imgUrls: Array.from(reviewDOM.querySelectorAll("img"))
      .map((imgNode) => imgNode?.getAttribute("data-src"))
      .filter((a) => a),
    reviewer: {
      fullName: getAttr(reviewDOM, "data-fullname"),
      initial: getAttr(reviewDOM, "data-all-initials"),
      lastInitial: getAttr(reviewDOM, "data-last-initial"),
    },
    customForm,
  };
};
