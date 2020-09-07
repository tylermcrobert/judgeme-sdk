import { RatingAverages } from "../../types";
export declare const fetchAverage: ({ external_id, shop_domain, }: {
    external_id: string | number;
    shop_domain: string;
}) => Promise<RatingAverages | null>;
