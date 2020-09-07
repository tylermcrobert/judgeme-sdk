export * from "./app";
export * from "./api";
export * from "./averagesApi";

export type ReviewPost = {
  name: string;
  email: string;
  rating: number;
  title: string;
  body: string;
};
