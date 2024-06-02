import tryYourBestToGetANumber from "./tryYourBestToGetANumber";

export default function formatFollowersNumber(
  unformattedFollowers: number | string,
) {
  const followers = tryYourBestToGetANumber(unformattedFollowers);
  if (followers < 1000) {
    return followers;
  }

  if (followers < 1000000) {
    return isNaN(followers / 1000)
      ? followers
      : `${Math.round(followers / 1000)}k`;
  }

  return isNaN(followers / 1000000)
    ? followers
    : `${Math.round(followers / 1000000)}m`;
}
