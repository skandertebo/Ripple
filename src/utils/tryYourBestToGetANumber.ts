export default function tryYourBestToGetANumber(
  badlyScrapedNumber: number | string,
) {
  let number = Number(badlyScrapedNumber);
  if (isNaN(number)) {
    if (typeof badlyScrapedNumber === "string") {
      badlyScrapedNumber = badlyScrapedNumber.replaceAll(",", "");
      number = Number(badlyScrapedNumber);
    }
  }
  if (isNaN(number)) {
    return number;
  }
  return number;
}
