export default function getTiktokMediaUrl(originalUrl: string) {
  return originalUrl.split("?")[0]?.replace("-sign-va", "");
}
