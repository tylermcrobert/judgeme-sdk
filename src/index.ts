import {
  StoreInfo,
  ReviewPostPayload,
  ReviewSortMethod,
  ProductId,
  ReviewQuestions,
  ReviewPostParams,
} from "./types";
import qs from "querystring";

import { FetchReviewController } from "./lib/FetchReviewController";
import { handleRes } from "./lib/util";

/**
 * Handles JudgeMe widget api
 */
export class JudgeMeController {
  storeInfo: StoreInfo;

  constructor(storeInfo: StoreInfo) {
    this.storeInfo = storeInfo;
  }

  /**
   * All the ways reviews can be sorted
   */
  sortMethods: { key: ReviewSortMethod; name: string }[] = [
    { name: "Most Recent", key: "most-recent" },
    { name: "Highest Rating", key: "highest-rating" },
    { name: "Lowest Rating", key: "lowest-rating" },
    { name: "With Pictures", key: "with-pictures" },
    { name: "Pictures First", key: "pictures-first" },
    { name: "Videos First", key: "videos-first" },
    { name: "Most Helpful", key: "most-helpful" },
  ];

  product = (id: ProductId) => new ProductController(this, id);
}

class ProductController {
  judgeMe: JudgeMeController;
  id: ProductId;

  constructor(judgeMe: JudgeMeController, id: ProductId) {
    this.judgeMe = judgeMe;
    this.id = id;
  }

  /**
   * Get product review questions
   */

  async getReviewQuestions(): Promise<ReviewQuestions | null> {
    const url = `https://judge.me/api/cf_answers/form_data_for_widget?`;

    const params = {
      url: this.judgeMe.storeInfo.shop_domain,
      shop_domain: this.judgeMe.storeInfo.shop_domain,
      platform: this.judgeMe.storeInfo.platform,
      product_id: this.id,
    };

    return fetch(`${url}${qs.stringify(params)}`).then(handleRes);
  }

  /**
   * Get a collection of reveiws
   * @param params Settings for review
   */

  getReviews = () =>
    new FetchReviewController({
      product_id: this.id,
      ...this.judgeMe.storeInfo,
      per_page: 5,
    });

  async postReview(payload: ReviewPostPayload) {
    const params: ReviewPostParams = {
      ...payload,
      id: this.id,
      platform: this.judgeMe.storeInfo.platform,
      url: this.judgeMe.storeInfo.shop_domain,
    };

    return fetch(`https://judge.me/api/v1/reviews?${qs.stringify(params)}`, {
      method: "POST",
    }).then(handleRes);
  }
}
