// News service to fetch RSS feeds from pharmaceutical and cosmetics websites
import { getPortalApiUrl, API_ENDPOINTS } from '../utils/apiConfig';

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

interface NewsApiResponse {
  success: boolean;
  data: NewsItem[];
  timestamp: string;
  error?: string;
}

// Fetch all news from the API route
export const fetchAllNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(getPortalApiUrl(API_ENDPOINTS.news), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 900 }, // Cache for 15 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: NewsApiResponse = await response.json();

    if (result.success && result.data) {
      return result.data;
    } else {
      console.error("API returned error:", result.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching news from API:", error);
    return [];
  }
};

// Cache management
let newsCache: { data: NewsItem[]; timestamp: number } | null = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export const getCachedNews = async (): Promise<NewsItem[]> => {
  const now = Date.now();

  if (newsCache && now - newsCache.timestamp < CACHE_DURATION) {
    return newsCache.data;
  }

  const freshNews = await fetchAllNews();
  newsCache = { data: freshNews, timestamp: now };

  return freshNews;
};
