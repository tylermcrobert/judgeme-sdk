import { StoreInfo, ReviewPostPayload, ReviewSortMethod, ProductId, ReviewQuestions } from "./types";
import { FetchReviewController } from "./lib/FetchReviewController";
/**
 * Handles JudgeMe widget api
 */
export declare class JudgeMeController {
    storeInfo: StoreInfo;
    constructor(storeInfo: StoreInfo);
    /**
     * All the ways reviews can be sorted
     */
    sortMethods: {
        key: ReviewSortMethod;
        name: string;
    }[];
    product: (id: ProductId) => ProductController;
}
declare class ProductController {
    judgeMe: JudgeMeController;
    id: ProductId;
    constructor(judgeMe: JudgeMeController, id: ProductId);
    /**
     * Get product review questions
     */
    getReviewQuestions(): Promise<ReviewQuestions | null>;
    /**
     * Get a collection of reveiws
     * @param params Settings for review
     */
    getReviews: () => FetchReviewController;
    postReview(payload: ReviewPostPayload): Promise<any>;
}
export {};
