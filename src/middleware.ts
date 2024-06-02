export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/influencers",
    "/influencers/:id",
    "/influencers/interactiveSearch",
  ],
};
