import { apiLink, getHtml, getAttr } from "../util";
import { RatingAverages } from "../../types";
export const fetchAverage = ({
  external_id,
  shop_domain,
}: {
  external_id: string | number;
  shop_domain: string;
}): Promise<RatingAverages | null> => {
  return fetch(
    apiLink("/api/v1/widgets/product_review", { external_id, shop_domain })
  )
    .then((res) => res.json())
    .then((res) => (res.widget ? parseAveragesFromWidget(res.widget) : null));
};

/**
 * Parses JudgeMe widget HTML
 * @param widgetHtml Widget HTML
 */

function parseAveragesFromWidget(widgetHtml: string) {
  const doc = getHtml(widgetHtml);
  const histogram = Array.from(doc.querySelectorAll(".jdgm-histogram__row"))
    .map((item) => ({
      rating: Number(item.getAttribute("data-rating")),
      frequency: Number(item.getAttribute("data-frequency")),
      percentage: Number(item.getAttribute("data-percentage")),
    }))
    .filter((item) => item.rating);

  const averageRating = Number(getAttr(doc, "data-average-rating"));
  const numberOfReviews = Number(getAttr(doc, "data-number-of-reviews"));

  return {
    histogram,
    numberOfReviews,
    averageRating,
  };
}
