import type { IInfluencer } from "@/models/influencer.model";

export default function getInfluencerLink(influecer: IInfluencer) {
  switch (influecer.platform) {
    case "instagram":
      return `https://instagram.com/${influecer.username}`;
    case "tiktok":
      return `https://tiktok.com/@${influecer.username}`;
    case "youtube":
      return `https://youtube.com/${influecer.username}`;
    case "twitter":
      return `https://twitter.com/${influecer.username}`;
    default:
      return `https://instagram.com/${influecer.username}`;
  }
}
