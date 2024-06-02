import type { SimilarInfluencer } from '@/app/influencers/[id]/page';
import axios from 'axios';

export async function getSimilarInfluencers(id: string): Promise<SimilarInfluencer[]> {
try {
    // Construct the URL with the influencer ID
    const url = `https://influencerapi.skandertebourbi.tech/search/similar/${id}`;
    const response = await axios.get(url);

    // Check if response status is not in the range of 200-299
    if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to fetch similar influencers: ${response.statusText}`);
    }

    return response.data as SimilarInfluencer[];
} catch (error) {
    console.error('Error fetching similar influencers:', error);
    return [];
}
}