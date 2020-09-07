import {
  APIReviewsOptions,
  ReviewSortMethod,
  ProductReviewData,
  RatingAverages,
} from "../../types/";
import { fetchReviews } from "./fetchReviews";
import { fetchAverage } from "./fetchAverage";

import qs from "query-string";

export class FetchReviewController {
  options: APIReviewsOptions;
  averages: RatingAverages | null;

  constructor(storeInfo: APIReviewsOptions) {
    this.options = storeInfo;
    this.averages = null;
  }

  /**
   * Fetches histogram averages
   */
  async fetchReviewsAverage() {
    // if (this.averages) return this.averages;

    // const averages = await fetchAverage({
    //   external_id: this.options.product_id,
    //   shop_domain: this.options.shop_domain,
    // });
    // this.averages = averages;
    return null;
  }

  /**
   * Fetch Reviews
   */
  async fetch(): Promise<ProductReviewData> {
    const query = qs.stringify(this.options);
    const averages = await this.fetchReviewsAverage();
    const reviewData = await fetchReviews(query);
    const combinedData = { averages, reviewData };
    return combinedData;
  }

  /**
   * Sort results
   * @param method Sorting method
   */

  sortBy(method: ReviewSortMethod | undefined) {
    const getSorting = (): Pick<APIReviewsOptions, "sort_by" | "sort_dir"> => {
      switch (method) {
        case "most-recent":
          return {
            sort_by: "",
            sort_dir: "",
          };
        case "highest-rating":
          return {
            sort_by: "rating",
            sort_dir: "desc",
          };
        case "lowest-rating":
          return {
            sort_by: "rating",
            sort_dir: "asc",
          };
        case "with-pictures":
          return {
            sort_by: "with_pictures",
            sort_dir: "",
          };
        case "pictures-first":
          return {
            sort_by: "pictures_first",
            sort_dir: "",
          };
        case "videos-first":
          return {
            sort_by: "videos_first",
            sort_dir: "",
          };
        case "most-helpful":
          return {
            sort_by: "most_helpful",
            sort_dir: "",
          };
        default:
          return {
            sort_by: "",
            sort_dir: "",
          };
      }
    };
    const sortOptions = getSorting();

    this.options = { ...this.options, ...sortOptions };
    return this;
  }

  page(number: number | string | undefined) {
    this.options = { ...this.options, page: number };
    return this;
  }

  search(q: string | undefined) {
    this.options = { ...this.options, search: q || "" };
    return this;
  }

  perPage(num: number | string | undefined) {
    this.options = { ...this.options, per_page: num || this.options.per_page };
    return this;
  }
}
