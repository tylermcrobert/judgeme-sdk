export type StoreInfo = {
  platform: string;
  shopDomain: string;
  publicToken: string;
};

export type RatingAverages = {
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

/**
 * for "Reviews" Request
 */

export type ReviewSortMethod =
  | "most-recent"
  | "highest-rating"
  | "lowest-rating"
  | "with-pictures"
  | "pictures-first"
  | "videos-first"
  | "most-helpful";

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
