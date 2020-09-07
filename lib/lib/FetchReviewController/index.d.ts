import { APIReviewsOptions, ReviewSortMethod, ProductReviewData, RatingAverages } from "../../types";
export declare class FetchReviewController {
    options: APIReviewsOptions;
    averages: RatingAverages | null;
    constructor(storeInfo: APIReviewsOptions);
    /**
     * Fetches histogram averages
     */
    fetchReviewsAverage(): Promise<RatingAverages | null>;
    /**
     * Fetch Reviews
     */
    fetch(): Promise<ProductReviewData>;
    /**
     * Sort results
     * @param method Sorting method
     */
    sortBy(method: ReviewSortMethod | undefined): this;
    page(number: number | string | undefined): this;
    search(q: string | undefined): this;
    perPage(num: number | string | undefined): this;
}
