export type ApiNumber = string | number;

export type ProductId = ApiNumber;

/**
 * Params Required for JudgeMe "Review Widget" API
 */
export type ReviewsRequestOptionsRequired = {
  per_page: string | number;
  product_id: ProductId;
  shop_domain: string;
  platform: string;
};

/**
 * Params available for JudgeMe "Review Widget" API
 */
export type APIReviewsOptions = {
  search?: string;
  sort_by?:
    | ""
    | "rating"
    | "most_helpful"
    | "with_pictures"
    | "pictures_first"
    | "videos_first";
  sort_dir?: "" | "asc" | "desc";
  page?: ApiNumber;
} & ReviewsRequestOptionsRequired;

/**
 * Form Question from JudgeMe API "Custom Form Questions"
 */
export type ReviewQuestion = {
  id: number;
  question_type: string;
  title: string;
  question: string;
  required: false;
  cf_options_count: number;
  cf_options: { id: number; title: string }[];
};

/**
 * Response from JudgeMe API "Custom Form Questions"
 */
export type ReviewQuestions = {
  cf_questions: ReviewQuestion[];
};

/**
 * Paramaters for JudgeMe "Post a Review" API
 */
export type ReviewPostParams = ReviewPostPayload & {
  id: ProductId;
  url: string;
  platform: string;
};

/**
 * Form Data required for ReviewPostParams
 */
export type ReviewPostPayload = {
  name: string;
  rating: string | null;
  email: string;
  title?: string;
  body: string;
};
