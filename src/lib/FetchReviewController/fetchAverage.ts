import { getHtml, getAttr } from "../util";
import { APIAverageWidgetParams, RatingAverages } from "../../types";
import { ProductController } from "../..";
import qs from "query-string";

const URL = "https://judge.me/api/v1/widgets/product_review";

export const fetchAverage = (
  controller: ProductController
): Promise<RatingAverages | null> => {
  const options: APIAverageWidgetParams = {
    api_token: controller.judgeMe.storeInfo.publicToken,
    shop_domain: controller.judgeMe.storeInfo.shopDomain,
    external_id: controller.id,
  };

  const params = qs.stringify(options);

  return fetch(`${URL}?${params}`)
    .then((res) => res.json())
    .then((res) => (res.widget ? parseAveragesFromWidget(res.widget) : null));
};

/**
 * Parses JudgeMe widget HTML
 * @param widgetHtml Widget HTML
 */

function parseAveragesFromWidget(widgetHtml: string): RatingAverages {
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
