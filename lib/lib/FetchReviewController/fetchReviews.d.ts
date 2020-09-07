import { ReviewResponse } from "../../types";
export declare const fetchReviews: (query: string) => Promise<ReviewResponse | null>;
export declare const getDataFromHTML: (html: string) => {
    lastPage: number | null;
    nextPage: number | null;
    reviews: any;
};
