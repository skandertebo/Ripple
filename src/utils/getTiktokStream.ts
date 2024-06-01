export default function getTiktokMediaUrl(originalUrl: string) {
  return `/api/tiktok-image?url=${encodeURIComponent(originalUrl)}`;
}
