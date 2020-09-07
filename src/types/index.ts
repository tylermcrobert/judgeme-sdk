export type StoreInfo = {
  platform: string;
  shop_domain: string;
  publicToken: string;
};

export type ProductId = string | number;

export type ReviewPost = {
  name: string;
  email: string;
  rating: number;
  title: string;
  body: string;
};

export type Average = {
  histogram: {
    rating: number;
    frequency: number;
    percentage: number;
  }[];
  numberOfReviews: number;
  averageRating: number;
};

export type Review = {
  isVerifiedBuyer: boolean;
  thumbsUp: number;
  thumbsDown: number;
  body: string;
  title: string | null;
  score: number;
  date: string | null;
  imgUrls: (string | null)[];
  customForm: {
    title: string;
    value: string;
  }[];
  reviewer: {
    fullName: any;
    initial: any;
    lastInitial: any;
  };
};

export type ReviewResponse = {
  reviews: Review[];
  nextPage: number | null;
  lastPage: number | null;
};

export type CombinedReviewData = {
  reviewData: ReviewResponse | null;
} & {
  averages: RatingAverages | null;
};

export type ProductReviewData = CombinedReviewData;
/**
 * Reviews Request
 */

export type ReviewSortMethod =
  | "most-recent"
  | "highest-rating"
  | "lowest-rating"
  | "with-pictures"
  | "pictures-first"
  | "videos-first"
  | "most-helpful";

export type ReviewsRequestOptionsRequired = {
  per_page: string | number;
  product_id: ProductId;
};

/** For APi */
export type APIReviewsOptions = {
  shop_domain: string;
  search?: string;
  sort_by?:
    | ""
    | "rating"
    | "most_helpful"
    | "with_pictures"
    | "pictures_first"
    | "videos_first";
  sort_dir?: "" | "asc" | "desc";
  page?: number | string;
} & ReviewsRequestOptionsRequired;

/**
 * For React Frontend State
 */
export type ReviewSettings = {
  sortBy?: ReviewSortMethod;
  search?: string;
  page?: number | string;
};

/**
 * Histogram Average
 */

export type RatingAverages = {
  histogram: {
    rating: number;
    frequency: number;
    percentage: number;
  }[];
  numberOfReviews: number;
  averageRating: number;
};

/**
 * Review Request
 */

export type ReviewQuestions = {
  cf_questions: ReviewQuestion[];
};

export type ReviewQuestion = {
  id: number;
  question_type: string;
  title: string;
  question: string;
  required: false;
  cf_options_count: number;
  cf_options: { id: number; title: string }[];
};

export type ReviewPostPayload = {
  name: string;
  rating: string | null;
  email: string;
  title?: string;
  body: string;
};

export type ReviewPostParams = ReviewPostPayload & {
  id: ProductId;
  url: string;
  platform: string;
};
