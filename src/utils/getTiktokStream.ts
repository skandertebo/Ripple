export default function getTiktokMediaUrl(originalUrl: string) {
  const res = originalUrl.split("?")[0]?.replace(/-sign/, "");
  return res;
}
